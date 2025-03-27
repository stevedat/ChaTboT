document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", (e) => {
        if (e.code === "Enter" && inputField.value.trim() !== "") {
            let input = inputField.value.trim();
            inputField.value = "";
            output(input);
        }
    });
});

function output(input) {
    let product;
  
    let text = input.toLowerCase()
        .replace(/[^\w\s]/gi, "") // Remove special characters
        .replace(/[\d]/gi, "")    // Remove digits
        .trim();

    // Replace common contractions and phrases
    text = text
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .replace(/r u/g, "are you");

    // Check for a match in predefined responses
    product = compare(prompts, replies, text) 
              || (text.match(/thank/gi) ? "You're welcome!" : null) 
              || (text.match(/(corona|covid|virus)/gi) ? coronavirus[Math.floor(Math.random() * coronavirus.length)] : null) 
              || alternative[Math.floor(Math.random() * alternative.length)];

    // Update DOM
    addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
    for (let x = 0; x < promptsArray.length; x++) {
        if (promptsArray[x].some(prompt => prompt.toLowerCase() === string)) {
            let replies = repliesArray[x];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }
    return null;
}

function addChat(input, product) {
    const messagesContainer = document.getElementById("messages");

    let userDiv = document.createElement("div");
    userDiv.className = "user response";
    userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
    messagesContainer.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.className = "bot response";
    botDiv.innerHTML = `<img src="bot-mini.png" class="avatar"><span>Thinking...</span>`;
    messagesContainer.appendChild(botDiv);

    // Auto-scroll to the latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate response delay
    setTimeout(() => {
        botDiv.querySelector("span").innerText = product;
    }, 1000);
}
