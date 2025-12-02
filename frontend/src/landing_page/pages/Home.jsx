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
        <div className="hero-content">
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
          <span className="text">In a hurry? Call on this! (Tele MANAS)</span>
            <i className="fa-solid fa-phone phone"></i>
            <span className="phone">14416 or 1800-89-14416</span>
          
        </div>
        <div className="images-wrapper">
        <div className="img-area">
          <img src="../assests/hero.jpg" className="images"/>
        </div>
          <div className="img-area2">
          <img src="../assests/ai.webp" className="images"/>
        </div>
        </div>
      </section>

       
      

    {/* GOAL SECTION */}
    <section className="goal-section">
      <h1 style={{marginBottom:"25px",}}><b>Our Goal</b></h1>
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
        <AiOutlineRobot size={50} color="#6C63FF"/>
      <h3>AI Assistance</h3>
      <p>Get instant emotional insights & suggestions based on your mood.</p>
    </div>
  </div>
</section>


      {/* How we help SECTION */}
      <section className="benefit">
        <h1 style={{marginBottom:"40px"}}><strong>How We Help!</strong></h1>
        <div className="benefit-cards">
          <div className="benefit-card">
          <MdSelfImprovement size={38} color="#6C63FF" />
            <h4>Feeling lost or anxious?</h4>
            <p>Personalized screening.</p>
          </div>

          <div className="benefit-card">
            <MdSupportAgent size={38} color="#6C63FF" />
            <h4>Want quick help?</h4>
            <p>Book a meeting.</p>
          </div>

          <div className="benefit-card">
            <FaChartLine size={38} color="#6C63FF" />
            <h4>Want track progress</h4>
            <p>Get a Personalized dashboard.</p>
          </div>

          <div className="benefit-card">
            <FaHandsHelping size={38} color="#6C63FF" />
            <h4>PeerSupport</h4>
            <p>Chat anonymously.</p>
          </div>

          <div className="benefit-card">
            <FaBookReader size={38} color="#6C63FF" />
            <h4>Resources</h4>
            <p>Watch out videos and audios.</p>
          </div>
        </div>
      </section>


    <section className="explore">
      
      <h1 style={{textAlign:"center"}} ><b>Explore our resources</b></h1>
      <p style={{textAlign:"center"}}>Below are the resources we provide you can browse them.</p>

      <div class="timeline">
      <div class="timeline-item">
      <div class="timeline-content left fadeUp">
         <img src="../assests/guide.avif"/>
        <h3>Helpful Mindfull Guides</h3>
        <p>Brief guides are available that may help you to keep your mental health good.<br/>
        Also you can download them for free.</p>
      </div>
    </div>


 <div class="timeline-item">
        <div class="timeline-content right fadeUp">
        {/* <img src="../assests/video.avif"/> */}
        <h3>What you will get:</h3>
        <p>Guides are available offering accessible, practical strategies to<br/>
        help you maintain positive mental health.</p>
      </div>
    </div>

 <div class="timeline-item">
      <div class="timeline-content left fadeUp">
        <img src="../assests/audio.avif"/>
        <h3>Listen to calm audio</h3>
        <p>A theraupatic session by listening to peaceful sounds.</p>
      </div>
    </div>


  <div class="timeline-item">
      <div class="timeline-content right fadeUp">
        {/* <img src="../assests/video.avif"/> */}
        <h3>What you will get:</h3>
        <p>A therapeutic session involving listening to peaceful sounds is a
        sound healing journey designed to promote deep relaxation and many more.</p>
      </div>
    </div>

  <div class="timeline-item">
      <div class="timeline-content left fadeUp">
        <img src="../assests/video.avif"/>
        <h3>Videos for guiding you on self improvement</h3>
        <p>Browse the best videos for free and let your mind set free from all cluster.</p>
      </div>
    </div>

     <div class="timeline-item">
        <div class="timeline-content right fadeUp">
        {/* <img src="../assests/video.avif"/> */}
        <h3>What you will get:</h3>
        <p>Ready to become the best version of yourself?<br/> Dive into our curated collection of
        self improvement videos designed.</p>
      </div>
    </div>


 <div class="timeline-item">
      <div class="timeline-content left fadeUp">
        <img src="../assests/peer.jpg"/>
        <h3>Support near you!</h3>
        <p>Chat with the people near by you anonymously without any judgements.</p>
      </div>
    </div>

     <div class="timeline-item">
        <div class="timeline-content right fadeUp">
        {/* <img src="../assests/video.avif"/> */}
        <h3>What you will get:</h3>
        <p>Connect locally, Chat anonymously.<br/> A safe space for real talk with people around you
        completely judgement free.</p>
      </div>
    </div>
   </div>
</section>
</div>
  );
}

export default Home;