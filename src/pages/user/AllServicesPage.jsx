import React from 'react'
import Service from '../../components/home/Service';
import DemoImges from '../../components/home/DemoImges';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Preloader from '../../components/home/Preloader';
import ContactSection from '../../components/home/ContactSection';
import SEO from '../../components/home/SEO';

const AllServicesPage = () => {
  return (
    <>
      <SEO
        title="Dubai Photography & Videography Services | Fatography"
        description="Explore a full range of photography and videography services in Dubai by Fatography. From fashion to weddings, events, products & more. Book your service today!"
      />
      <Preloader />
      <Header />
      <main className="!py-5 !sm:py-10">
        <Service />
        <DemoImges />
      </main>
      <ContactSection />
      <Footer />
    </>
  );
}

export default AllServicesPage
