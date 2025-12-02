import React from "react";
import "./AboutUs.css";

import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-wrapper">

      {/* ------- HERO SECTION ------- */}
      <section className="about-hero">
        <div className="about-hero-text">
          <h1>About Connect&Evolve</h1>
          <p>
            Connect&Evolve is built with a mission to make mental well-being accessible,
            compassionate, and stigma-free for everyone. We empower individuals with
            AI-assisted tools, professional support, and a safe space to reflect and grow.
          </p>
        </div>
      </section>

      {/* ------- PROBLEM SECTION ------- */}
      <section className="about-section">
        <div className="circle-bg circle1"></div>

        <h2 className="section-title problem-title">The Problem</h2>
        <p className="section-desc">
          Mental health challenges are rising globally. Millions of people struggle with
          anxiety, stress, loneliness, and emotional burnout — yet many do not receive the
          right support due to stigma, lack of awareness, accessibility issues, or hesitation
          to reach out.
        </p>
        <p className="section-desc">
          People often navigate emotional struggles alone, without proper guidance or
          personalized care. We aim to change that.
        </p>
      </section>

      {/* ------- SOLUTION SECTION ------- */}
      <section className="about-section light">
        <div className="circle-bg circle2"></div>

        <h2 className="section-title solution-title">Our Solution</h2>
        <p className="section-desc">
          Connect&Evolve integrates modern technology with empathetic support. Our
          AI-driven tools, screening system, and resource guides help users track their
          mental well-being, understand patterns, and access safe suggestions — anytime,
          anywhere.
        </p>
        <p className="section-desc">
          With a growing ecosystem of features, we aim to provide accessible,
          judgment-free, and personalized care for all ages.
        </p>
      </section>

      {/* ------- QUOTE STRIP ------- */}
      <section className="quote-strip">
        <h3>
          “No matter where you are in your mental health journey,  
          Connect&Evolve walks with you.”
        </h3>
      </section>

      {/* ------- VALUES SECTION ------- */}
      <section className="about-section values">
        <h2 className="section-title">Our Core Values</h2>

        <div className="values-grid">
          <div className="value-card">
            <h3>Compassion</h3>
            <p>Everyone deserves kindness, understanding, and emotional support.</p>
          </div>

          <div className="value-card">
            <h3>Privacy First</h3>
            <p>Your emotional wellness journey stays yours. Safe and secure.</p>
          </div>

          <div className="value-card">
            <h3>Accessibility</h3>
            <p>Tools and guidance available anytime, for anyone, without barriers.</p>
          </div>

          <div className="value-card">
            <h3>Growth</h3>
            <p>We believe healing is a journey — small steps create big change.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
