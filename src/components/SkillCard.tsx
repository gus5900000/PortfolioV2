import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface SkillCardProps {
    iconSrc: string;
    iconAlt?: string;
    title: string;
    description: string;
}

export default function SkillCard({
    iconSrc,
    iconAlt = "Icon",
    title,
    description
}: SkillCardProps) {
    return (
        <Card className="p-4 my-2 md:my-6 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-800 
        transition-all duration-300 ease-in-out hover:-translate-y-1 
        hover:shadow-[0_10px_25px_-5px_rgba(221,69,192,0.4),0_8px_10px_-6px_rgba(221,69,192,0.2)] 
        dark:hover:shadow-[0_10px_25px_-5px_rgba(221,69,192,0.5),0_8px_15px_-6px_rgba(221,69,192,0.3)] 
        relative hover:border-[#dd45c0]/30 overflow-hidden
        before:absolute before:content-[''] before:w-full before:h-[10px] before:bg-gradient-to-r 
        before:from-transparent before:via-[#dd45c0] before:to-transparent before:bottom-[-10px] 
        before:left-0 before:opacity-0 before:blur-md hover:before:bottom-[-5px] hover:before:opacity-70 
        before:transition-all before:duration-300">
            <div className="w-16 h-16 relative mx-auto">
                <Image 
                    src={iconSrc}
                    alt={iconAlt}
                    fill
                    className="w-full h-full"
                    loading="lazy"
                    style={{ 
                        filter: "invert(37%) sepia(93%) saturate(7471%) hue-rotate(257deg) brightness(101%) contrast(101%)" 
                    }}
                />
            </div>
            
            <div className="text-center">
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            
            <CardContent className="text-center">
                {description}
            </CardContent>
        </Card>
    )
}