// import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="text-center py-5">
        <h1 className="fw-bold mb-3"><i>Welcome to <span className="highlight">Connect&Evolve</span></i></h1>
        <p className="lead mb-4">
          Your Digital Mental Health & Psychological Support System
        </p>
        <Link to="/screening" className="btn btn-primary btn-lg">
          Get yourself scanned here!
        </Link>
      </section>

      {/* Features Section */}
      <section className="row  text-center g-4 my-5 p-5">
        <div className="col-md-4">
          <div className="card h-100 p-3 text-center home-card">
            <Link to="/chat" >
            <span className="material-icons fs-1 text-primary">chat_bubble</span>
            <h5 className="mt-3">AI Support</h5>
            <p>Interactive chatbot for instant support.</p>
            </Link>
          </div>
        </div>
        

        <div className="col-md-4">
          <div className="card h-100 p-3 text-center home-card">
          <Link to="/booking">
            <span className="material-icons fs-1 text-success">event</span>
            <h5 className="mt-3">Confidential Booking</h5>
            <p>Book private sessions with campus counselors securely.</p>
           </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 p-3 text-center home-card">
           <Link to="/resources" style={{textDecoration: "none"}}>
            <span className="material-icons fs-1 text-info">article</span>
            <h5 className="mt-3">Resource Hub</h5>
            <p>Access relaxation audios, guides, and educational content.</p>
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 p-3 text-center home-card">
           <Link to="/peer-support" style={{textDecoration: "none"}}>
            <span className="material-icons fs-1 text-success">groups</span>
            <h5 className="mt-3">Peer Support</h5>
            <p>Moderated forum with trained volunteers.</p>
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 p-3 text-center home-card">
           <Link to="/admin" style={{textDecoration: "none"}}>
            <span className="material-icons fs-1 text-warning">analytics</span>
            <h5 className="mt-3">Admin Dashboard</h5>
            <p>Real-time insights for administrators (anonymized).</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center my-5">
        <h3 className="fw-bold mb-3">Need Immediate Help?</h3>
        <p>
          Reach out to your college counselor.
        </p>
        <a href="tel:1800-599-0019" className="btn btn-danger btn-lg">
         <i class="fa-solid fa-phone"></i> Call Helpline
        </a>
      </section>
    </div>
  );
}

export default Home;
