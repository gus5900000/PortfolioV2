'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const toggleLanguage = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <Button 
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      aria-label={`Changer la langue vers ${locale === 'fr' ? 'anglais' : 'français'}`}
      className="rounded-full w-9 h-9"
    >
      {locale === 'fr' ? (
        <motion.div
          initial={{ scale: 0.5, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          🇬🇧
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.5, rotate: 30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          🇫🇷
        </motion.div>
      )}
    </Button>
  );
};

export default LanguageSwitcher;