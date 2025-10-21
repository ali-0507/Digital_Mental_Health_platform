 import "./AIChat.css";
import AIChatBox from "../components/AIChatBox";
import "./AIChat.css";

function AIChat() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div className="ai-bg py-5">
      <div className="container" style={{ maxWidth: 980 }}>
        <header className="text-center mb-3">
          <h2 className="ai-title mb-1">AI First-Aid Support</h2>
          <p className="ai-subtitle">
            A gentle assistant for basic coping strategies and reflection.
          </p>
        </header>

        <div className="ai-disclaimer mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          This chatbot offers general emotional support. It is <strong>not</strong> a substitute
          for professional therapy or emergency care. If you feel unsafe, please contact your local helpline.
        </div>

        <AIChatBox isLoggedIn={isLoggedIn} />

        <p className="ai-helpline mt-4 text-center">
          Need urgent help?{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noreferrer">
            Find mental-health helplines near you
          </a>
        </p>
      </div>
    </div>
  );
}
export default AIChat;

