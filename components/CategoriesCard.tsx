"use client";
import { delay, easeIn, inView, scale } from "motion/react";
import { useEffect, useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

interface CatType {
  id: string;
  name: string;
}

const CategoriesCard = () => {
  const [category, setCategory] = useState<CatType[]>([]);
  const getCat = async () => {
    const res = await fetch("/api/category/");
    const result = await res.json();
    setCategory(result);
    console.log(result);
  };

  useEffect(() => {
    getCat();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 2, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: easeIn, delay: 0.2 }}
      className="w-full flex justify-center origin-left"
    >
      <div className="flex flex-col w-full gap-3 md:w-[75%] lg:w-[75%] items-center justify-center py-6">
        <motion.div
          initial={{ scaleX: 3, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
          className="bg-[#d6ccfb] px-4 py-1  rounded-sm text-[12px] text-[#7353e6] font-semibold origin-left"
        >
          Categories
        </motion.div>
        <motion.div
          initial={{ scaleX: 2, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
          className="text-3xl font-bold capitalize origin-left"
        >
          Browse By Categories
        </motion.div>
        <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-3">
          {category.map((c) => (
            <div key={c?.id}>
              <motion.div
                initial={{ scaleX: 2, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`p-6 bg-[#e9f6ff] cursor-pointer origin-left text-[#227ae8] rounded-sm flex items-center gap-3 shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                <span>
                  <FaBullhorn />
                </span>
                <span className="text-[12px] font-semibold">{c.name}</span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoriesCard;
