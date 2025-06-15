'use client';
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";


export default function Navbar() {
    const t = useTranslations("Header.navigations");
    const [isOpen, setIsOpen] = useState(false);

    const categories = ["home", "projects", "about"];

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/gus5900000", icon: "/icons/github.svg" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/augustin-verissimo-a48b95231/", icon: "/icons/linkedin.svg" }
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const pathname = usePathname()

    const isLinkActive = (category: string) => {
        if (category === "home") {
            return pathname === "/" || pathname === "/fr" || pathname === "/en";
        }
        return pathname.includes(`/${category}`);
    };

    return (

        <div className="flex flex-col md:flex-row items-center w-full px-8 py-0 h-20 relative">
            {/* Left side */}
            <div className="flex items-center">
                <div className="w-16 h-16 md:w-8 md:h-8">
                    <Image
                        src="/icons/terminal.svg"
                        alt="Terminal Icons"
                        width={64}
                        height={64}
                        className="w-full h-full"
                        style={{
                            filter: "invert(37%) sepia(93%) saturate(7471%) hue-rotate(257deg) brightness(101%) contrast(101%)"
                        }}
                    />
                </div>
                <h1 className="text-2xl font-bold ml-2 md:text-3xl pr-2">Augustin Verissimo</h1>

                {/* Mobile menu button */}
                <button
                    className="md:hidden ml-auto flex flex-col justify-center items-center"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`bg-black dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                    <span className={`bg-black dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`bg-black dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </button>
            </div>

            {/* Center - Navigation */}
            <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <ul className="flex gap-12 border border-gray-200 dark:border-zinc-600 rounded-full px-4 py-4 bg-white dark:bg-zinc-900 shadow-md">
                    {categories.map((categorie) => (
                        <li key={categorie} className="cursor-pointer">
                            <Link
                                href={`/${categorie === "home" ? "" : categorie}`}
                                className={`transition-all hover:scale-110 ${isLinkActive(categorie)
                                    ? "text-black dark:text-white font-medium"
                                    : "text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                                    }`}
                            >
                                {t(`${categorie}`)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Right - Social links */}
            <div className="hidden md:flex items-center gap-4 ml-auto">
                {socialLinks.map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="hover:scale-110 transition-transform filter invert-50 hover:invert-0 dark:hover:invert-100"
                    >
                        <Image
                            src={social.icon}
                            alt={`${social.name} Icon`}
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                    </a>
                ))}
                
                <div className="h-6 w-px bg-gray-300 dark:bg-zinc-600"></div>
                
                <div className="flex items-center gap-2">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </div>


            {/* Mobile menu */}
            <div className={`md:hidden w-full absolute top-20 left-0 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <ul className="flex flex-col items-center gap-4 py-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-600 shadow-md mx-4 rounded-lg">
                    {categories.map((categorie) => (
                        <li key={categorie} className="cursor-pointer">
                            <Link
                                href={`/${categorie === "home" ? "" : categorie}`}
                                onClick={() => setIsOpen(false)}
                                className={isLinkActive(categorie) ? " font-medium" : "text-zinc-400"}
                            >
                                {t(`${categorie}`)}
                            </Link>
                        </li>
                    ))}
                    <div className="flex gap-4 mt-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    src={social.icon}
                                    alt={`${social.name} Icon`}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 filter invert-50"
                                />
                            </a>
                        ))}
                    </div>
                    
                    {/* Theme and Language switchers for mobile */}
                    <div className="flex items-center gap-4 mt-4 pt-4 w-full justify-center border-t border-gray-200 dark:border-zinc-700">
                        <ThemeSwitcher />
                        <LanguageSwitcher />
                    </div>
                </ul>
            </div>
        </div>
    );
}