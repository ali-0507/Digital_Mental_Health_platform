// import React from "react";
import AIChatBox from "../components/AIChatBox";
import "./AIChat.css";

function AIChat() {
  return (
    <div className="aichat p-3 mb-4">
      <h2 className="mt-2 mb-3 text-center">AI First-Aid Support</h2>
      <p className="text-muted text-center mb-4">
        This chatbot provides basic coping strategies and guidance.  
        ⚠️ It is not a replacement for professional help.
      </p>

      <div className="card p-4 shadow-sm">
        <AIChatBox />
      </div>
    </div>
  );
}

export default AIChat;
