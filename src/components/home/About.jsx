import React from 'react'
import { Link } from 'react-router';

function About() {
  return (
    <section className="section about" id="about" aria-label="about me">
      <div className="container">
        {/* ─── About text content */}
        <div className="about-content">
          <h1 className="h2 section-title">
            Premier Photography & Videography Studio
          </h1>

          {/* ─── About description */}
          <div className="wrapper has-before">
            <p className="section-text">
              <span className="!mb-5">
                Fatography founded by Fatimah Haroon in 2009, a London-trained
                filmmaker and photographer who studied Film & Television at
                Central Saint Martins, and holds a Master's degree from
                Birmingham in Film Marketing, Fatography brings a rare blend of
                academic rigor and global creative instinct to every shoot. Her
                career has taken her from the red carpet of the Cannes Film
                Festival to international productions and PR work with
                celebrated names in film and fashion, giving Fatography a visual
                language shaped by some of the world's leading creative
                capitals. This global perspective, paired with a deep
                understanding of the Middle East market, is what sets Fatography
                apart as a premier photography and videography studio in Dubai.
              </span>
              <span className="!mb-5">
                Today, Fatography is recognised as one of Dubai's best
                photography and videography teams, delivering 17+ years of
                creative excellence across weddings, pre-wedding shoots,
                fashion, product, corporate, and brand photography. From the
                first consultation to final delivery, our Dubai-based team
                combines international training with local expertise to create
                visuals that are considered, authentic, and built to elevate
                your brand or your biggest moments. Whether you're searching for
                a top-notch wedding photographer in Dubai, a corporate and
                product photography studio, or a creative partner for high-end
                brand content, Fatography offers the polish, professionalism,
                and storytelling depth of a globally trained creative house —
                right here in the heart of Dubai.
              </span>
            </p>
            <Link to={"/about-us"}>
              <button className="main-glow-btn">Read More About Us</button>
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

