import React, { useState } from "react";
import "./FAQ.css";
import faqCharacter from "../../../public/assests/faq.webp";

function FAQ() {
  const faqData = [
    {
      category: "General Information & Scope",
      questions: [
        {
          q: "What is this platform intended for?",
          a: "This platform is an academic/personal project designed for educational and informational purposes related to mental wellness and personal growth. It is not a licensed medical service or a substitute for professional mental health care."
        },
        {
          q: "Who made this project?",
          a: "This project was developed by [Ali Raza, Akshada Shesh, Vidya Agrawal] as part of an academic or portfolio project. We are technology enthusiasts, not licensed mental health professionals."
        },
        {
          q: "What mental health conditions does this platform help with?",
          a: "The platform provides general tools for managing everyday stress, fostering positive thinking, and building emotional resilience. It is NOT meant to diagnose or treat clinical mental health disorders."
        }
      ]
    },

    {
      category: "Safety & Emergency Information",
      questions: [
        {
          q: "What should I do in a crisis or emergency?",
          a: "This platform is NOT for emergencies. If you are in distress, experiencing suicidal thoughts, or in immediate danger, please contact your local emergency services or a crisis helpline immediately."
        },
        {
          q: "Can I use this instead of seeing a therapist or doctor?",
          a: "No. This tool is supplemental and does not replace professional care. Please consult a licensed mental health professional for any mental-health-related concerns."
        }
      ]
    },

    {
      category: "Data & Privacy",
      questions: [
        {
          q: "Is my data private and secure?",
          a: "We take privacy seriously and use standard security measures like encryption. However, as this is an academic project, it may not meet HIPAA or commercial-grade compliance standards."
        },
        {
          q: "Will my data be used for academic research or shared with third parties?",
          a: "We do not sell or share your personal data. Any data used for academic demonstration is anonymized and aggregated."
        },
        {
          q: "Can I delete my account and data?",
          a: "Yes. You can delete your account anytime, and all associated data will be permanently removed."
        }
      ]
    },

    {
      category: "Technical & Usage",
      questions: [
        {
          q: "What are the technical requirements to use this platform?",
          a: "The platform works best on modern browsers with a stable internet connection. (Chrome, Edge, Firefox recommended)."
        },
        {
          q: "The app isn't working / I found a bug.",
          a: "As this is a personal project, support is limited. You may report bugs via the contact page, but immediate fixes cannot be guaranteed."
        },
        {
          q: "How much does it cost to use?",
          a: "This project is completely free for personal and academic use."
        }
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <img src={faqCharacter} alt="FAQ Character" className="faq-illustration" />
      </div>
      <h1 className="faq-title">Frequently Asked Questions</h1>

      <div className="faq-container">
        {faqData.map((group, groupIndex) => (
          <div key={groupIndex} className="faq-group">
            <h2 className="faq-category">{group.category}</h2>

            {group.questions.map((item, i) => {
              const idx = `${groupIndex}-${i}`;
              return (
                <div key={idx} className="faq-item">
                  <button className="faq-question" onClick={() => toggleFAQ(idx)}>
                    {item.q}
                    <span className="faq-icon">{openIndex === idx ? "−" : "+"}</span>
                  </button>

                  <div className={`faq-answer ${openIndex === idx ? "open" : ""}`}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
