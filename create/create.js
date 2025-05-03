const db = firebase.firestore();

function createSecretCode() {
    const yourName = document.getElementById("yourName").value.trim();
    const soulmateName = document.getElementById("soulmateName").value.trim();
    const newSecretCode = document.getElementById("newSecretCode").value.trim();
    const statusMsg = document.getElementById("statusMsg");

    if (!yourName || !soulmateName || !newSecretCode) {
        statusMsg.textContent = "Please fill in all fields.";
        statusMsg.style.color = "red";
        return;
    }

    db.collection("secretCodes").add({
        yourName,
        soulmateName,
        secretCode: newSecretCode
    })
    .then(() => {
        statusMsg.textContent = "Secret code saved successfully!";
        statusMsg.style.color = "green";
    })
    .catch((error) => {
        statusMsg.textContent = "Error saving code: " + error.message;
        statusMsg.style.color = "red";
    });
}

function goBack() {
    window.location.href = "index.html";
}