import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  // Hook to get scroll progress [0..1]
  const { scrollY } = useScroll();

  // Map scrollY to translateY for parallax effect
  // Adjust 0.5 to control parallax speed (0.5 means half speed)
  const y = useTransform(scrollY, [0, 500], [0, -250]);

  return (
    <section className="relative h-screen w-screen flex items-center justify-center text-white overflow-hidden bg-black">
      {/* Background Image with parallax vertical movement */}
      <motion.img
        src="/Jose_Rizal_full.jpg"
        alt="Jose Rizal"
        className="absolute w-full h-full object-cover opacity-60 inset-0 z-0 bg-cover bg-center"
        style={{ y }} // <-- parallax transform here
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1.2, opacity: scrollY > 100 ? 0 : 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0  bg-black/50 z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Welcome to Rizal’s Legacy
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-200"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          This interactive website invites you to rediscover the timeless impact
          of Dr. Jose Rizal. From his writings and principles to the modern
          ideals he helped inspire, journey through his enduring legacy and
          reflect on what it means to be truly free.
        </motion.p>
      </motion.div>
    </section>
  );
}
