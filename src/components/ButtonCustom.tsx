import { Button } from "componants/components/ui/button"
import Link from "next/link";
import { ChevronRight, Mail } from "lucide-react"


interface ButtonCustomProps {
    title: string;
    icon: string;
    href?: string;
}

export default function ButtonCustom({
    title,
    icon,
    href = "/projects",
}: ButtonCustomProps) {
    const renderIcon = () => {
        switch (icon) {
            case "chevron":
                return <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />;
            case "envelope":
                return <Mail className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />;
            default:
                return <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />;
        }
    };

    const commonButtonClass = "group w-[200px] mt-4 md:h-12 md:mt-0 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:translate-y-[-2px] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30";
    const commonLinkClass = "flex items-center";

    return (
        <Button asChild className={commonButtonClass}>
            {icon === "envelope" ? (
                <a href={`mailto:${href}`} className={commonLinkClass}>
                    {title}
                    {renderIcon()}
                </a>
            ) : (
                <Link href={href} className={commonLinkClass}>
                    {title}
                    {renderIcon()}
                </Link>
            )}
        </Button>
    )
}