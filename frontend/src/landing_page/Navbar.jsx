// import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/assests/logo (1).svg" alt="Logo" width="40" height="50" className="d-flex align-text-center"/>
          </Link>

        <Link className="navbar-brand fs-5 logoName" to="/">
          Connect&Evolve
        </Link> 

        {/* for hamburger icon */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav nav-underline ms-auto fs-5">
            <li className="nav-item">
              <NavLink className="nav-link " to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/screening">
                Screening
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chat">
                AI Chat
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/booking">
                Booking
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/resources">
                Resources
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/peer-support">
                Peer Support
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;