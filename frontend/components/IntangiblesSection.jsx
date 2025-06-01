import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "./IntangiblesSection.css"; // contains scroll-snap styling

const intangibles = [
  {
    title: "Love for Education and Self-Improvement",
    description:
      "José Rizal firmly believed that education was the fundamental key to both personal liberation and the advancement of the nation. Throughout his life, he demonstrated an insatiable thirst for knowledge, teaching himself multiple languages and mastering various disciplines such as literature, medicine, history, and philosophy. His relentless pursuit of self-improvement and intellectual growth serves as a timeless inspiration, encouraging students and individuals today to embrace lifelong learning, cultivate discipline, and develop critical thinking skills.",
    quote:
      "Education remains a powerful tool for social mobility and national transformation, empowering individuals to break barriers and contribute meaningfully to their communities.",
    backgroundImage: "/education.jpg",
  },
  {
    title: "Peaceful Reform and Nonviolent Resistance",
    description:
      "Unlike many revolutionaries of his time, José Rizal championed peaceful reform over armed conflict. He believed that genuine and lasting change could be achieved through education, civic dialogue, and the power of the written word. Through his novels, essays, and letters, Rizal exposed social injustices and inspired a national awakening—all without resorting to violence. He urged Filipinos to assert their rights through legal, moral, and intellectual means. His commitment to nonviolent resistance remains a powerful reminder that courage, reason, and integrity can be more transformative than force.",
    quote:
      "Advocating for change through civic engagement, peaceful protest, and activism expressed via art, journalism, education, and digital media.",
    backgroundImage: "/peaceful.jpeg",
  },
  {
    title: "Nationalism and Filipino Identity",
    description:
      "José Rizal passionately advocated for a deep sense of pride in Filipino heritage, especially in the rich cultures and traditions that existed long before colonial rule. Through his writings and actions, he encouraged Filipinos to rediscover and celebrate their identity, challenging the inferiority instilled by centuries of colonization. Rizal emphasized the importance of embracing one’s roots, language, and history as a means to restore national dignity and unity. His work sparked a cultural awakening, empowering generations to resist colonial narratives and affirm their identity with pride and confidence.",
    quote:
      "Modern relevance: Embracing cultural pride, advancing decolonization efforts, and revitalizing local languages, heritage, and indigenous traditions as foundations of national identity.",
    backgroundImage: "/national.jpg",
  },
  {
    title: "Empowerment of the Youth",
    description:
      "José Rizal recognized that the future of the Philippines rested in the hands of its younger generation, famously declaring, “Kabataang ang pag-asa ng bayan” (“The youth are the hope of the nation”). He urged young Filipinos to embrace education, cultivate a spirit of service, and assume leadership roles in driving social and political reforms. By investing in their intellectual and moral development, Rizal believed the youth could challenge outdated traditions, spark meaningful change, and build a more just society. His vision empowered young people to think independently, question authority, and contribute actively to the nation’s progress.",
    quote:
      "Encouraging youth participation in politics, environmental stewardship, social movements, innovation, and entrepreneurship, so they can shape a brighter future for their communities.",
    backgroundImage: "/youth.jpg",
  },
  {
    title: "Critical Thinking and Intellectual Freedom",
    description:
      "José Rizal was a courageous intellectual who used logic and facts to destroy colonial propaganda, uncover injustices inside the church, and oppose repressive power.  He promoted the search for the truth via investigation, reasoned analysis, and candid discussion.  According to Rizal, enabling individuals to challenge the established quo and arousing national consciousness required intellectual freedom.  Instead of mindless obedience, his books urged Filipinos to exercise critical thought, pursue information, and have meaningful conversations.",
    quote:
      "Promotes fact-checking, academic freedom, responsible use of information, and open debate; essential tools in resisting disinformation and defending democracy",
    backgroundImage: "/thinking.jpg",
  },
  {
    title: "Respect for Human Dignity and Rights",
    description:
      "José Rizal bravely revealed the harsh reality of colonial authority in his writings, particularly Noli Me Tangere and El Filibusterismo, exposing social injustice, corruption, and the misuse of power by the state and the church.  He felt that everyone should be treated with respect, fairness, and decency, regardless of their background or position.  The Philippines' larger fight for human rights was made possible by Rizal's support of equality, civic liberty, and moral responsibility.  Movements that oppose injustice and call for a more just and compassionate society are still motivated by his life and contributions.",
    quote:
      "Inspires human rights activism, legal reforms, and social justice initiatives that defend the dignity and rights of all people.",
    backgroundImage: "/dignity.jpg",
  },
  {
    title: "Power of Writing and Communication",
    description:
      "José Rizal used the written word as a potent tool for education, resistance, and a sense of national identity.  He revealed social injustices and inspired Filipinos to share a common vision of freedom and identity via his books, essays, correspondence, and journalism.  Rizal proved that words have the power to upend empires, enlighten people, and ignite revolutions when they are spoken with passion and purpose.  His legacy serves as a reminder that deliberate communication may serve as a catalyst for change and reform in addition to being a means of expression.",
    quote:
      "Writing, blogging, vlogging, social media activism, and journalism continue to serve as vital platforms for truth-telling, advocacy, and societal change.",
    backgroundImage: "/writing.jpg",
  },
  {
    title: "Moral Courage and Integrity",
    description:
      "Despite the possibility of incarceration, exile, and eventually death, José Rizal never wavered from his convictions.  He made the decision to stand up for justice, truth, and the well-being of his people rather than to be bullied, bought off, or silenced.  A person who lived for a greater good rather than for personal benefit, Rizal is a model of ethical leadership because of his unshakeable moral bravery and integrity.  True strength, as demonstrated by his example, is found in standing up for what is right, even at considerable personal cost.",

    quote:
      "Reflected in whistleblowers, ethical leaders, student activists, and everyday individuals who bravely speak out against corruption and injustice.",
    backgroundImage: "/courage.jpg",
  },
];

export default function IntangiblesSection() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    const slide = container?.children[index];
    if (container && slide) {
      const slideLeft = slide.offsetLeft;
      container.scrollTo({
        left: slideLeft,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const slideWidth = container.clientWidth;

    const newIndex = Math.round(scrollLeft / slideWidth);
    setCurrentIndex(newIndex);
  };

  // get all slides
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.children;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSlide = entries.find((entry) => entry.isIntersecting);
        if (visibleSlide) {
          const index = Array.from(slides).indexOf(visibleSlide.target);
          setCurrentIndex(index);
        }
      },
      {
        root: container,
        threshold: 0.6, // Adjust depending on what you consider “in view”
      }
    );

    Array.from(slides).forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative py-16 overflow-hidden"
      id="intangible-legacies"
    >
      {/* Background image transition layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundImage: `url(${intangibles[currentIndex].backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          💡 Intangible Legacies of Jose Rizal
        </h2>
        <p className="text-xl md:text-lg leading-relaxed text-white/90">
          José Rizal’s legacy goes beyond history books — it’s in the values he
          lived by. From love of learning to courage and critical thinking, his
          ideas still inspire Filipinos today to be thoughtful, brave, and
          proud.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Slides Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="scroll-container flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
        >
          {intangibles.map((item, index) => (
            <div
              key={index}
              className="slide min-w-full snap-center flex-shrink-0 px-12 py-20 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl mx-6 h-[30rem] md:h-[38rem] relative overflow-hidden"
              style={{
                backgroundImage: `url(${item.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Darker overlay for better contrast */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

              <div className="relative z-10 text-center w-full max-w-4xl px-6 md:px-12">
                <h3
                  className="text-3xl md:text-3xl text-center font-extrabold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {item.title}
                </h3>

                <p
                  className="mb-8 text-2xl md:text-2xl text-center text-white/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] leading-snug break-words"
                  style={{ lineHeight: 1.3 }}
                >
                  {item.description}
                </p>

                <blockquote
                  className="italic text-xl text-white/80 text-center break-words drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] max-w-3xl"
                  style={{ lineHeight: 1.4 }}
                >
                  “{item.quote}”
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* LEFT BUTTON (wrap from first to last) */}
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-transparent cursor-pointer shadow rounded-full 
    transition-transform duration-200 hover:scale-200"
          onClick={() =>
            scrollToIndex(
              (currentIndex - 1 + intangibles.length) % intangibles.length
            )
          }
        >
          <ChevronLeft />
        </button>

        {/* RIGHT BUTTON (wrap from last to first) */}
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-transparent cursor-pointer shadow rounded-full 
    transition-transform duration-200 hover:scale-200"
          onClick={() => scrollToIndex((currentIndex + 1) % intangibles.length)}
        >
          <ChevronRight />
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {intangibles.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className="transition-transform duration-300 transform hover:scale-110"
            >
              {currentIndex === i ? (
                <CircleDot className="w-4 h-4 text-white" />
              ) : (
                <Circle className="w-4 h-4 text-white/60 hover:text-white" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
