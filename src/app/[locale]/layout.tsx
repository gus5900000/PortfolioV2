import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import { ThemeProvider } from "@/components/ThemeProvider";
import MaintenancePage from "@/components/MaintenancePage";

// Mettre à true pour activer le mode maintenance
const MAINTENANCE_MODE = true;

export const metadata: Metadata = {
  title: MAINTENANCE_MODE ? "Maintenance - Augustin Verissimo" : "Augustin Verissimo",
  description: MAINTENANCE_MODE ? "Site en maintenance" : "Portfolio d'Augustin Verissimo",
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

  // Mode maintenance : afficher uniquement la page de maintenance
  if (MAINTENANCE_MODE) {
    return (
      <html lang={locale} suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MaintenancePage />
          </ThemeProvider>
        </body>
      </html>
    );
  }

  // Mode normal (commenté pour le moment)
  const Navbar = (await import("@/components/NavBar")).default;
  const Footer = (await import("@/components/Footer")).default;

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
            <Navbar />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
