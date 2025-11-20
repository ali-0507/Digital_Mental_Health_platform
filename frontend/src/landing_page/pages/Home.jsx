// import React from "react";
// import { Link } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   return (
//     <div className="home">
//       {/* Hero Section */}     

//         <div className="hero-text">
//           <h1 className="brand-name"><i>Connect&Evolve</i></h1>

//           <br></br>
//           <p id="para" >
//             <b><i>Connect&Evolve</i></b> gives you a chance to know your mental health
//             <br></br>by meeting up with professional counselors in case of urgency, 
//             <br></br>chatting with AI and many more…to know your mental health  
//             <br></br>score <b><i>click below!</i></b>
//           </p>

//           <Link to="/screening">
//             <button className="score-btn">Let’s know your score!</button>
//           </Link>
//         </div>
       
//        <div className="Img">
//           <img src="/assests/Hero-Section.png" alt="Mental Health Illustration" 
//           />
//         </div>


//                              {/*Features Section*/}
           
//     <div className="feature-section">
//       <div className="card mt-5 AI-card" style={{width:"2000px", height:"350px"}}>
//         <div className="row g-0">
//           <div className="col-md-6">
//             <img src="/assests/AIScreening.jpg" className="img-fluid rounded-start img" alt="AI Screening"/>
//           </div>
//           <div className="col-md-6 card-content">
//             <div className="card-body">
//               <h2 className="card-title"><i>AI Support</i></h2>
//               <p className="card-text">
//               <i><b>"When no one is around AI surrounds"</b></i><br></br>
//               Chat with AI, and relax today! Get some <br/> help from it and heal up.</p>
//               <a href="/chat"className="mt-4 "> Know More <span className="arrow">&#8594;</span></a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>


//       <div className="feature-section">
//         <div className="card mt-5 AI-card" style={{width:"2000px", height:"350px"}}>
//           <div className="row g-0">
//             <div className="col-md-6 card-content">
//               <div className="card-body">
//                 <h2 className="card-title"><i>Confidential Booking</i></h2>
//                 <p className="card-text">
//                 <i><b>"Let's heal together, we are with you"</b></i><br></br>
//                 Get some help from professional counselors <br/> by booking a confidential meet up.</p>
//                 <a href="/Booking"className="mt-4 "> Book Now! <span className="arrow">&#8594;</span></a>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <img src="/assests/Booking.jpeg" className="img-fluid img-reverse" alt="booking"/>
//             </div>
//           </div>
//         </div>
//       </div>


//       <div className="feature-section">
//       <div className="card mt-5 AI-card" style={{width:"2000px", height:"350px"}}>
//         <div className="row g-0">
//           <div className="col-md-6">
//             <img src="/assests/Resources.jpg" className="img-fluid rounded-start img" alt="Resources"/>
//           </div>
//           <div className="col-md-6 card-content">
//             <div className="card-body">
//               <h2 className="card-title"><i>Resources</i></h2>
//               <p className="card-text">
//               <i><b>"Wait!! there is something special for you.."</b></i><br></br>
//               Availability of offline resources like blogs, <br/> relaxation videos, meditation routine and many <br/> more.</p>
//               <a href="/resources"className="mt-4 ">Watch Now!<span className="arrow">&#8594;</span></a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>



//     <div className="feature-section">
//         <div className="card mt-5 AI-card" style={{width:"2000px", height:"350px"}}>
//           <div className="row g-0">
//             <div className="col-md-6 card-content">
//               <div className="card-body">
//                 <h2 className="card-title"><i>Peer Support Forum</i></h2>
//                 <p className="card-text">
//                 <i><b>"Come and discuss your journey with others anonymously"</b></i><br></br>
//                 Share your thoughts,feelings and what <br/> you felt today with others. Also get a new <br/> 
//                 vision to live life fully.</p>
//                 <a href="/peer-support"className="mt-4 "> Share Now! <span className="arrow">&#8594;</span></a>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <img src="/assests/PeerSupport.jpg" className="img-fluid img-reverse" alt="Peer support"/>
//             </div>
//           </div>
//         </div>
//       </div>
                                      
//                                       {/* Why us */}
//       <div className="whyUs">
//         <h2 className="heading">Why Us  <i className="fa-solid fa-question"></i> </h2>

//         <p className="whyus-text"> We give a platform with <b>anonymous identity</b> and direct
//           support of counsellor in case of emergency. A perfect meditation guide
//           for users with mild symptoms of depression or anxiety. No need to
//           stress out if you have mild symptoms — it is common now-a-days. No
//           worries, we are here to help.</p>

//           <div  className="list">
//             <ul>
//               <li><i className="fa-solid fa-feather-pointed"></i>&nbsp;&nbsp;
//               Take our AI screening test to know your anxiety and depression level</li>

//               <li><i className="fa-solid fa-feather-pointed"></i>&nbsp;&nbsp;
//               If you feel like reading something makes you feel good, then watch resources</li>

//               <li><i className="fa-solid fa-feather-pointed"></i>&nbsp;&nbsp;
//               Chat with others and share your thoughts about your healing journey</li>

//               <li><i className="fa-solid fa-feather-pointed"></i>&nbsp;&nbsp;
//               Want some human help? Book a meeting with a counsellor</li>
//             </ul>
//           </div>

//       </div>  
                                  
//                                 {/* About Us */}

//     <div id="carouselExample" className="carousel slide" 
//     style={{width:"60%", margin:"auto", marginTop:"2rem", marginBottom:"2rem"}}>
//       <div className="carousel-inner">
//         <div className="carousel-item active">
//           <img src="/assests/card1.jpeg" className="d-block w-100" alt="who we are"/>
//         </div>
        
//         <div className="carousel-item">
//           <img src="/assests/card2.jpeg" className="d-block w-100" alt="our mission"/>
//         </div>
        
//         <div className="carousel-item">
//           <img src="/assests/card3.jpeg" className="d-block w-100" alt="contact us"/>
//         </div>
//       </div>
     
//       <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
//         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Previous</span>
//       </button>
//       <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
//         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Next</span>
//       </button>
//     </div>

//    <div className="helpline">
//       <b><p>In case of any emergency, feel free to reach out to our helpline. We will definitely help you out.
//       <br></br><i>No worries, we are here!</i></p></b>
//       <span><button className="btn help-btn">Emergency call helpline</button></span>
//    </div>
    
//     </div>
//   );
// }

// export default Home;






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
        </div>
        <div className="hero-image">
          <img src="/assests/hero.jpg" alt="Wellness meditation" style={{borderRadius:"50%"}}/>
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