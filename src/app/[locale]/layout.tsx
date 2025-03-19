import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import { ThemeProvider } from "componants/components/ThemeProvider";
import Navbar from "componants/components/NavBar";
import AnimatedLayout from "componants/components/AnimatedLayout";

export const metadata: Metadata = {
  title: "Augustin Verissimo",
  description: "Portfolio d'Augustin Verissimo",
  icons: {
    icon: "/icons/terminal.svg",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <AnimatedLayout>
              <Navbar />
              <main>{children}</main>
            </AnimatedLayout>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
