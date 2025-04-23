//API key- AIzaSyCGsU8ap7jBwmdmDxIe8O5_IjWru5MnAQ4
//URL- https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCGsU8ap7jBwmdmDxIe8O5_IjWru5MnAQ4

document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");

  //auto increase input height
  userInput.addEventListener("input", () => {
    userInput.style.height = "auto";
    userInput.style.height = userInput.scrollHeight + "px";
  });

  //form control
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) {
      return;
    }
    userInput.value = "";
    userInput.style.height = "auto";
    sendButton.disabled = true;

    //add userInput to chat function
    addMessage(message, true);

    //typing indicator
    const typingIndicator = showTypingIndicator();
    //generate response function
    try {
      const response = await generateResponse(message);
      typingIndicator.remove();
      if (!response) {
        throw new Error("Unable to Generate Response");
      }
      addMessage(response, false);
      sendButton.disabled = false;
    } catch (error) {
      typingIndicator.remove();
      errorMessage(error.message);
    }
  });

  //add userinput to chat
  function addMessage(text, isUser) {
    const message = document.createElement("div");
    message.className = `message ${isUser ? "user-message" : ""}`;
    message.innerHTML = `
    <div class="avatar ${isUser ? "user-avatar" : ""}" >${
      isUser ? "U" : "AI"
    }</div>
    <div class="message-content ${isUser ? "user-message" : ""} ">${text}</div>
    `;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  //show typing indicator
  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "message";
    indicator.innerHTML = `
    <div class="avatar" >AI</div>
    <div class="typing-indicator" >
    <div class="dot" ></div>
    <div class="dot" ></div>
    <div class="dot" ></div>
    </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return indicator;
  }

  //error message
  function errorMessage(text) {
    const message = document.createElement("div");
    message.className = "message";
    message.innerHTML = `
    <div class="avatar" >AI</div>
    <div class="message-content" style="color:red;">
    Error: ${text}
    </div>
    `;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  //generate response
  async function generateResponse(prompt) {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCGsU8ap7jBwmdmDxIe8O5_IjWru5MnAQ4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Unable to get Response");
    }
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  //chatbot icon
  const containerDiv = document.querySelector(".chatbot-container");
  const chatBotIcon=document.querySelector(".chatbot-img")
  chatBotIcon.addEventListener("click",()=>{
    if(containerDiv.style.display==="flex"){
        return containerDiv.style.display="none"
    }
    containerDiv.style.display="flex"
    console.log("Clicked");
    
  })
});
