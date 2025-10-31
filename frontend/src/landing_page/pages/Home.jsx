import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}     

        <div className="hero-text">
          <h1 className="brand-name"><i>Connect&Evolve</i></h1>

          <br></br>
          <p id="para" >
            <b><i>Connect&Evolve</i></b> gives you a chance to know your mental health
            <br></br>by meeting up with professional counselors in case of urgency, 
            <br></br>chatting with AI and many more…to know your mental health  
            <br></br>score <b><i>click below!</i></b>
          </p>

          <Link to="/screening">
            <button className="score-btn">Let’s know your score!</button>
          </Link>
        </div>
       
       <div className="Img">
          <img src="/assests/Hero-Section.png" alt="Mental Health Illustration" 
          />
        </div>


                             {/*Features Section*/}
           
    <div className="feature-section">
      <div className="card mt-5 AI-card" style={{width:"2000px", height:"350px"}}>
        <div className="row g-0">
          <div className="col-md-6">
            <img src="/assests/AIScreening.jpg" className="img-fluid rounded-start img" alt="AI Screening"/>
          </div>
          <div className="col-md-6 card-content">
            <div className="card-body">
              <h2 className="card-title"><i>AI Support</i></h2>
              <p className="card-text">
              <i><b>"When no one is around AI surrounds"</b></i><br></br>
              Chat with AI, and relax today! Get some <br/> help from it and heal up.</p>
              <a href="/chat"className="mt-4 "> Know More <span className="arrow">&#8594;</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>


      <div className="feature-section">
        <div className="card mt-5 AI-card" style={{width:"2000px", height:"350px"}}>
          <div className="row g-0">
            <div className="col-md-6 card-content">
              <div className="card-body">
                <h2 className="card-title"><i>Confidential Booking</i></h2>
                <p className="card-text">
                <i><b>"Let's heal together, we are with you"</b></i><br></br>
                Get some help from professional counselors <br/> by booking a confidential meet up.</p>
                <a href="/Booking"className="mt-4 "> Book Now! <span className="arrow">&#8594;</span></a>
              </div>
            </div>
            <div className="col-md-6">
              <img src="/assests/Booking.jpeg" className="img-fluid img-reverse" alt="booking"/>
            </div>
          </div>
        </div>
      </div>


      <div className="feature-section">
      <div className="card mt-5 AI-card" style={{width:"2000px", height:"350px"}}>
        <div className="row g-0">
          <div className="col-md-6">
            <img src="/assests/Resources.jpg" className="img-fluid rounded-start img" alt="Resources"/>
          </div>
          <div className="col-md-6 card-content">
            <div className="card-body">
              <h2 className="card-title"><i>Resources</i></h2>
              <p className="card-text">
              <i><b>"Wait!! there is something special for you.."</b></i><br></br>
              Availability of offline resources like blogs, <br/> relaxation videos, meditation routine and many <br/> more.</p>
              <a href="/resources"className="mt-4 ">Watch Now!<span className="arrow">&#8594;</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div className="feature-section">
        <div className="card mt-5 AI-card" style={{width:"2000px", height:"350px"}}>
          <div className="row g-0">
            <div className="col-md-6 card-content">
              <div className="card-body">
                <h2 className="card-title"><i>Peer Support Forum</i></h2>
                <p className="card-text">
                <i><b>"Come and discuss your journey with others anonymously"</b></i><br></br>
                Share your thoughts,feelings and what <br/> you felt today with others. Also get a new <br/> 
                vision to live life fully.</p>
                <a href="/peer-support"className="mt-4 "> Share Now! <span className="arrow">&#8594;</span></a>
              </div>
            </div>
            <div className="col-md-6">
              <img src="/assests/PeerSupport.jpg" className="img-fluid img-reverse" alt="Peer support"/>
            </div>
          </div>
        </div>
      </div>
                                      
                                      {/* Why us */}
      <div className="whyUs">
        <h2 className="heading">Why Us  <i class="fa-solid fa-question"></i> </h2>

        <p className="whyus-text"> We give a platform with <b>anonymous identity</b> and direct
          support of counsellor in case of emergency. A perfect meditation guide
          for users with mild symptoms of depression or anxiety. No need to
          stress out if you have mild symptoms — it is common now-a-days. No
          worries, we are here to help.</p>

          <div  className="list">
            <ul>
              <li><i class="fa-solid fa-feather-pointed"></i>&nbsp;&nbsp;
              Take our AI screening test to know your anxiety and depression level</li>

              <li><i class="fa-solid fa-feather-pointed"></i>&nbsp;&nbsp;
              If you feel like reading something makes you feel good, then watch resources</li>

              <li><i class="fa-solid fa-feather-pointed"></i>&nbsp;&nbsp;
              Chat with others and share your thoughts about your healing journey</li>

              <li><i class="fa-solid fa-feather-pointed"></i>&nbsp;&nbsp;
              Want some human help? Book a meeting with a counsellor</li>
            </ul>
          </div>

      </div>  
                                  
                                {/* About Us */}

    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/assests/Whoweare.png" class="d-block w-100" alt="..."/>
        </div>
        
        <div class="carousel-item">
          <img src="/assests/Ourmission.png" class="d-block w-100" alt="..."/>
        </div>
        
        <div class="carousel-item">
          <img src="/assests/Contact.png" class="d-block w-100" alt="..."/>
        </div>
      </div>
    </div>

    <hr></hr>
    
    </div>
  );
}

export default Home;