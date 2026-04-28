import React from "react";
import Header from "../../components/home/Header";
import VideoTestimonials from "../../components/home/VideoTestimonials";
import ReviewSection from "../../components/home/Reviews";
import Footer from "../../components/home/Footer";
import Preloader from "../../components/home/Preloader";

const TestimonialsPage = () => {
  return (
    <>
    <Preloader/>
      <Header />
      <main className="!py-5 !sm:py-10">
        <VideoTestimonials />
        <ReviewSection />
      </main>
      <Footer />
    </>
  );
};

export default TestimonialsPage;
