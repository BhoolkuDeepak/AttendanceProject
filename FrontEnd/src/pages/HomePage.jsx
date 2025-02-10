import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        setStep((prevStep) => Math.min(prevStep + 1, 2));
      } else {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">


      {/* Sampark Section */}
      {step === 0 && (
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-[rgb(69,75,27)] absolute"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Sampark
        </motion.h1>
      )}

      {/* Created By Section */}
      {step === 1 && (
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-[rgb(69,75,27)] absolute"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Created by DG
        </motion.h2>
      )}

      {/* About the App Section */}
      {step === 2 && (
        <motion.p
          className="text-xl md:text-3xl font-medium text-[rgb(69,75,27)] text-center absolute"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          This app is designed to provide Event Management.
        </motion.p>
      )}
    </div>
  );
};

export default HomePage;
