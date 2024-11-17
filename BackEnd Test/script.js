document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const chatLog = document.getElementById("chat-log");
    const userInput = document.getElementById("user-input");
  
    const openaiApiKey = "";
    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const userMessage = userInput.value.trim();
      if (!userMessage) return;
  
      // Display user message
      addMessage("user", userMessage);
      userInput.value = "";
  
      // Fetch bot response
      const botResponse = await getBotResponse(userMessage);
      addMessage("bot", botResponse || "Sorry, II couldn't process that.");
    });
  
    function addMessage(sender, text) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("chat-message", sender);
      messageElement.textContent = text;
      chatLog.appendChild(messageElement);
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  
    async function getBotResponse(message) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
          }),
        });
  
        const data = await response.json();
        return data.choices?.[0]?.message?.content;
      } catch (error) {
        console.error("Error fetching OpenAI response:", error);
        return "An error occurred. Please try again.";
      }
    }
  });
  
