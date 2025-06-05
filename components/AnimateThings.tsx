import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const AnimateThings = ({ children, className = "", delay = 0.1 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, // 0.2 = 20% visible
    triggerOnce: true, // only once
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );


export default AnimateThings