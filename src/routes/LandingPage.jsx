import { useRef } from 'react';
import CardSection from '../components/CardSection';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Nav from '../components/Nav';
import PinkSection from '../components/PinkSection';

function LandingPage() {
  const pinkSectionRef = useRef(null);

  const scrollToPinkSection = () => {
    pinkSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Nav />
      <HeroSection scrollToPinkSection={scrollToPinkSection} />
      <CardSection />
      <PinkSection ref={pinkSectionRef} />
      <Footer />
    </>
  );
}

export default LandingPage;
