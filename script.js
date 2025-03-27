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

async function output(input) {
    let product;
    
    // Normalize input
    let text = input.toLowerCase()
        .replace(/[^\w\s]/gi, "") 
        .replace(/[\d]/gi, "")
        .trim();

    console.log("User input after processing:", text);

    // Check for predefined responses
    if (compare(prompts, replies, text)) {
        product = compare(prompts, replies, text);
    } else {
        product = await fetchDeepSeekAI(text);  // Call AI API if no match found
    }

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

async function fetchDeepSeekAI(userMessage) {
    try {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: userMessage }],
                temperature: 0.7,
                max_tokens: 100
            })
        });

        const result = await response.json();
        console.log("API Response:", result);

        return result.choices[0].message.content || "Sorry, I couldn't get an answer.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Oops! Something went wrong. Try again.";
    }
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
