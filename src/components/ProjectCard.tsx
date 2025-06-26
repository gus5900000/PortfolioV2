'use client';

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { TagBadge } from "./TagBadge";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProjectCardProps {
  iconSrc: string;
  iconAlt?: string;
  title: string;
  description: string;
  tag: Array<string>;
  date: string;
  slug: string;
}

export default function ProjectCard({
  iconSrc,
  iconAlt = "Icon",
  title,
  description,
  tag,
  date,
  slug,
}: Readonly<ProjectCardProps>) {

  const { locale } = useParams();

  return (
    <Link href={`/${locale}/projects/${slug}`} className="no-underline">
      <Card className="pt-0 w-80 h-[500px] flex flex-col bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-800 
      transition-all duration-300 ease-in-out hover:-translate-y-1 text-justify hover:shadow-[0_10px_25px_-5px_rgba(221,69,192,0.4),0_8px_10px_-6px_rgba(221,69,192,0.2)] dark:hover:shadow-[0_10px_25px_-5px_rgba(221,69,192,0.5),0_8px_15px_-6px_rgba(221,69,192,0.3)] relative
      hover:border-[#dd45c0]/30 cursor-pointer overflow-hidden
      before:absolute before:content-[''] before:w-full before:h-[10px] before:bg-gradient-to-r before:from-transparent before:via-[#dd45c0] before:to-transparent before:bottom-[-10px] before:left-0 before:opacity-0 before:blur-md hover:before:bottom-[-5px] hover:before:opacity-70 before:transition-all before:duration-300">
        <div className="relative h-40 w-full">
          <Image
            src={iconSrc}
            alt={iconAlt}
            fill
            className="object-cover"
          />
        </div>

        <CardHeader>
          <h2 className="text-2xl font-bold">{title}</h2>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {tag.map((tagItem, index) => (
              <TagBadge key={index} tag={tagItem} />
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-4">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">{date}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}