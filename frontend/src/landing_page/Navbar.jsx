// import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";
import "../landing_page/pages/Home.jsx";
 

function Navbar() {
  const { user, logout, isAuthenticated, loading } = useAuth(); // get auth state
   const location = useLocation();

  if (loading) {
    return null; // or a loading spinner
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
        {/* <Link className="navbar-brand" to="/">
    <nav className="navbar navbar-expand-lg custom-nav sticky-top">
      
        <div className="container-fluid">
          {/* <Link className="navbar-brand" to="/">
            <img src="/assests/logo.png" alt="Logo" className="d-flex align-text-center"/>
          </Link> */}
          
        <Link className="navbar-brand fs-5 logoName" to="/">
        
          <i>Connect&Evolve</i>
        </Link>

        {/* for hamburger icon */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav nav-pills nav-fill ms-auto fs-5">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                {" "}
                Home{" "}
              </NavLink>
            </li>

            
             {/* Conditional Rendering based on login status */}
            {!isAuthenticated ? (
              <>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/screening">
                    AI Screening
                  </NavLink>
                </li>

                <li className="nav-item dropdown explore-dropdown">
                  <button className="btn nav-link explore-toggle">
                      Explore More
                  </button>

                <div className="explore-menu">
                    <div className="explore-item">
                    <h5>Book a Counsellor</h5>
                    <a href="/booking" className="link">Book a meeting with a counsellor &rarr;</a>
                  </div>

                  <div className="explore-item">
                    <h5>Peer Support</h5>
                    <a href="/peer-support" className="link">Chat with others anonymously &rarr;</a>
                  </div>

                  <div className="explore-item">
                    <h5>Resources</h5>
                    <a href="/resources" className="link">some guided resources for you &rarr;</a>
                  </div>

                </div>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
          </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">My Dashboard</NavLink>
                </li>
               {/* <li className="nav-item">
               <NavLink className="nav-link" to="/my-chats">
                    My Chats
                 </NavLink>
             </li> */}
                {/* Show username and logout */}
               {/* Show username and logout */}
                
                <li className="nav-item">
                  <NavLink className="nav-link" to="/screening">
                    AI Screening
                  </NavLink>
                </li>
                   
                <li className="nav-item dropdown explore-dropdown">
                  <button className="btn nav-link explore-toggle">
                    Explore More
                  </button>

                <div className="explore-menu">
                    <div className="explore-item">
                    <h5>Book a Counsellor</h5>
                    <a href="/booking" className="link">Book a meeting with a counsellor &rarr;</a>
                </div>

                <div className="explore-item">
                    <h5>Peer Support</h5>
                    <a href="/peer-support" className="link">Chat with others anonymously &rarr;</a>
                </div>

                <div className="explore-item">
                    <h5>Resources</h5>
                    <a href="/resources" className="link">some guided resources for you &rarr;</a>
                </div>

              </div>
            </li>

                <li className="nav-item d-flex align-items-center px-3">
                  <span className="text-light ">
                    Welcome, {user?.name?.split(" ")[0]} 👋
                  </span>
                </li>

                <li className="nav-item">
                  <button className="btn mt-1 mb-1 logout-btn" onClick={logout} >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
