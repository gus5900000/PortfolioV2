'use client';
import ParcoursProfessionnel from "@/components/ParcoursProfessionel";
import { UserIcon, EmailIcon, LocationIcon, CVIcon } from "@/components/icons";
import { useTranslations } from "next-intl";
import ParcoursEducatif from "@/components/ParcoursEducatif";

export default function AboutSection() {
  const t = useTranslations();

  return (
    <section id="about" className="min-h-screen py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-8">
          {t('AboutCard.title')}
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm md:w-[450px] m-3">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary">
                  <UserIcon />
                </div>
                <span className="text-foreground">Web@cademie by Epitech</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary">
                  <EmailIcon />
                </div>
                <span className="text-foreground">augustin.verissimo@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary">
                  <LocationIcon />
                </div>
                <span className="text-foreground">Lille, France</span>
              </div>

              <button
                className="flex items-center gap-3 w-full hover:bg-accent hover:text-accent-foreground transition-colors rounded-md"
                onClick={() => window.open('/Augustin_Verissimo_CV.pdf', '_blank')}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary">
                  <CVIcon />
                </div>
                <span className="text-foreground font-medium underline underline-offset-1">{t('AboutCard.cv')}</span>
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm md:w-[450px] m-3">
            <div className="prose dark:prose-invert">
              <p className="text-gray-500 dark:text-gray-400">{t('AboutCard.content')}</p>
            </div>
          </div>
        </div>
        
        <ParcoursProfessionnel />
        <ParcoursEducatif />
      </div>
    </section>
  );
}
