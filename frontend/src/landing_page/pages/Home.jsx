import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="text-center py-5">
        <h1 className="fw-bold mb-3">
          <i><span className="highlight">
              <strong>Connect&Evolve</strong>
            </span></i>
        </h1>
        <h4><p className="text-lg md:text-xl max-w-3xl leading-relaxed"
          style={{ color: "#458E95" }}>
          <strong>Connect&Evolve</strong> gives you a chance to know your mental health by meeting up
          <br />
          with professional counselors in case of urgency, chatting with AI and many
          <br />
          more….to know your mental health score <strong>click below!</strong>
        </p>
        </h4>
        <br/>
        <Link to="/screening" className="btn btn-primary btn-lg"
        style={{backgroundColor: "rgb(128,128,128)"}}>
          Let’s know your score!
        </Link>
        <img src="/assests/Hero-Section.png" alt="Mental Health Illustration" className="mt-6 w-72 md:w-96 rounded-2xl shadow-lg"
        style={{margin: "40px auto", border: "14px", display: "block", boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)", height:"1000px", width: "auto"}}/>
      </section>



      {/* Features Section */}
     <section className="row text-center g-1 my-1 p-1"
     style={{ backgroundColor: "transparent" }}>
     <div className="col-md-12">
       <div className="d-flex align-items-center justify-content-between p-4"
         style={{backgroundColor: "rgb(161, 172, 187)",borderRadius: "25px",boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",flexWrap: "wrap",transition: "transform 0.3s ease",}}>        
        <img src="/assests/AISupport.jpg" alt="AI Screening"
        style={{width: "45%", height: "auto", borderRadius: "10px", objectFit: "cover",}}/>

      <div className="text-center text-md-start ms-md-4" style={{ flex: 1, color: "#333" }}>
        <h2 className="fw-semibold" style={{ color: "rgb(51, 51, 51)", fontStyle: "italic", textAlign: "center"}}>AI Support</h2>
        <p className="mb-4"
          style={{fontSize: "1rem",color: "rgb(51, 51, 51)",fontStyle: "italic", textAlign: "center"}}>
          <h4>Chat with AI, and relax today! Get some <br/> help from it and heal up.</h4>
          <br/>
          <Link to="/chat" style={{ textDecoration: "none"}}>
        <button style={{backgroundColor: "rgb(128, 159, 166)", color: "rgb(51, 51, 51)", border: "none", borderRadius: "10px", fontWeight: 600, boxShadow: "0 3px 0 rgba(51, 51, 51, 0.3)", transition: "all 0.3s ease"}}>
          Know More
        </button>
        </Link>
        </p>        
      </div>
    </div>
  </div>


     <div className="col-md-12">
       <div className="d-flex align-items-center justify-content-between p-4"
         style={{backgroundColor: "rgb(161, 172, 187)",borderRadius: "25px",boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",flexWrap: "wrap",transition: "transform 0.3s ease",}}>
      
      <div className="text-center text-md-start me-md-4" style={{ flex: 1, color: "#333", textAlign: "center"}}>
        <h2 className="fw-semibold" style={{ color: "rgb(51, 51, 51)", fontStyle: "italic", textAlign: "center"}}>Confidential Booking</h2>
        <p className="mb-4"
          style={{fontSize: "1rem",color: "rgb(51, 51, 51)",fontStyle: "italic", textAlign: "center"}}>
          <h4>Get some help from professional counselors <br/> by booking a confidential meet up.</h4>
          <br/>
          <Link to="/Booking" style={{ textDecoration: "none" }}>
        <button style={{backgroundColor: "rgb(128, 159, 166)", color: "rgb(51, 51, 51)", border: "none",borderRadius: "10px", fontWeight: 600, boxShadow: "0 3px 0 rgba(51, 51, 51, 0.3)", transition: "all 0.3s ease"}}>
          Book Now!
        </button>
        </Link>
        </p>
        
      </div>
      <img src="/assests/Booking.jpg" alt="Confidential Booking"
        style={{width: "45%", height: "auto", borderRadius: "20px", objectFit: "cover",}}/>
    </div>
  </div>


    <div className="col-md-12">
       <div className="d-flex align-items-center justify-content-between p-4"
         style={{backgroundColor: "rgb(161, 172, 187)",borderRadius: "25px",boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",flexWrap: "wrap",transition: "transform 0.3s ease",}}>
        <img src="/assests/Resources.jpg" alt="Resources" style={{width: "45%", height: "auto", borderRadius: "20px", objectFit: "cover",}}/>
      <div className="text-center text-md-start ms-md-4" style={{ flex: 1, color: "#333" }}>
        <h2 className="fw-semibold" style={{ color: "rgb(51, 51, 51)", fontStyle: "italic", textAlign: "center"}}>Resources</h2>
        <p className="mb-4"
          style={{fontSize: "1rem",color: "rgb(51, 51, 51)",fontStyle: "italic", textAlign: "center"}}>
          <h4>Availability of offline resources like blogs, <br/> relaxation videos, meditation routine and many <br/> more.</h4>
          <br/>
           <Link to="/Resources" style={{ textDecoration: "none" }}>
           <button style={{backgroundColor: "rgb(128, 159, 166)", color: "rgb(51, 51, 51)", border: "none",borderRadius: "10px", padding: "8px 20px", fontWeight: 600, boxShadow: "0 3px 0 rgba(51, 51, 51, 0.3)", transition: "all 0.3s ease",}}>
            Watch Now!
          </button>
          </Link>
        </p>     
      </div>
    </div>
  </div>


   <div className="col-md-12">
       <div className="d-flex align-items-center justify-content-between p-4"
         style={{backgroundColor: "rgb(161, 172, 187)",borderRadius: "25px",boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",flexWrap: "wrap",transition: "transform 0.3s ease",}}>
      
      <div className="text-center text-md-start ms-md-4" style={{ flex: 1, color: "#333" }}>
        <h2 className="fw-semibold" style={{ color: "rgb(51, 51, 51)", fontStyle: "italic", textAlign: "center"}}>Peer Support Forum</h2>
        <p className="mb-4"
          style={{fontSize: "1rem",color: "rgb(51, 51, 51)",fontStyle: "italic", textAlign: "center"}}>
          <h4>Share your thoughts,feelings and what <br/> you felt today with others. Also get a new <br/> vision to live life fully.</h4>
          <br/>
           <Link to="/peer-support" style={{ textDecoration: "none" }}>
           <button style={{backgroundColor: "rgb(128, 159, 166)", color: "rgb(51, 51, 51)", border: "none",borderRadius: "10px", padding: "8px 20px", fontWeight: 600, boxShadow: "0 3px 0 rgba(51, 51, 51, 0.3)", transition: "all 0.3s ease", textAlign: "center"}}>
            Share it!
          </button>
          </Link>
        </p>
       
      </div>
      <img src="/assests/PeerSupport.jpg" alt="Peer Support"
        style={{width: "45%", height: "auto", borderRadius: "20px", objectFit: "cover",}}/>
    </div>
  </div>
  </section>




    {/* Why Us Section */}
  <section
      style={{width: "100%",padding: "48px 16px",background: "rgb(161, 172, 187)",display: "flex",justifyContent: "center",boxSizing: "border-box"}}>
      <div
        style={{width: "100%",maxWidth: "980px",background: "rgb(128, 159, 166)",borderRadius: "12px",boxShadow: "0 8px 20px rgba(0,0,0,0.12)",padding: "28px 34px",border: "1px solid rgba(0,0,0,0.06)",boxSizing: "border-box",}}>
        {/* Heading */}
        <h2 style={{display: "flex",alignItems: "center", gap: "10px",margin: "0 0 14px 0",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',}}>
          <button>
          <span style={{fontSize: "28px",fontWeight: "700",color: "rgb(128, 159, 166)", textAlign: "center"}}>
            Why Us
          </span>
          <span style={{color: "rgb(128,159,166)",fontSize: "28px",lineHeight: "1",marginLeft: "4px"}}>
            <i class="fa-solid fa-question"></i>
          </span></button>
        </h2>

         {/* Description */}
        <h4><p style={{color: "#222",fontSize: "15px",lineHeight: "1.5",margin: "0 0 14px 0",fontWeight: "500",}}>
          We give a platform with <strong>anonymous identity</strong> and direct
          support of counsellor in case of emergency. A perfect meditation guide
          for users with mild symptoms of depression or anxiety. No need to
          stress out if you have mild symptoms — it is common now-a-days. No
          worries, we are here to help.
        </p></h4>

        {/* List */}
        <ul
          style={{listStyle: "none",padding: "0",margin: "0",color: "#222",fontSize: "15px",lineHeight: "1.6",}}>
          {[
            "Take our AI screening test to know your anxiety and depression level",
            "If you feel like reading something makes you feel good, then watch resources",
            "Chat with others and share your thoughts about how you healed",
            "Want some human help? Book a meeting with a counsellor",
          ].map((text, index) => (
            <li
              key={index}
              style={{display: "flex",alignItems: "flex-start",gap: "10px",margin: "8px 0",}}>
              <span
                style={{color: "#198754",fontSize: "18px",lineHeight: "1",marginTop: "2px",}}>
                🍀
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>        
    </div>
  );
}

export default Home;