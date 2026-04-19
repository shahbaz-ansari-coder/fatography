import React from 'react'

function About() {
  return (
    <section
      className="section about"
      id="about"
      aria-label="about me"
    >
      <div className="container">

        {/* ─── About text content */}
        <div className="about-content">
          <h2 className="h2 section-title" data-reveal="right">
            Welcome to Fatography
          </h2>

          {/* ─── About description */}
          <div className="wrapper has-before" data-reveal="right">
            <p className="section-text">
              Since 2009, <em className="em">Fatography</em> has captured
              weddings, events, fashion, and lifestyle moments with creativity
              and precision. <br />
              Turning memories into timeless and meaningful visual stories.
            </p>
          </div>
        </div>

        {/* ─── About main image banner */}
        <figure className="about-banner" data-reveal="left">
          <div
            className="img-holder has-before"
            style={{
              "--width": 512,
              "--height": 684
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
            className="shape shape-1 !h-[80px]"
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

