import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) setIsOpen(true);
    else setIsOpen(false);
  }, [isMobile]);

  const handleAccept = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          />

          <motion.div
            className="relative flex flex-col items-center z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="
          text-5xl sm:text-7xl md:text-8xl font-bold text-[#FFC19E]
          flex flex-wrap justify-center text-center
          [font-family:'Short_Stack',sans-serif]    
          [-webkit-text-stroke:8px_#7a4b2e]
          md:[-webkit-text-stroke:15px_#7a4b2e]
          [paint-order:stroke_fill]
          -mb-5
          z-10
        ">
              Disclaimer
            </h2>

            <div className=" bg-gradient-to-b from-[rgb(255,213,183)] to-[rgb(255,147,123)] rounded-2xl p-6 max-w-md w-full text-center shadow-lg">
              <p className="text-[#7a4b2e] font-bold text-2xl [font-family:'Short_Stack',sans-serif] text-center">
                Due to Spotify limitations, if you're on mobile only a preview of the song is played. Sorry!
              </p>
              <button
                onClick={handleAccept}
                className="bg-[#7a4b2e] text-[#FFC19E] px-6 py-3 rounded-xl [font-family:'Short_Stack',sans-serif] mt-5"
              >
                Accept
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;
