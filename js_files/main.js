const users = JSON.parse(localStorage.getItem("users")) || [];
const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

const anchorTags = document.querySelectorAll('.carousel-item a');

anchorTags.forEach(anchor => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        if (loggedInUserEmail && users.some(user => user.email === loggedInUserEmail)) {

        const countryName = anchor.getAttribute('name');
        window.location.href = `hotel.html?country=${countryName}`;
        }
else {
            window.location.href = "./register.html";
}

    });
});


document.addEventListener("DOMContentLoaded", () => {

    const bookBtn = document.getElementById("bookBtn");
    if (loggedInUserEmail && users.some(user => user.email === loggedInUserEmail)) {
        bookBtn.href = "./Location.html";

    } else {
        bookBtn.href = "./register.html";

    }

   
});
 
    // Toggle function to show/hide the chat container
    function toggleChat() {
      const chatContainer = document.getElementById("chatContainer");
      const openChatBtn = document.getElementById("openChatBtn");

      chatContainer.style.display = "block"; // Show the chat container
      openChatBtn.style.display = "none"; // Hide the open chat button
    }

    // Close function to hide both chat and the button
    function closeChat() {
      const chatContainer = document.getElementById("chatContainer");
      const openChatBtn = document.getElementById("openChatBtn");

      chatContainer.style.display = "none"; // Hide the chat container
      openChatBtn.style.display = "block"; // Show the open chat button
    }

    // Chatbot functionality (same as before)
    const chatlog = document.getElementById("chatlog");

    function getResponse() {
      const userInput = document.getElementById("userInput").value;
      const botResponse = generateResponse(userInput.toLowerCase());
      displayMessage("You: " + userInput, "user");
      displayMessage("Bot: " + botResponse, "bot");
      document.getElementById("userInput").value = ""; // Clear input field
    }

    function displayMessage(message, sender) {
      const p = document.createElement("p");
      p.className = sender;
      p.textContent = message;
      chatlog.appendChild(p);
      chatlog.scrollTop = chatlog.scrollHeight; // Auto-scroll to the bottom
    }

    function generateResponse(userInput) {
      let response = "";

      if (userInput.includes("hotel")) {
        response = "I can help you find hotels! What's your budget?";
      } else if (userInput.includes("food")) {
        response = "What type of food are you in the mood for?";
      } else if (userInput.includes("order")) {
        response = "You can view or edit your orders from the profile page.";
      } else if (userInput.includes("cancel booking")) {
        response =
          "To cancel your booking, go to your profile page and select the order you want to cancel.";
      } else if (userInput.includes("change hotel dates")) {
        response =
          "Yes, you can change your hotel dates from your profile by editing your hotel booking.";
      } else if (userInput.includes("check-in time")) {
        response =
          "Most hotels have a check-in time of 2:00 PM. You can check the specific hotel's policy on your booking confirmation.";
      } else if (userInput.includes("best restaurant")) {
        response =
          "I recommend checking the 'Food' section for the top-rated restaurants near your location!";
      } else if (userInput.includes("view my order")) {
        response =
          "You can view your order details on the profile page under 'My Orders'.";
      } else if (userInput.includes("payment methods")) {
        response =
          "We accept credit cards, debit cards, and PayPal. You can choose your preferred method during checkout.";
      } else if (userInput.includes("refund policy")) {
        response =
          "Refunds are available based on the hotel's or restaurant's cancellation policy. Please check your order details for specific terms.";
      } else if (userInput.includes("contact customer support")) {
        response =
          "You can contact customer support by visiting the 'Help' section on our website or calling us at 123-456-7890.";
      } else if (userInput.includes("leave a review")) {
        response =
          "You can leave a review for your hotel or food order by visiting the 'My Orders' section and selecting 'Leave a Review'.";
      } else if (userInput.includes("book a taxi")) {
        response =
          "Currently, we don’t offer taxi booking services, but you can find recommended ride-sharing apps in the 'Transport' section.";
      } else if (userInput.includes("hello")) {
        response = "Hello! How can I assist you today?";
      } else if (userInput.includes("thank you")) {
        response = "You're welcome!";
      } else if (userInput.includes("can i ask you something")) {
        response = "yes , sure !";
      } else {
        response = "Sorry, I didn't understand that. Can you try rephrasing?";
      }

      return response;
    }