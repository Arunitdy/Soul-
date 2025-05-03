const db = firebase.firestore();
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const chatHeader = document.getElementById("chatHeader");
const identityModal = document.getElementById("identityModal");
const youBtn = document.getElementById("youBtn");
const soulmateBtn = document.getElementById("soulmateBtn");

const secretCode = localStorage.getItem("secretCode");
let yourName = localStorage.getItem("yourName");
let otherName = localStorage.getItem("otherName");

if (!secretCode) {
  alert("No secret code found. Redirecting...");
  window.location.href = "../index.html";
}

if (!yourName || !otherName) {
  identityModal.style.display = "flex";

  db.collection("secretCodes")
    .where("secretCode", "==", secretCode)
    .limit(1)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        alert("Invalid secret code. Redirecting...");
        window.location.href = "../index.html";
        return;
      }

      const data = snapshot.docs[0].data();
      youBtn.textContent = data.yourName;
      soulmateBtn.textContent = data.soulmateName;

      youBtn.onclick = () => selectIdentity(data.yourName, data.soulmateName);
      soulmateBtn.onclick = () => selectIdentity(data.soulmateName, data.yourName);
    })
    .catch((err) => {
      console.error("Error loading identity:", err);
      alert("Something went wrong.");
    });
} else {
  chatHeader.textContent = `${otherName}`;
  startChat();
}

function selectIdentity(me, other) {
  yourName = me;
  otherName = other;
  localStorage.setItem("yourName", yourName);
  localStorage.setItem("otherName", otherName);
  chatHeader.textContent = `${otherName}`;
  identityModal.style.display = "none";
  startChat();
}

function startChat() {
  db.collection("chat").doc(secretCode).onSnapshot((doc) => {
    chatBox.innerHTML = "";

    if (!doc.exists) return;

    const messages = doc.data().messages || [];
    messages.forEach((msg) => {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("message");
      msgDiv.classList.add(msg.sender === yourName ? "sent" : "received");
      msgDiv.textContent = msg.text;
      chatBox.appendChild(msgDiv);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  const message = {
    sender: yourName,
    text: text,
    timestamp: new Date().toISOString(),
  };

  db.collection("chat")
    .doc(secretCode)
    .set(
      {
        messages: firebase.firestore.FieldValue.arrayUnion(message),
      },
      { merge: true }
    )
    .then(() => {
      messageInput.value = "";
    })
    .catch((err) => {
      console.error("Send error:", err);
      alert("Message failed. Try again.");
    });
}
