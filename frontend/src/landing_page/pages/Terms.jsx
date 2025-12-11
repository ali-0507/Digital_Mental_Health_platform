import "./Terms.css";

export default function Terms() {
  return (
    <div className="terms-wrapper">
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        <p className="updated">Last updated: December 11, 2025</p>
        <p  className="updated">Please read these terms and conditions carefully before using our Service.</p>

        {/* -------------------- INTERPRETATION -------------------- */}

        <h3>Interpretation</h3>
        <p>
          Words with capitalized initial letters have meanings defined under the
          following conditions. These definitions shall have the same meaning,
          whether they appear in singular or plural.
        </p>

        <h3>Definitions</h3>
        <ul>
          <li>
            <strong>Affiliate</strong> means an entity that controls, is
            controlled by, or is under common control with a party. “Control”
            means ownership of 50% or more of the shares or equity interest.
          </li>
          <li>
            <strong>Country</strong> refers to: Chhattisgarh, India.
          </li>
          <li>
            <strong>Company</strong> refers to Connect and Evolve (“We”, “Us”, “Our”).
          </li>
          <li>
            <strong>Device</strong> means any device like a computer, phone, or tablet.
          </li>
          <li>
            <strong>Service</strong> refers to the Website.
          </li>
          <li>
            <strong>Terms and Conditions</strong> (“Terms”) means this entire agreement.
          </li>
          <li>
            <strong>Third-party Social Media Service</strong> means any content or
            services provided by external sources integrated with the platform.
          </li>
          <li>
            <strong>Website</strong> refers to Connect and Evolve.
          </li>
          <li>
            <strong>You</strong> means the individual using the service.
          </li>
        </ul>

        {/* -------------------- ACKNOWLEDGMENT -------------------- */}
        <h4>Acknowledgment</h4>
        <p>
          These Terms govern your use of our Service. By accessing or using the
          Service, you agree to be bound by them. If you disagree with any part,
          you may not use the platform.
        </p>
        <p>
          You represent that you are above 18 years of age. We do not permit individuals below 18 to use the Service.
        </p>
        <p>
          Your access is also conditioned on accepting our Privacy Policy, which
          explains how your data is collected and used.
        </p>

        {/* -------------------- LINKS -------------------- */}
        <h4>Links to Other Websites</h4>
        <p>
          Our Service may contain links to third-party websites. We have no
          control over these and are not responsible for their content or
          policies.
        </p>

        {/* -------------------- TERMINATION -------------------- */}
        <h4>Termination</h4>
        <p>
          We may suspend or terminate access immediately, without notice, for any reason,
          including violation of these Terms.
        </p>

        {/* -------------------- LIABILITY -------------------- */}
        <h4>Limitation of Liability</h4>
        <p>
          The Company’s liability is limited to the amount you have paid through
          the Service (or 100 USD if no purchase was made).
        </p>

        {/* -------------------- DISCLAIMER -------------------- */}
        <h4>“AS IS” and “AS AVAILABLE” Disclaimer</h4>
        <p>
          The Service is provided without warranties of any kind. We do not guarantee:
        </p>
        <ul>
          <li>uninterrupted uptime</li>
          <li>accuracy of content</li>
          <li>absence of malware or harmful components</li>
        </ul>

        {/* -------------------- GOVERNING LAW -------------------- */}
        <h4>Governing Law</h4>
        <p>
          These Terms are governed by the laws of India. You may also be subject
          to local laws depending on your region.
        </p>

        {/* -------------------- DISPUTES -------------------- */}
        <h4>Disputes Resolution</h4>
        <p>
          If you have a concern or dispute, please contact us first to attempt
          informal resolution.
        </p>

        {/* -------------------- CHANGES -------------------- */}
        <h4>Changes to these terms</h4>
        <p>
          We may update these Terms at any time. Continued use of the Service
          implies acceptance of the updated Terms.
        </p>

        {/* -------------------- CONTACT -------------------- */}
        <h4>Contact Us</h4>
        <p>
          For questions, contact us at:
          <br />
          <strong>connectevolve21@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}
