const db = firebase.firestore();
const secretCode = localStorage.getItem("secretCode");

if (!secretCode) {
  alert("No secret code found. Redirecting...");
  window.location.href = "index.html";
}

// Helper function to write the response
function sendResponse(text, answer) {
  answer = answer === "yes 💕" ? "She said YES 💖" : "They said no 💔";

  db.collection("responses").doc(secretCode)
    .set({
      response: answer,
      text: text
    })
    .then(() => {
      alert(`Your response "${answer}" has been saved!`);
      // Optionally redirect or disable buttons
      document.querySelectorAll(".answer").forEach(btn => btn.disabled = true);
    })
    .catch((err) => {
      console.error("Error saving response:", err);
      alert("Something went wrong. Try again.");
    });
}


function retrieveResponse(secretCode) {
    db.collection("responses").doc(secretCode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const response = data.response;
          const text = data.text;
  
          // Displaying the response and text in the UI
          // Optionally, display the message if exists
          if (text) {
            showTemporaryResponse(response, text);
            console.log( `Message: ${response}  ${text}`);
          }
  
        } else {
          alert("no response");
        }
      })
      .catch((err) => {
        console.error("Error retrieving response:", err);
      });
  }
  
  // Call the retrieveResponse function when needed, e.g., on page load
  document.addEventListener("DOMContentLoaded", () => {
    retrieveResponse( localStorage.getItem("secretCode"));
  });
  function showTemporaryResponse(response, text) {
    const container = document.createElement("div");
    container.classList.add("custom-alert"); // for styling with response.css
  
    const responseParagraph = document.createElement("p");
    responseParagraph.textContent = response;
  
    const textParagraph = document.createElement("p");
    textParagraph.textContent = text;
  
    container.appendChild(responseParagraph);
    container.appendChild(textParagraph);
  
    document.body.appendChild(container);
  
    // Remove after 3 seconds
    setTimeout(() => {
      container.remove();
    }, 3000);
  }
  