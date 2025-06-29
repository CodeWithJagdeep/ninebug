import { companies } from "@/data/DataStore";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
export const InfiniteScrollLogos = () => {
  const { t } = useTranslation();
  return (
    <motion.section className="w-full flex flex-col items-center bg-black mb-10">
      <div className="w-full max-w-6xl px-4 text-center">
        <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-10">
          {t("infiniteScroll.getHiredText")}
        </p>
      </div>

      <div className="relative overflow-hidden w-full">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
        >
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-32 sm:min-w-40 md:min-w-52 h-8 mx-3 sm:mx-4 md:mx-6"
            >
              <img
                src={company.logo}
                className="object-contain h-full w-full transition duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
