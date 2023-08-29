const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");

sendButton.addEventListener("click", () => {
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
        const messagerow = document.createElement("div");
        const message = document.createElement("div");

        messagerow.className = "message-row right"

        message.className = "message user-message";
        message.textContent = messageText;
        messagerow.appendChild(message)
        chatMessages.appendChild(messagerow);

        messageInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }
});

messageInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});