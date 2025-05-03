const db = firebase.firestore();

async function getSecretCode() {
  const email = document.getElementById("emailInput").value.trim().toLowerCase();
  const resultMsg = document.getElementById("resultMsg");

  if (!email) {
    resultMsg.textContent = "Please enter your email.";
    resultMsg.style.color = "red";
    return;
  }

  try {
    resultMsg.textContent = "Searching...";
    resultMsg.style.color = "black";

    const snapshot = await db.collection("secretCodes")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      resultMsg.textContent = "❌ No secret code found for this email.";
      resultMsg.style.color = "red";
    } else {
      let code = "";
      snapshot.forEach(doc => {
        code = doc.data().secretCode;
      });
      resultMsg.textContent = `✅ Your Secret Code: ${code}`;
      resultMsg.style.color = "green";
    }
  } catch (error) {
    resultMsg.textContent = "❌ Error: " + error.message;
    resultMsg.style.color = "red";
  }
}

function goBack() {
  window.location.href = "../index.html";
}
