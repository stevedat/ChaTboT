// User prompts
const prompts = [
    ["hi", "hiii", "hey", "hello", "good morning", "good afternoon"],
    ["how are you", "how is life", "how are things"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you"],
    ["your name please", "your name", "may i know your name", "what is your name", "what call yourself"],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
    ["bad", "bored", "tired"],
    ["help me", "tell me story", "tell me joke"],
    ["ah", "yes", "ok", "okay", "nice"],
    ["bye", "good bye", "goodbye", "see you later"],
    ["what should i eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["no", "not sure", "maybe", "no thanks"],
    ["haha", "ha", "lol", "hehe", "funny", "joke"]
];

// Corresponding replies
const replies = [
    ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy!"],
    ["I'm good, how about you?", "Doing well, how are you?", "Feeling great! How about you?"],
    ["Not much, just chatting with you!", "Thinking about AI stuff...", "Just here to talk!"],
    ["I am ageless!"],
    ["I'm an AI assistant!", "I'm a chatbot, what about you?"],
    ["I was created by a developer who loves JavaScript!"],
    ["I don't have a name yet, what would you call me?"],
    ["I love you too! 💙"],
    ["That’s awesome! Keep smiling!", "Glad to hear that!"],
    ["Oh no, what happened?", "Hope things get better soon!", "Try doing something you enjoy!"],
    ["Sure! Once upon a time, in a digital world...", "Here's a joke: Why don’t skeletons fight each other? They don’t have the guts!"],
    ["Cool!", "Nice!", "Alright!"],
    ["Goodbye! See you soon!", "Take care!", "Have a great day!"],
    ["How about some sushi?", "Pizza sounds great!", "Maybe try a salad?"],
    ["Brooo!"],
    ["That's a deep question!", "Let me think..."],
    ["No worries!", "Got it!", "Want to talk about something else?"],
    ["Haha, that was funny!", "Good one!"]
];

// Random fallback responses
const alternative = [
    "I'm not sure I understand.",
    "Can you rephrase that?",
    "Tell me more!",
    "Interesting...",
    "Let's talk about something else!"
];

// Responses for coronavirus-related input
const coronavirus = [
    "Stay safe and wash your hands!",
    "Remember to wear a mask!",
    "Social distancing is important!",
    "Let's hope for a better future!"
];

// Function to compare user input with prompts
function compare(promptsArray, repliesArray, string) {
    for (let i = 0; i < promptsArray.length; i++) {
        if (promptsArray[i].includes(string)) {
            let replies = repliesArray[i];
            return replies[Math.floor(Math.random() * replies.length)]; // Pick a random reply
        }
    }
    return null;
}

// Function to process user input and generate a response
function output(input) {
    let text = input.toLowerCase()
        .replace(/[^\w\s]/gi, "") // Remove non-word characters
        .replace(/[\d]/gi, "") // Remove digits
        .trim();

    text = text
        .replace(/ a /g, " ")   
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .replace(/r u/g, "are you");

    let product = compare(prompts, replies, text);

    if (!product) {
        if (text.match(/thank/gi)) {
            product = "You're welcome!";
        } else if (text.match(/(corona|covid|virus)/gi)) {
            product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
        } else {
            product = alternative[Math.floor(Math.random() * alternative.length)];
        }
    }

    addChat(input, product);
}
