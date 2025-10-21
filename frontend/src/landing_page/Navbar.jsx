// import React from "react";
import { Link, NavLink } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import "./Navbar.css";
import "../landing_page/pages/Home.jsx";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth(); // get auth state
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      
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
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

          {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav nav-pills nav-fill ms-auto fs-5">
    
            <li className="nav-item">
              <NavLink className="nav-link" to="/"> Home </NavLink>
            </li>

          {/* Dropdown item */}
            <li className="nav-item dropdown">
            <button className="btn btn-lg dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              About Us
            </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#"><i>Who we are</i></a></li>
                <li><a className="dropdown-item" href="#"><i>Our mission</i></a></li>
                <li><a className="dropdown-item" href="/email"><i>Contacts</i></a></li>
              </ul>
            </li>



             {/* Conditional Rendering based on login status */}
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    SignUp
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
               {/* Show username and logout */}
                <li className="nav-item d-flex align-items-center px-3">
                  <span className="text-light ">
                    Hi, {user?.name?.split(" ")[0]} 👋
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={logout}
                  >
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