import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./FlipCard.css";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function FlipCard({
  frontImage,
  title,
  description,
  isFlipped,
  onClick,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="w-full h-72 md:h-80 hover:scale-105 transition-transform duration-300 cursor-pointer"
      variants={cardVariants}
      onClick={onClick}
      style={{ perspective: "1000px" }}
    >
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={frontImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flip-card-back text-black bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center text-center text-sm">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
