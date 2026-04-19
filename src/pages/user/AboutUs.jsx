import { motion } from "framer-motion";
import "../../style/aboutus.css";

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <motion.section
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="about-hero-overlay" />
        <img
          src="https://imgs.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=600&fit=crop"
          alt="Fatography Hero"
          fill
          className="about-hero-img"
          priority
        />
        <motion.div
          className="about-hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="about-hero-title" variants={itemVariants}>
            Fatography
          </motion.h1>
          <motion.p className="about-hero-subtitle" variants={itemVariants}>
            Capturing Stories, Creating Memories
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Introduction Section */}
      <motion.section
        className="about-introduction"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="about-intro-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="about-intro-header" variants={itemVariants}>
            <h2 className="about-section-title">INTRODUCTION</h2>
            <div className="about-title-line" />
          </motion.div>

          <motion.div
            className="about-intro-text-wrapper"
            variants={slideInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p className="about-intro-text">
              Welcome to Fatography. Since 2009, Fatography has set the standard
              for excellence, delivering exceptional photography, videography,
              editing, color grading, and digital marketing solutions. From
              breathtaking weddings and vibrant parties to high-fashion shoots,
              corporate events, culinary showcases, newborn portraits, and
              lifestyle sessions, we capture every story with artistry and
              precision. Our team combines creativity with technical mastery to
              ensure every frame reflects the emotion, beauty, and authenticity
              of the moment. At Fatography, we don&apos;t just take pictures —
              we craft timeless visual narratives that you&apos;ll cherish for
              years to come.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Us Core Section */}
      <motion.section
        className="about-core"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="about-core-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="about-core-header" variants={itemVariants}>
            <h2 className="about-section-title">
              Crafting Memories Through the Art of Photography
            </h2>
            <div className="about-title-line" />
          </motion.div>

          <div className="about-core-grid">
            <motion.div
              className="about-core-card"
              variants={scaleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="about-card-icon"
                animate={floatVariants.animate}
              >
                ❤️
              </motion.div>
              <h3 className="about-card-title">We Love What We Do</h3>
              <p className="about-card-text">
                We love what we do, and it shows in every shot. From life&apos;s
                quiet moments to its grand celebrations, we capture each story
                with passion and care. Every frame is a memory made timeless.
              </p>
            </motion.div>

            <motion.div
              className="about-core-card"
              variants={scaleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="about-card-icon"
                animate={floatVariants.animate}
              >
                🎯
              </motion.div>
              <h3 className="about-card-title">Our Working Process</h3>
              <p className="about-card-text">
                We believe great photography starts with understanding you. From
                the first conversation to the final delivery, our process is
                simple, transparent, and designed to make you feel comfortable
                every step of the way.
              </p>
            </motion.div>

            <motion.div
              className="about-core-card"
              variants={scaleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="about-card-icon"
                animate={floatVariants.animate}
              >
                ✨
              </motion.div>
              <h3 className="about-card-title">Our Skills</h3>
              <p className="about-card-text">
                Blending Art, Technique, and Vision. Our craft is built on a
                perfect balance of creativity and technical expertise. We master
                composition, lighting, and timing to ensure every img tells a
                story worth remembering.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* What We Do Section */}
      <motion.section
        className="about-services"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="about-services-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="about-services-header" variants={itemVariants}>
            <h2 className="about-section-title">What We Do</h2>
            <div className="about-title-line" />
          </motion.div>

          <div className="about-services-grid">
            {[
              {
                num: "1",
                title: "Studio Videos",
                desc: "Creative studio video photography for compelling storytelling.",
              },
              {
                num: "2",
                title: "Studio Sessions",
                desc: "Capture moments in studio sessions, crafting timeless imgry.",
              },
              {
                num: "3",
                title: "Retouching Photo",
                desc: "Enhance photos with expert retouching services.",
              },
              {
                num: "4",
                title: "Print Studio",
                desc: "Professional photography for timeless prints.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="about-service-item"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                <div className="about-service-number">{service.num}</div>
                <h3 className="about-service-title">{service.title}</h3>
                <p className="about-service-desc">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="about-stats"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="about-stats-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 className="about-stats-title" variants={itemVariants}>
            We Do It For You With Love
          </motion.h2>

          <div className="about-stats-grid">
            {[
              { label: "Founding Year", value: "2009" },
              { label: "Happy Customers", value: "2000+" },
              { label: "Companies Work With Us", value: "50+" },
              { label: "Offices", value: "2" },
              { label: "Studios", value: "2" },
              { label: "Projects Completed", value: "1500+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="about-stat-card"
                variants={scaleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="about-stat-value"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  {stat.value}
                </motion.div>
                <p className="about-stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="about-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="about-cta-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 className="about-cta-title" variants={itemVariants}>
            Ready to See Our Work?
          </motion.h2>
          <motion.button
            className="about-cta-button"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Our Portfolio
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
