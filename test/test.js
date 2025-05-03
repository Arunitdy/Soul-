function createSecretCode() {
    const yourName = document.getElementById("yourName").value.trim();
    const soulmateName = document.getElementById("soulmateName").value.trim();
    const newSecretCode = document.getElementById("newSecretCode").value.trim();
    const statusMsg = document.getElementById("statusMsg");
    const spinnerContainer = document.getElementById("spinnerContainer");

    if (!yourName || !soulmateName || !newSecretCode) {
        statusMsg.textContent = "Please fill in all fields.";
        statusMsg.style.color = "red";
        return;
    }

    // Show "Processing..." spinner
    spinnerContainer.style.display = "block";
    statusMsg.textContent = "";

    db.collection("secretCodes").add({
        yourName,
        soulmateName,
        secretCode: newSecretCode
    })
    .then(() => {
        statusMsg.textContent = "✅ Secret code saved successfully!";
        statusMsg.style.color = "green";
    })
    .catch((error) => {
        statusMsg.textContent = "❌ Error saving code: " + error.message;
        statusMsg.style.color = "red";
    })
    .finally(() => {
        spinnerContainer.style.display = "none";
    });
}
