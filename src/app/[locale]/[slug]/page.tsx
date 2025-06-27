import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { TagBadge } from "@/components/TagBadge";
import { IframeStyles } from "@/components/IframeStyles";
import ButtonCustom from "@/components/ButtonCustom";
import { getTranslations } from "next-intl/server";
import { promises as fsPromises } from 'fs';

interface PageParams {
  slug: string;
  locale: string;
}

interface ProjectData {
  title?: string;
  description?: string;
  img?: string;
  img_alt?: string;
  tags?: string[];
  [key: string]: unknown;
}

// Cache pour éviter de relire les fichiers plusieurs fois
const projectCache = new Map<string, { data: ProjectData; content: string }>();

async function getProjectData(slug: string, locale: string): Promise<{ data: ProjectData; content: string }> {
  const cacheKey = `${slug}-${locale}`;

  if (projectCache.has(cacheKey)) {
    return projectCache.get(cacheKey)!;
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
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

  const result = { data, content: processedContent.toString() };
  projectCache.set(cacheKey, result);

  return result;
}

// Validation des paramètres pour la sécurité
function validateParams(slug: string, locale: string): boolean {
  // Validation du slug : seulement lettres, chiffres, tirets
  const slugRegex = /^[a-zA-Z0-9-]+$/;
  if (!slug || !slugRegex.test(slug)) {
    return false;
  }

  // Validation de la locale
  const allowedLocales = ['fr', 'en'];
  if (!locale || !allowedLocales.includes(locale)) {
    return false;
  }

  return true;
}

// Génération de métadonnées pour le SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params;

  try {
    const { data } = await getProjectData(slug, locale);

    return {
      title: `${data.title} | Augustin Verissimo`,
      description: data.description ?? `Découvrez le projet ${data.title}`,
      openGraph: {
        title: data.title,
        description: data.description,
        images: data.img ? [{ url: data.img }] : [],
      },
    };
  } catch {
    return {
      title: 'Projet non trouvé | Augustin Verissimo',
    };
  }
}

async function ProjectContent({ slug, locale }: Readonly<PageParams>) {
  const t = await getTranslations();

  try {
    const { data, content } = await getProjectData(slug, locale);

    const sections = {
      title: content.match(/<h2[^>]*>(.*?)<\/h2>/i)?.[1] || data.title,
      description: content.match(/<h4[^>]*>Description<\/h4>([\s\S]*?)(?=<h4|<h3|<h2|$)/i)?.[1] || data.description,
      conception: content.match(/<h4[^>]*>Conception<\/h4>([\s\S]*?)(?=<h4|<h3|<h2|$)/i)?.[1] || "",
      fonctionnalites: content.match(/<h4[^>]*>Fonctionnalités<\/h4>([\s\S]*?)(?=<h4|<h3|<h2|$)/i)?.[1] || "",
      apercu: content.match(/<h2[^>]*>Aperçu<\/h2>([\s\S]*?)(?=<h2|$)/i)?.[1] ||
        content.match(/<h3[^>]*>Aperçu<\/h3>([\s\S]*?)(?=<h3|<h2|$)/i)?.[1] || "",
      github: content.match(/<a href="(https:\/\/github\.com\/[^"]+)"[^>]*>/i)?.[1] || "#"
    };

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">          {/* Project image */}
          {data.img && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={data.img}
                alt={data.img_alt || data.title || 'Project image'}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Header section with title, button and tags */}
          <div className="mb-6">
            {/* Flex container for title and button */}
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-4xl font-bold text-purple-500">{sections.title || data.title || 'Projet'}</h1>
              <ButtonCustom
                title="Retour aux projets"
                icon="chevron"
              />
            </div>

            {/* Tags */}
            {data.tags && Array.isArray(data.tags) && (
              <div className="flex flex-wrap gap-2 mb-2">
                {data.tags.map((tag: string, index: number) => (
                  <TagBadge key={index} tag={tag} />
                ))}
              </div>
            )}
          </div>
          {/* Section Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 ">{t("ProjectContent.description")}</h2>
            <div className="text-gray-500 dark:text-gray-400 prose prose-invert" dangerouslySetInnerHTML={{ __html: sections.description || '' }}></div>
          </div>
          {/* Section Conception */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 ">{t("ProjectContent.design")}</h2>
            <div className="text-gray-500 dark:text-gray-400 prose prose-invert" dangerouslySetInnerHTML={{ __html: sections.conception || '' }}></div>
          </div>

          {/* Section Fonctionnalités */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 ">{t("ProjectContent.features")}</h2>
            <div className="text-gray-500 dark:text-gray-400 prose prose-invert" dangerouslySetInnerHTML={{ __html: sections.fonctionnalites || '' }}></div>
          </div>

          {/* Section Aperçu */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 ">{t("ProjectContent.overview")}</h2>
            <div className="text-gray-500 dark:text-gray-400 prose prose-invert" dangerouslySetInnerHTML={{ __html: sections.apercu || '' }}></div>
          </div>

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
    const locales = ['fr', 'en']; // Ajoutez vos langues supportées
    const allParams: { slug: string; locale: string }[] = [];

    for (const locale of locales) {
      const projectsDir = path.join(process.cwd(), "src", "content", "projects", locale);

      try {
        await fsPromises.access(projectsDir);
        const files = await fsPromises.readdir(projectsDir);

        const localeParams = files
          .filter(filename => filename.endsWith(".md"))
          .map(filename => ({
            slug: filename.replace(".md", ""),
            locale
          }));
        allParams.push(...localeParams);
      } catch {
        console.warn(`Directory not accessible: ${projectsDir}`);
      }
    }

    return allParams;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params;

  if (!slug || !locale || !validateParams(slug, locale)) {
    notFound();
  }

  return <ProjectContent slug={slug} locale={locale} />;
}