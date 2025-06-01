import FadeInSection from "../components/FadeInSection";
import FreedomWall from "../components/FreedomWall";
import HeroSection from "../components/HeroSection";
import IntangiblesSection from "../components/IntangiblesSection";
import TangibleLegacies from "../components/TangibleLegacies";

function App() {
  return (
    <div>
      <FadeInSection>
        <HeroSection />
      </FadeInSection>

      <TangibleLegacies />

      <IntangiblesSection />
      <FreedomWall />
    </div>
  );
}

export default App;
