import FlipCard from "./FlipCard";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function TangiblesSection() {
  const [bgImage, setBgImage] = useState("/noli.jpg"); // default background
  const [flippedIndex, setFlippedIndex] = useState(null); // index of the currently flipped card

  // Parallax effect
  const { scrollY } = useScroll();
  // Adjust range and distance to control parallax strength
  const y = useTransform(scrollY, [0, 500], [0, -200]);

  const cards = [
    {
      title: "Noli Me Tangere (1887)",
      image: "/noli.jpg",
      description:
        "Noli Me Tangere, meaning “touch me not” in Latin, is a political novel by José Rizal that exposed injustices under Spanish rule. Written in Spanish in 1887 while Rizal was in Europe, it became one of the most influential works in Philippine literature. It remains relevant today as its themes such as corruption, abuse of power, and inequality, still reflect issues in modern Philippine society. It continues to inspire activism, critical thinking, and discussions on social justice and national identity among Filipinos.",
    },
    {
      title: "El Filibusterismo (1891)",
      image: "/fili.png",
      description:
        "El Filibusterismo not only exposed the social injustices of Rizal’s time but continues to inspire Filipinos today. Its impact lies in awakening national consciousness, promoting the fight against oppression, and encouraging calls for social reform and justice. The novel remains a powerful symbol of Filipino identity and resistance, studied in schools and referenced in discussions about governance, freedom, and equality in contemporary Philippine society.",
    },
    {
      title: "Mi Último Adiós (1896)",
      image: "/ultimo.jpg",
      description:
        "His farewell poem, smuggled inside a lamp. Now studied and displayed in museums. “Mi Ultimo Adios” was Rizal’s final tribute, a heartfelt farewell to the nation he loved. Though he didn’t live to see freedom, he foresaw the dawn of democracy. More than just a poem, it was a legacy of patriotism and selfless sacrifice. Today, it remains relevant as a powerful reminder to love and serve the country, stand against injustice, and uphold freedom and national pride",
    },
    {
      title: "Annotations to Morga’s Sucesos (1890)",
      image: "/morga.png",
      description:
        "Rizal’s annotations of Morga’s Sucesos de las Islas Filipinas were among the first to present Philippine history from a Filipino perspective, challenging Spanish accounts that portrayed natives as uncivilized. It remains important for promoting pride in pre-colonial heritage and encouraging a more accurate understanding of Filipino identity and history.",
    },
    {
      title: "Essays in La Solidaridad",
      image: "/solidaridad.jpg",
      description:
        "Esasys like Rizal’s Sobre la indolencia de los filipinos responded to claims that Filipinos were lazy by highlighting their prosperity and skills before Spanish colonization, which he said suppressed their potential. The essay remains relevant by challenging harmful stereotypes and encouraging Filipinos to recognize their true strengths beyond colonial biases.",
    },
    {
      title: "Sketches & Sculptures",
      image: "/sculpture.jpg",
      description:
        "Rizal created sketches, self-portraits, and sculptures like 'The Mother's Revenge'. The terra cotta sculpture Mother’s Revenge represents the Philippines’ resistance to Spanish colonization, showing a mother dog shielding her pup from a crocodile. Made by Rizal during his exile, it captures the long history of struggle and the desire for independence. Today, it continues to stand as a strong symbol of Filipino strength and the enduring fight against injustice.",
    },
  ];

  const handleCardClick = (index, image) => {
    setBgImage(image);
    setFlippedIndex((prev) => (prev === index ? null : index)); // flip or unflip
  };

  return (
    <section
      className="min-h-screen py-16 px-4 bg-cover bg-center bg-no-repeat relative"
      id="tangible-legacies"
    >
      {/* Background image with fade transition and parallax vertical move */}
      <AnimatePresence mode="wait">
        <motion.img
          key={bgImage}
          src={bgImage}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-[122.5%] object-cover z-0"
          style={{ y }} // Apply parallax vertical transform here
        />
      </AnimatePresence>

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl text-white font-bold text-center mb-10">
          ✍️ Tangible Legacies of Jose Rizal’s Works
        </h2>

        {/* Introduction paragraph */}
        <h3 className="max-w-5xl mx-auto text-white text-xl text-center mb-12 px-4 md:px-0">
          José Rizal’s life and works left a profound impact on the Philippines,
          not only through his writings and ideas but also through lasting
          physical artifacts and symbols. These tangible legacies—ranging from
          sculptures to preserved writings—serve as enduring reminders of his
          courage, patriotism, and vision for a free nation. Explore these
          meaningful relics that continue to inspire and connect Filipinos to
          their rich history and heritage.
        </h3>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => setBgImage(card.image)}
              className="cursor-pointer"
            >
              <FlipCard
                frontImage={card.image}
                title={card.title}
                description={card.description}
                isFlipped={flippedIndex === index}
                onClick={() => handleCardClick(index, card.image)}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
