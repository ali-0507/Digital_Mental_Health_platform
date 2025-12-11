import "./PrivacyPolicy.css";
import { Link } from "react-router-dom";
import { useState, useEffect, navigate } from "react";

function PrivacyPolicy() {
  
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("privacyAccepted") === "true";
    setAccepted(hasAccepted);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacyAccepted", "true");
    setAccepted(true);
    navigate("/")
  };

  return (
    <div className="privacy-container">
      <div className="privacy-card">

        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="updated-date">Last updated: December 11, 2025</p>

        <p>
          This Privacy Policy explains how <strong>Connect & Evolve</strong> collects,
          uses, and protects your personal information. This platform is an academic /
          personal project designed for educational and informational purposes only.
        </p>

        <h4>Information We Collect</h4>
        <ul>
          <li>Account details such as name and email (only when you create an account).</li>
          <li>Screening responses and dashboard statistics used for improving user experience.</li>
          <li>General analytics and usage patterns (non-identifiable).</li>
        </ul>

        <h4>How We Use Your Information</h4>
        <ul>
          <li>To deliver personalized content (AI chat, dashboard, screening insights).</li>
          <li>To improve platform performance and user experience.</li>
          <li>To maintain account functionality and user history.</li>
        </ul>

        <h4>Data Security</h4>
        <p>
          We take reasonable security measures such as encrypted storage and secure
          communication, but since this is an academic project, we cannot guarantee full
          commercial-grade protection.
        </p>

        <h4>Your Rights</h4>
        <ul>
          <li>You may request deletion of your account at any time.</li>
          <li>You may request deletion of all screening and chat-related data.</li>
        </ul>

        <h4>Third-Party Services</h4>
        <p>
          We do not sell or share your personal information with third parties. Some
          anonymized data may be used for academic demonstration purposes only.
        </p>

        <h4>Children's Privacy</h4>
        <p>
          This platform is not intended for individuals under the age of 18.
        </p>

        <h4>Changes to This Policy</h4>
        <p>
          We may update our Privacy Policy from time to time. Continued use of the platform
          after updates means you accept the revised policy.
        </p>

        <h4>Contact Us</h4>
        <p>
          If you have any questions regarding this Privacy Policy, you can contact us at:
        </p>
        <p className="email">connectevolve21@gmail.com</p>

        {/* BUTTONS */}
        <div className="policy-buttons">
          <Link to="/terms" className="btn-secondary">View Terms & Conditions</Link>
          {!accepted ? (
        <button className="btn-primary" onClick={handleAccept}>
          I Accept
        </button>
      ) : (
        <button className="accept-btn" disabled>
          Already Accepted
        </button>
      )}
        </div>

      </div>
    </div>
  );
}

export default PrivacyPolicy;
