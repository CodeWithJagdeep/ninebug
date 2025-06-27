import { companies } from "@/data/DataStore";
import { motion } from "framer-motion";

export const InfiniteScrollLogos = () => {
  return (
    <motion.section className="w-full flex flex-col items-center bg-black mb-10">
      <div className="w-full max-w-6xl px-4 text-center">
        <p className="text-gray-400 text-lg mb-10">
          Get hired at top companies
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
              className="flex items-center justify-center min-w-52 h-8 mx-6"
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
