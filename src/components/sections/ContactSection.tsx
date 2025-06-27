import { useTranslations } from "next-intl";
import ButtonCustom from "@/components/ButtonCustom";

export default function ContactSection() {
  const t = useTranslations();

  return (
    <section id="contact">
      <div className="container mx-auto max-w-7xl px-4">
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
      </div>
    </section>
  );
}
