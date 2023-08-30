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

        const Machinemessagerow = document.createElement("div");
        const Machinemessage = document.createElement("div");

        Machinemessagerow.className = "message-row"

        Machinemessage.className = "message other-person-message";
        Machinemessage.innerHTML = "<div class=\"bouncing-loader\">\n" +
            "  <div></div>\n" +
            "  <div></div>\n" +
            "  <div></div>\n" +
            "</div>"

        Machinemessagerow.appendChild(Machinemessage)
        chatMessages.appendChild(Machinemessagerow);

        run_text_summary(messageText, Machinemessage)
    }
});

messageInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});

function run_text_summary(text, message_div){
    $.ajax({
        url: "/run_text_summary",
        method: 'POST',
        data: {"text_prompt": text,},
        success: function (response) {
            summary = response.summary

            message_div.innerText = summary

        }
    })

}