document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            let input = inputField.value.trim();
            if (input !== "") {
                inputField.value = "";
                output(input);
            }
        }
    });
});

function output(input) {
    let product;
    
    // Normalize input
    let text = input.toLowerCase()
        .replace(/[^\w\s]/gi, "")  // Remove non-word characters
        .replace(/[\d]/gi, "")  // Remove digits
        .trim();

    text = text
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .replace(/r u/g, "are you");

    console.log("User input after processing:", text);

    // Check for a response
    if (compare(prompts, replies, text)) {
        product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
        product = "You're welcome!";
    } else if (text.match(/(corona|covid|virus)/gi)) {
        product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }

    // Display in chat
    addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
    for (let i = 0; i < promptsArray.length; i++) {
        if (promptsArray[i].includes(string)) {
            let replies = repliesArray[i];
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

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate bot response delay
    setTimeout(() => {
        botDiv.querySelector("span").innerText = product;
    }, 1500);
}
