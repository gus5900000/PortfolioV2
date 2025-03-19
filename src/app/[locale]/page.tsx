import { useTranslations } from "next-intl";
import SkillCardProps from "componants/components/SkillCard";
import TagCard from "componants/components/TagCard";
import ProjectCard from "componants/components/ProjectCard";
import ButtonCustom from "componants/components/ButtonCustom";
import HolographicImage from "componants/components/HolographicImage";

export default function HomePage() {
  const t = useTranslations();
  return (
    <>
      <header className="container mx-auto max-w-7xl px-4 py-10 md:py-20">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
          <div className="md:flex-1 md:pr-8">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-8xl font-bold mb-3">
                {t("HomePage.title")}
              </h1>
              <span className="text-2xl text-zinc-400">
                {t("HomePage.subtitle")}
              </span>
            </div>

            <div className="flex flex-row gap-4 items-center justify-center md:justify-start w-full mt-6">
              <TagCard
                iconSrc="/icons/coding.svg"
                iconAlt="Icon coding"
                title={t("HomePage.headerRole.developer")}
              />
              <TagCard
                iconSrc="/icons/rocket.svg"
                iconAlt="Icon rocket"
                title={t("HomePage.headerRole.junior")}
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-end w-full md:w-auto py-8 md:py-0">
            <HolographicImage
              src="/portrait.webp"
              alt="Augustin Verissimo"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          <SkillCardProps
            iconSrc="/icons/terminal.svg"
            iconAlt="Terminal icon"
            title={t("SkillCard.Developer.title")}
            description={t("SkillCard.Developer.description")}
          />

          <SkillCardProps
            iconSrc="/icons/trophy.svg"
            iconAlt="Trophy icon"
            title={t("SkillCard.Jobs.title")}
            description={t("SkillCard.Jobs.description")}
          />

          <SkillCardProps
            iconSrc="/icons/strategy.svg"
            iconAlt="Strategy icon"
            title={t("SkillCard.Futur.title")}
            description={t("SkillCard.Futur.description")}
          />
        </div>
      </header>
      <main className="container mx-auto max-w-7xl px-4 pb-10">
        <div className="md:flex md:justify-between md:items-center">
          <div className="text-center md:text-left md:max-w-[450px]">
            <h2 className="text-4xl md:text-6xl font-bold mb-3">
              {t("PorjectHeader.title")}
            </h2>
            <span className="text-zinc-600 dark:text-zinc-400">
              {t("PorjectHeader.description")}
            </span>
          </div>

          <div className="flex justify-center md:block">
            <ButtonCustom title={t("PorjectHeader.button")} icon="chevron" />
          </div>
        </div>
        <div className="py-8 text-center flex flex-row flex-wrap gap-12 items-center justify-center md:py-12">
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
            iconSrc="/assets/stock-3.jpg"
            iconAlt="Background"
            title={t("ProjectCard.Cinéscope.title")}
            description={t("ProjectCard.Cinéscope.description")}
            tag={["PHP", "MySQL", "JavaScript", "CSS", "Epitech"]}
            date="11/02/2025"
            slug="cinescope"
          />
          <ProjectCard
            iconSrc="/assets/stock-3.jpg"
            iconAlt="Background"
            title={t("ProjectCard.AINAO.title")}
            description={t("ProjectCard.AINAO.description")}
            tag={["Prototype", "IOS", "Swift"]}
            date="11/02/2025"
            slug="ainao"
          />
        </div>
        <div className="text-center w-full md:text-left md:flex md:justify-start md:items-center md:py-32">
          <h3 className="text-4xl md:text-6xl font-bold mb-4 md:mb-0 md:mr-8">
            {t("HomePage.footer.content")}
          </h3>
          <div className="flex justify-center md:justify-start">
            <ButtonCustom
              title="Contactez moi"
              icon="envelope"
              href="augustin.verissimo@gmail.com"
            />
          </div>
        </div>
      </main>
      <footer className="container mx-auto max-w-7xl px-4 py-8 text-center text-gray-500 dark:text-gray-400">
        <span className="block mb-2">
          Designed & Developed by{" "}
          <a
            href="https://github.com/augustin-verissimo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:underline"
          >
            Augustin Verissimo
          </a>
        </span>
        <span className="block">&copy; 2025 Augustin Verissimo</span>
      </footer>
    </>
  );
}
