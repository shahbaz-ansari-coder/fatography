// ─── Import all main page sections
import About from "../components/home/About";
import CelebrityGallery from "../components/home/Celebrity";
import CustomCursor from "../components/home/CustomCursor";
import DemoImges from "../components/home/DemoImges";
import Footer from "../components/home/Footer";
import Gallery from "../components/home/Gallery";
import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Portfolio from "../components/home/Portfolio";
import Preloader from "../components/home/Preloader";
import ReviewSection from "../components/home/Reviews";
import ScrollReveal from "../components/home/ScrollReveal";
import Service from "../components/home/Service";
import Slider from "../components/home/Slider";
import VideoTestimonials from "../components/home/VideoTestimonials";
import ViewImages from "../components/home/ViewImages";


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
          <Slider />
          <Hero/>
          <About />
          <Gallery />
          <CelebrityGallery/>
          <DemoImges/>
          <Service />
          <ViewImages/>
          <VideoTestimonials/>
          <ReviewSection/>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
