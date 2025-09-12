import React from "react";
import {Link} from "react-router-dom";
function Footer() {
  return (
    <footer className=" text-dark mt-5"  style={{backgroundColor:'#F8F9FA'}}>
      <div className="container py-4">
        <div className="row">
          {/* Column 1: Logo + Description */}
          <div className=" col-12 col-md-4 mb-3">
            <img
              src="./src/assets/quotebook.svg"
              alt="Logo"
              className="mb-2"
              style={{'height':'40px'}}
            />
            <p>
              This is a simple <strong>QuoteBook</strong> where you can
              explore daily motivational quotes and share them easily. Built
              with React + Bootstrap.
            </p>
          </div>

          {/* Column 2: Nav Links + Social */}
          <div className=" col-12 col-md-4 mb-3">
            <h5 className="fw-bold">Useful Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/quotes" className="text-dark text-decoration-none">
                  Quotes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-dark text-decoration-none">
                  About
                </Link>
              </li>
             
            </ul>
            <div className="mt-3">
              <a href="#" className="text-dark me-3 fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-dark me-3 fs-5">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-dark me-3 fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-dark fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Column 3: Google Map */}
          <div className="col-12 col-md-4 mb-3">
            <h5 className="fw-bold">Find Us</h5>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.973742146165!2d72.87765541524613!3d19.07609088708495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c630b6a75b0d%3A0xb37c90d1df8f65!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1678378999999!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="last-info text-center  text-white py-2" style={{backgroundColor:'#48ab4b'}}>
        <small>
          © {new Date().getFullYear()} QuoteBook. All rights reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;