// ─── Import all main page sections
import About from "../../components/home/About";
import CelebrityGallery from "../../components/home/Celebrity";
import ContactSection from "../../components/home/ContactSection";
import DemoImges from "../../components/home/DemoImges";
import FloatingButtons from "../../components/home/FloatingButtons ";
import Footer from "../../components/home/Footer";
import Gallery from "../../components/home/Gallery";
import Header from "../../components/home/Header";
import Hero from "../../components/home/Hero";
import Preloader from "../../components/home/Preloader";
import ReviewSection from "../../components/home/Reviews";
import SEO from "../../components/home/SEO";
import Service from "../../components/home/Service";
import Slider from "../../components/home/Slider";
import VideoTestimonials from "../../components/home/VideoTestimonials";
// ─── Main application layout
function Home() {
  return (
    <>
      <SEO
        title="Best Photography Services in Pakistan | Fatography"
        description="Professional wedding, fashion and celebrity photography services in Pakistan."
        url="https://fatography.co/"
      />
      <div id="top" className="home-page">
        <Header />
        <Preloader />
        <main>
          <article>
            <Slider />
            <Hero />
            <About />
            <Gallery />
            <Service />
            <CelebrityGallery />
            <DemoImges />
            <VideoTestimonials />
            <ReviewSection />
          </article>
        </main>
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export default Home;
