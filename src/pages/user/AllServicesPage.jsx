import React from 'react'
import Service from '../../components/home/Service';
import DemoImges from '../../components/home/DemoImges';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Preloader from '../../components/home/Preloader';

const AllServicesPage = () => {
  return (
    <>
    <Preloader/>
      <Header />
      <main className="!py-5 !sm:py-10">
        <Service />
        <DemoImges />
      </main>
      <Footer />
    </>
  );
}

export default AllServicesPage
