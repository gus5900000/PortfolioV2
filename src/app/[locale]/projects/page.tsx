import { useTranslations } from "next-intl";
import ProjectCard from "componants/components/ProjectCard";

export default function ProjectsPage() {
  const t = useTranslations();

  return (
<div className="container mx-auto px-4 max-w-7xl">
    <div className="py-8 text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center md:py-12">
        <ProjectCard
          iconSrc="/assets/stock-1.jpg"
          iconAlt="Background"
          title={t("ProjectCard.Luvio.title")}
          description={t("ProjectCard.Luvio.description")}
          tag={["PHP", "MySQL", "JavaScript", "CSS", "API REST", "Epitech"]}
          date="11/02/2025"
          slug="luvio"
        />
        <ProjectCard
          iconSrc="/assets/stock-2.jpg"
          iconAlt="Background"
          title={t("ProjectCard.Cinéscope.title")}
          description={t("ProjectCard.Cinéscope.description")}
          tag={["PHP", "MySQL", "JavaScript", "CSS", "Epitech"]}
          date="15/01/2025"
          slug="cinescope"
        />
        <ProjectCard
          iconSrc="/assets/stock-3.jpg"
          iconAlt="Background"
          title={t("ProjectCard.AINAO.title")}
          description={t("ProjectCard.AINAO.description")}
          tag={["Prototype", "IOS", "Swift"]}
          date="04/07/2024"
          slug="ainao"
        />
        <ProjectCard
          iconSrc="/assets/stock-4.jpg"
          iconAlt="Background"
          title={t("ProjectCard.NetNinja.title")}
          description={t("ProjectCard.NetNinja.description")}
          tag={["Prototype", "IOS", "Swift"]}
          date="23/05/2024"
          slug="netninja"
        />
        <ProjectCard
          iconSrc="/assets/stock-1.jpg"
          iconAlt="Background"
          title={t("ProjectCard.Toolbox.title")}
          description={t("ProjectCard.Toolbox.description")}
          tag={["Toolbox", "Python", "PyQt5", "API"]}
          date="07/02/2024"
          slug="toolbox"
        />
        <ProjectCard
          iconSrc="/assets/stock-2.jpg"
          iconAlt="Background"
          title={t("ProjectCard.SpaceInvader.title")}
          description={t("ProjectCard.SpaceInvader.description")}
          tag={["Python", "Pyxel"]}
          date="07/02/2022"
          slug="space-invader"
        />
      </div>
    </div>
  );
}
