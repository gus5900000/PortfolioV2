"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsSection() {
  const t = useTranslations();
  const [visibleProjects, setVisibleProjects] = useState(3);
  
  const projects = [
    {
      iconSrc: "/assets/stock-8.jpg",
      iconAlt: "Background",
      title: t("ProjectCard.Epigusto.title"),
      description: t("ProjectCard.Epigusto.description"),
      tag: ["Jeu", "Hackathon", "Epitech", "Retro"],
      date: "09/04/2025",
      slug: "epigusto"
    },
    {
      iconSrc: "/assets/stock-7.jpg",
      iconAlt: "Background",
      title: t("ProjectCard.TweetAcademie.title"),
      description: t("ProjectCard.TweetAcademie.description"),
      tag: ["PHP", "JavaScript", "TailwindCSS", "MVC", "Epitech"],
      date: "16/03/2025",
      slug: "tweet-academie"
    },
    {
      iconSrc: "/assets/stock-6.png",
      iconAlt: "Background",
      title: t("ProjectCard.GusCss.title"),
      description: t("ProjectCard.GusCss.description"),
      tag: ["CSS", "Framework", "Epitech"],
      date: "06/03/2025",
      slug: "guscss"
    },
    {
      iconSrc: "/assets/stock-5.jpg",
      iconAlt: "Background",
      title: t("ProjectCard.Luvio.title"),
      description: t("ProjectCard.Luvio.description"),
      tag: ["PHP", "MySQL", "JavaScript", "CSS", "API REST", "Epitech"],
      date: "11/02/2025",
      slug: "luvio"
    },
    {
      iconSrc: "/assets/stock-4.jpg",
      iconAlt: "Background",
      title: t("ProjectCard.Cinéscope.title"),
      description: t("ProjectCard.Cinéscope.description"),
      tag: ["PHP", "MySQL", "JavaScript", "CSS", "Epitech"],
      date: "15/01/2025",
      slug: "cinescope"
    },
    {
      iconSrc: "/assets/stock-3.jpg",
      iconAlt: "Background",
      title: t("ProjectCard.AINAO.title"),
      description: t("ProjectCard.AINAO.description"),
      tag: ["Prototype", "IOS", "Swift"],
      date: "04/07/2024",
      slug: "ainao"
    },
    {
      iconSrc: "/assets/stock-2.jpg",
      iconAlt: "Background",
      title: t("ProjectCard.NetNinja.title"),
      description: t("ProjectCard.NetNinja.description"),
      tag: ["Prototype", "IOS", "Swift"],
      date: "23/05/2024",
      slug: "netninja"
    },
    {
      iconSrc: "/assets/stock-1.jpg",
      iconAlt: "Background",
      title: t("ProjectCard.SpaceInvader.title"),
      description: t("ProjectCard.SpaceInvader.description"),
      tag: ["Python", "Pyxel"],
      date: "07/02/2022",
      slug: "space-invader"
    }
  ];
  
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length));
  };

  return (
    <section id="projects">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-3">
              {t("PorjectHeader.title")}
            </h2>
            <span className="text-zinc-600 dark:text-zinc-400">
              {t("PorjectHeader.description")}
            </span>
          </div>
        </div>
        
        <div className="py-8 text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center md:py-12">
          {projects.slice(0, visibleProjects).map((project) => (
            <ProjectCard
              key={project.slug}
              iconSrc={project.iconSrc}
              iconAlt={project.iconAlt}
              title={project.title}
              description={project.description}
              tag={project.tag}
              date={project.date}
              slug={project.slug}
            />
          ))}
        </div>
        
        {visibleProjects < projects.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreProjects}
              className="group px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:translate-y-[-2px] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {t("ProjectsSection.loadMore")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
