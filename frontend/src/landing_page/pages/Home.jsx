import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FaUserShield } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import { AiOutlineRobot } from "react-icons/ai";
import { MdSelfImprovement } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";


function Home() {
  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content col-4-md">
          <h1>Your Space to Heal, Reflect, and Evolve.</h1>
          <p>
            Connect anonymously, access tailor-made resources, and receive
            support from our AI wellness companion.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link to="/chat" className="btn-secondary">
              Chat with AI
            </Link>
          </div>
        </div>
        <div className="img-area">
          <img src="../assests/hero.jpg" className="images"/>
        </div>

         <div className="img-area2">
          <img src="../assests/hero.jpg" className="images"/>
        </div>
      </section>

    {/* GOAL SECTION */}
    <section className="goal-section">
      <h2>Our Goal</h2>
      <p>We aim to make mental well-being accessible for everyone.</p>

    <div className="goal-cards">
      <div className="goal-card">
        <FaUserShield size={40} color="#6C63FF" />
      <h3>Anonymous Support</h3>
      <p>Connect freely without fear or judgement.</p>
    </div>

    <div className="goal-card">
      <GiMeditation size={40} color="#6C63FF" />
      <h3>Guided Meditation</h3>
      <p>Find calm through audio and video relaxation guides.</p>
    </div>

    <div className="goal-card">
        <AiOutlineRobot size={40} color="#6C63FF" />
      <h3>AI Assistance</h3>
      <p>Get instant emotional insights & suggestions based on your mood.</p>
    </div>
  </div>
</section>


      {/* BENEFIT SECTION */}
      <section className="benefit">
        <h2><strong>How We Help!</strong></h2>
        <div className="benefit-cards">
          <div className="benefit-card">
          <MdSelfImprovement size={38} color="#6C63FF" />
            <h3>Feeling lost or anxious?</h3>
            <p>Personalized screening and relaxation tools.</p>
          </div>

          <div className="benefit-card">
            <MdSupportAgent size={38} color="#6C63FF" />
            <h3>Want quick help?</h3>
            <p>One-tap connection to counsellors.</p>
          </div>

          <div className="benefit-card">
            <FaChartLine size={38} color="#6C63FF" />
            <h3>Want track progress</h3>
            <p>One-tap connection to counsellors.</p>
          </div>

          <div className="benefit-card">
            <FaHandsHelping size={38} color="#6C63FF" />
            <h3>PeerSupport</h3>
            <p>One-tap connection to counsellors.</p>
          </div>

          <div className="benefit-card">
            <FaBookReader size={38} color="#6C63FF" />
            <h3>Resources</h3>
            <p>One-tap connection to counsellors.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;