import { Card } from "./ui/card";
import Image from "next/image";

interface TagCardProps {
    iconSrc: string;
    iconAlt?: string;
    title: string;
}

export default function TagCard({
    iconSrc,
    iconAlt = "Icon",
    title
    }: TagCardProps) {
    return (
        <Card className="flex flex-row items-center gap-3 p-4">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    loading="lazy"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    style={{ 
                        filter: "invert(37%) sepia(93%) saturate(7471%) hue-rotate(257deg) brightness(101%) contrast(101%)" 
                    }}
                />
            </div>
            <p className="text-lg font-semibold">{title}</p>
        </Card>
    );
}