import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-20 right-4 md:top-6 md:right-6 z-50 bg-foreground text-background p-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Change language"
    >
      <Globe size={20} />
      <span className="text-sm font-bold uppercase">
        {i18n.language === "es" ? "EN" : "ES"}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;
