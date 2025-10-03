const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// 🚨 Replace with your HuggingFace Inference API Key
const API_KEY = "YOUR_HUGGINGFACE_API_KEY";
const MODEL = "microsoft/DialoGPT-medium";  // conversational model

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Display user message
  addMessage(message, "user");
  userInput.value = "";

  // Call Hugging Face API
  addMessage("Thinking...", "bot");
  const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: message })
  });

  const data = await response.json();
  document.querySelector(".bot:last-child").innerText =
    data.generated_text || "Sorry, I couldn’t understand.";
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll
}
