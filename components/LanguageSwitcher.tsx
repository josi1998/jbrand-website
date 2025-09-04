'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale || isPending) return;
    

    startTransition(() => {
      try {
        // Replace the first segment (locale) in the pathname
        const segments = pathname.split('/');
        if (segments[1] === 'en' || segments[1] === 'fr') {
          segments[1] = newLocale;
        } else {
          segments.splice(1, 0, newLocale);
        }
        const newPath = segments.join('/') || '/';
        router.push(newPath);
      } catch (error) {
        console.error('Language change error:', error);
        // Fallback navigation
        router.push(`/${newLocale}`);
      }
    });
  };

  return (
    <div className="flex items-center space-x-1">
      <motion.button
        onClick={() => handleLanguageChange('en')}
        className={`px-2.5 py-1.5 rounded-md text-sm font-medium language-switcher-button ${
          locale === 'en' 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        disabled={isPending}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: locale === 'en' ? 1.05 : 1,
          boxShadow: locale === 'en' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.2 }}
      >
        {isPending ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          'EN'
        )}
      </motion.button>
      <motion.button
        onClick={() => handleLanguageChange('fr')}
        className={`px-2.5 py-1.5 rounded-md text-sm font-medium language-switcher-button ${
          locale === 'fr' 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        disabled={isPending}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: locale === 'fr' ? 1.05 : 1,
          boxShadow: locale === 'fr' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.2 }}
      >
        {isPending ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          'FR'
        )}
      </motion.button>
    </div>
  );
} 