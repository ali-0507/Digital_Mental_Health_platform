import { Link } from "react-router-dom";
import "./Footer.css";


function Footer() {
  return (
    <footer className="footer-bg">
      <div className="container">
        <div className="row">
          
          {/* Trust Branding */}
          <div className="col-3 d-flex justify-content-end align-items-end ">
            <ul className="list-unstyled d-flex flex-row flex-md-column gap-3 mt-5 footer-links">
              <p className="fs-5 pt-4 m-0">Trust</p>

              <div className="text-center mt-0">
                {/* <img src="/assests/logo_dmh.png" alt="Logo" className="footer-logo img-fluid my-2"/> */}
                <i class="fa-solid fa-laptop-medical lappy"></i>
              </div>

              <li className="fs-6 text-center">
                <i><p className="trust-text ">Supporting Student's Mental Wellbeing</p></i>
              </li>  
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-3 d-flex justify-content-center align-items-center">
            <ul className="list-unstyled d-flex flex-md-column gap-3 mt-4 footer-links align-items-start">
              <p className="fs-5 mb-1 footer-head">Quick Links</p>
              <li className="fs-6 "> <a href="/"> About Us </a></li>
              <li className="fs-6 me-2"> <a href="/booking">Booking </a></li>
              <li className="fs-6"> <a href="/chat"> AI Support </a></li>
              <li className="fs-6">  <a href="/resources"> Resources </a></li>
            </ul>
          </div>

          {/* Support and Safety */}
          <div className="col-3 d-flex justify-content-center align-items-center">
            <ul className="list-unstyled d-flex flex-md-column gap-3 mt-4 footer-links align-items-start">
              <p className="fs-5 mb-1 footer-head">Support & Safety</p>
              <li className="fs-6 text-center"><a href="/"><i class="fa-solid fa-phone fs-6 me-2"></i>Emergency contact </a></li>
              <li className="fs-6 text-center"><a href="/"><i class="fa-regular fa-circle-question fs-5 me-1"></i> FAQs </a></li> 
              <li className="fs-6 text-center"><a href="/"> Terms & Conditions</a> </li> 
              <li className="fs-6 text-center"> <a href="/"><i class="fa-solid fa-shield-halved fs-5 me-2"></i>Privacy Policy</a> </li>
            </ul>
          </div>
          
          {/* Contacts */}
          <div className="col-3 d-flex justify-content-center align-items-center mb-2">
            <ul className="list-unstyled d-flex flex-row flex-md-column gap-3 footer-links">
              <p className="fs-5 mb-1 footer-head pt-5">Contacts</p>

              {/* Instagram */}
              <li className="fs-6 text-center">
                <a href="/instagram"><i class="fa-brands fa-instagram fs-3"></i></a>
              </li>

              {/* LinkedIn */}
              <li className="fs-6 text-center">
                <a href="/linkedin"><i class="fa-brands fa-linkedin-in fs-3"></i></a>
              </li> 

              {/* Email */}
              <li className="fs-6 text-center">
                <a href="/email"><i class="fa-regular fa-envelope fs-3"></i></a>
              </li> 

              {/* Facebook */}
              <li className="fs-6 text-center">
                <a href="/facebook"><i class="fa-brands fa-square-facebook fs-3"></i></a>
              </li>

            </ul>
          </div>

        </div>
        <div className="row d-flex justify-content-evenly align-items-center">
         <hr/>
          <p className="mb-0 text-center mt-2">
            &copy; {new Date().getFullYear()} Connect&Evolve. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;