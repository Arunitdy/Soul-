document.addEventListener("DOMContentLoaded", () => {
    const sendButton =document.querySelectorAll(".send_button");
    const messageInput =document.querySelectorAll(".mailBox"); // adjust ID if different
  
    if (sendButton && messageInput) {
      sendButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message === "") return;
  
        const secretCode = localStorage.getItem("secretCode");
        if (!secretCode) {
          alert("No secret code found. Redirecting...");
          window.location.href = "index.html";
          return;
        }
  
        // Store the message in the same document in 'responses'
        db.collection("responses").doc(secretCode).set(
          { message: message },
          { merge: true } // This ensures we don't overwrite "response" or "text"
        ).then(() => {
          console.log("Message saved!");
          messageInput.value = ""; // Clear input box
        }).catch(error => {
          console.error("Error saving message:", error);
        });
      });
    }
  });
  