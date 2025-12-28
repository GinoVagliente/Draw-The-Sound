import { motion } from "framer-motion";

const Title = ({ startAnimation }) => {
  const text = "Draw the Sound";

  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 20 } }
  };

  const containerVariants = {
    visible: { transition: { staggerChildren: 0.05 } }
  };

  return (
    <div className="flex justify-center items-center pl-20 pr-20 pt-5">
      <motion.h1
        className="
          text-5xl sm:text-7xl md:text-8xl font-bold text-[#FFC19E]
          flex flex-wrap justify-center text-center
          [font-family:'Short_Stack',sans-serif]    
          [-webkit-text-stroke:8px_#7a4b2e]
          md:[-webkit-text-stroke:15px_#7a4b2e]
          [paint-order:stroke_fill] z-0
        "
        variants={containerVariants}
        initial="hidden"
        animate={startAnimation ? "visible" : "hidden"}
      >
        {text.split(" ").map((word, i, arr) => (
          <motion.span key={i} className="inline-flex relative z-0">
            {word.split("").map((char, j) => (
              <motion.span
                key={j}
                variants={letterVariants}
                whileHover={{ y: -15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="inline-block relative z-0"
              >

                <span className="absolute top-2 right-1 z-10 w-full h-full text-[#7a4b2e] opacity-10">
                  {char}
                </span>

                {char}
              </motion.span>
            ))}
            {i < arr.length - 1 && <motion.span variants={letterVariants}>&nbsp;</motion.span>}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default Title;
