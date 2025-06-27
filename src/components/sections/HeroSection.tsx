import { useTranslations } from "next-intl";
import SkillCardProps from "@/components/SkillCard";
import TagCard from "@/components/TagCard";
import HolographicImage from "@/components/HolographicImage";

export default function HeroSection() {
  const t = useTranslations();
  
  return (
    <section id="home" className="container mx-auto max-w-7xl px-4 py-10 md:py-20">
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
    </section>
  );
}
