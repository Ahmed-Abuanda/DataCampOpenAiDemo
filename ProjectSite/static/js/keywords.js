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

        run_keyword_extraction(messageText, Machinemessage)
    }
});

messageInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});

function run_keyword_extraction(text, message_div){
    $.ajax({
        url: "/run_keyword_extraction",
        method: 'POST',
        data: {"text_prompt": text,},
        success: function (response) {
            keywords = response.keywords

            keyword_list = document.createElement('ul')

            for (keyword of keywords){
                keyword_item = document.createElement('li')
                keyword_item.innerText = keyword
                keyword_list.appendChild(keyword_item)
            }

            message_div.innerHTML = "The keywords I found from the given text are:"
            message_div.appendChild(keyword_list)

        }
    })

}