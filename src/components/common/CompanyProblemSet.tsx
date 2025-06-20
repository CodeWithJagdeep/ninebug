import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import type { ProblemSet } from "@/Types/types";

export const CompanyProblemSet = ({
  title,
  count,
  difficulty,
  companies,
}: ProblemSet) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className=" border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <div className="flex space-x-4 text-sm">
            <span className="text-gray-400">{count} problems</span>
            <span
              className={`${
                difficulty === "Easy"
                  ? "text-green-400"
                  : difficulty === "Medium"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {difficulty}
            </span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Practice
        </motion.button>
      </div>

      <div className="mt-6">
        <h4 className="text-sm text-gray-400 mb-3">Asked by:</h4>
        <div className="flex space-x-3">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`w-10 h-10 rounded-full  flex items-center justify-center text-white font-bold shadow-md`}
              title={company.name}
            >
              <img src={company.logo} alt="company_logo" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
