import { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import CustomCursor from './CustomCursor';
import ScrollReveal from './ScrollReveal';
import '../styles/index.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate page load
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollReveal />
      <Header />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}

export default App;
