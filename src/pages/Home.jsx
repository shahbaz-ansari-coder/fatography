// ─── Import all main page sections
import About from "../components/home/About";
import Category from "../components/home/Category";
import CustomCursor from "../components/home/CustomCursor";
import Footer from "../components/home/Footer";
import Gallery from "../components/home/Gallery";
import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Portfolio from "../components/home/Portfolio";
import Preloader from "../components/home/Preloader";
import ScrollReveal from "../components/home/ScrollReveal";
import Service from "../components/home/Service";
import Slider from "../components/home/Slider";


// ─── Main application layout
function Home() {
  return (
    <div id="top">
      <Preloader />
      <ScrollReveal />
      <CustomCursor />
      <Header />

      <main>
        <article>
          <Hero/>
          <Slider />
          <Gallery />
          <Category />
          <About />
          <Service />
          <Portfolio />
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
