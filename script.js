document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            output(input);
        }
    });
});

async function output(input) {
    addChat(input, "Thinking...");

    try {
        const response = await fetch("https://cablyai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // Adjust model as needed
                messages: [{ role: "user", content: input }],
                temperature: 0.7,
                max_tokens: 150
            })
        });

        const data = await response.json();
        let botReply = data.choices?.[0]?.message?.content?.trim() || "I'm sorry, I didn't understand that.";

        // Update the chat with AI response
        updateLastBotMessage(botReply);
    } catch (error) {
        console.error("Error fetching AI response:", error);
        updateLastBotMessage("Oops! Something went wrong.");
    }
}

function addChat(input, botMessage) {
    const messagesContainer = document.getElementById("messages");

    let userDiv = document.createElement("div");
    userDiv.className = "user response";
    userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
    messagesContainer.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.className = "bot response";
    botDiv.innerHTML = `<img src="bot-mini.png" class="avatar"><span>${botMessage}</span>`;
    messagesContainer.appendChild(botDiv);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function updateLastBotMessage(newText) {
    const botMessages = document.querySelectorAll(".bot.response span");
    if (botMessages.length > 0) {
        botMessages[botMessages.length - 1].innerText = newText;
    }
}
