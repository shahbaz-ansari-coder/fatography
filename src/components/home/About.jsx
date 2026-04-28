import React from 'react'
import { Link } from 'react-router';

function About() {
  return (
    <section className="section about" id="about" aria-label="about me">
      <div className="container">
        {/* ─── About text content */}
        <div className="about-content">
          <h2 className="h2 section-title">
            Professional Photography & Videography Services in Dubai
          </h2>

          {/* ─── About description */}
          <div className="wrapper has-before">
            <p className="section-text">
              Welcome to Fatography, Dubai’s premier studio for expert
              photography and videography. Whether you are celebrating a
              once-in-a-lifetime milestone or elevating your corporate brand, we
              believe that every fleeting moment deserves to be preserved with
              artistic brilliance and uncompromising quality. From breathtaking
              pre-wedding shoots to high-profile corporate events, our team of
              skilled professionals is dedicated to delivering stunning,
              story-driven results. We pair top-notch equipment with creative,
              industry-leading editing to produce high-resolution imagery that
              truly speaks for itself. At Fatography, we do more than just take
              pictures—we craft visual legacies.
            </p>
            <Link to={"/about-us"}>
              <button className="main-glow-btn">Read More</button>
            </Link>
          </div>
        </div>

        {/* ─── About main image banner */}
        <figure className="about-banner">
          <div
            className="img-holder has-before rounded-4xl"
            style={{
              "--width": 612,
              "--height": 584,
            }}
          >
            <img
              src="/fatima.jpg"
              width="512"
              height="684"
              loading="lazy"
              alt="Robert Shaw"
              className="img-cover"
            />
          </div>

          {/* ─── Decorative shapes */}
          <img
            src="/logo.png"
            width="180"
            height="180"
            loading="lazy"
            alt=""
            className="shape shape-1 !h-[80px] !w-[80px]"
          />

          <img
            src="/about-shape-2.svg"
            width="659"
            height="653"
            loading="lazy"
            alt=""
            className="shape shape-2"
          />
        </figure>

        {/* ─── Background shape */}
        <img
          src="/about-shape-3.svg"
          width="239"
          height="232"
          loading="lazy"
          alt=""
          className="shape shape-3"
        />
      </div>
    </section>
  );
}

export default About;

