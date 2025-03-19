import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { TagBadge } from "componants/components/TagBadge";
import { IframeStyles } from "componants/components/IframeStyles";
import Link from "next/link";
import { GithubIcon } from "componants/components/icons";
import ButtonCustom from "componants/components/ButtonCustom";

interface PageParams {
  slug: string;
  locale: string;
}

export default async function Page({ params }: { params: PageParams }) {
  const { slug, locale = "fr" } = params;
  
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "projects",
      locale,
      `${slug}.md`
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    const sections = {
      title: contentHtml.match(/<h2[^>]*>(.*?)<\/h2>/i)?.[1] || data.title,
      description: contentHtml.match(/<h4[^>]*>Description<\/h4>([\s\S]*?)(?=<h4|<h3|<h2|$)/i)?.[1] || data.description,
      conception: contentHtml.match(/<h4[^>]*>Conception<\/h4>([\s\S]*?)(?=<h4|<h3|<h2|$)/i)?.[1] || "",
      fonctionnalites: contentHtml.match(/<h4[^>]*>Fonctionnalités<\/h4>([\s\S]*?)(?=<h4|<h3|<h2|$)/i)?.[1] || "",
      apercu: contentHtml.match(/<h3[^>]*>Aperçu<\/h3>([\s\S]*?)(?=<h3|<h2|$)/i)?.[1] || "",
      github: contentHtml.match(/<a href="(https:\/\/github\.com\/[^"]+)">GitHub<\/a>/)?.[1] || "#"
    };

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Project image */}
          {data.img && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={data.img}
                alt={data.img_alt || data.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Header section with title, button and tags */}
          <div className="mb-6">
            {/* Flex container for title and button */}
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-4xl font-bold text-purple-500">{sections.title || data.title}</h1>
                <ButtonCustom
                  title="Retour aux projets"
                  icon="chevron"
                />
            </div>
            
            {/* Tags */}
            {data.tags && (
                <div className="flex flex-wrap gap-2 mb-2">
                {data.tags.map((tag: string, index: number) => (
                  <TagBadge key={index} tag={tag} />
                ))}
                </div>
            )}
          </div>
          {/* Section Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 ">Description</h2>
            <div className="text-gray-500 dark:text-gray-400 prose prose-invert" dangerouslySetInnerHTML={{ __html: sections.description }}></div>
          </div>
          
          {/* Section Conception */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 ">Conception</h2>
            <div className="text-gray-500 dark:text-gray-400 prose prose-invert" dangerouslySetInnerHTML={{ __html: sections.conception }}></div>
          </div>
          
          {/* Section Fonctionnalités */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 ">Fonctionnalités</h2>
            <div className="text-gray-500 dark:text-gray-400 prose prose-invert" dangerouslySetInnerHTML={{ __html: sections.fonctionnalites }}></div>
          </div>
          
          {/* Section Aperçu */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 ">Aperçu</h2>
            <div className="text-gray-500 dark:text-gray-400 prose prose-invert" dangerouslySetInnerHTML={{ __html: sections.apercu }}></div>
          </div>
          
          {/* GitHub Link */}
          {sections.github && sections.github !== "#" && (
            <div className="mb-8">
              <Link href={sections.github} className="text-purple-400 hover:text-purple-300 flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <GithubIcon />
                Code source sur github
              </Link>
            </div>
          )}
          
          <IframeStyles />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading project:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const projectsDir = path.join(process.cwd(), "public", "projects", "fr");
    const files = fs.readdirSync(projectsDir);

    return files
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => ({
        slug: filename.replace(".md", ""),
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
