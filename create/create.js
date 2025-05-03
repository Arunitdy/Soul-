const db = firebase.firestore();

async function createSecretCode() {
    const [yourName, soulmateName, newSecretCode, email] =
        ["yourName", "soulmateName", "newSecretCode", "newemail"]
            .map(id => document.getElementById(id).value.trim());

    const statusMsg = document.getElementById("statusMsg");
    if (!statusMsg) {
        console.error("❌ Element with id='statusMsg' not found!");
        return;
    }

    const saveBtn = document.getElementById("saveBtn");
    const saveBtnText = document.getElementById("saveBtnText");
    const saveBtnSpinner = document.getElementById("saveBtnSpinner");

    if (!yourName || !soulmateName || !newSecretCode || !email) {
        statusMsg.textContent = "Please fill in all fields.";
        statusMsg.style.color = "red";
        return;
    }

    // Start loading
    saveBtn.disabled = true;
    saveBtnText.textContent = "Processing...";
    saveBtnSpinner.style.display = "inline-block";
    statusMsg.textContent = "";

    try {
        // Check if secret code already exists
        const codeSnapshot = await db.collection("secretCodes")
            .where("secretCode", "==", newSecretCode)
            .get();

        const emailSnapshot = await db.collection("secretCodes")
            .where("email", "==", email.toLowerCase()) // case-insensitive match
            .get();

        if (!codeSnapshot.empty) {
            statusMsg.textContent = "⚠️ Secret code already exists.";
            statusMsg.style.color = "orange";
        } else if (!emailSnapshot.empty) {
            statusMsg.textContent = "⚠️ Email already exists.";
            statusMsg.style.color = "orange";
        } else {
            // Add to Firestore
            await db.collection("secretCodes").add({
                yourName,
                soulmateName,
                secretCode: newSecretCode,
                email: email.toLowerCase() // store lowercase
            });

            // Create matching chat document
            await db.collection("chat").doc(newSecretCode).set({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                participants: [yourName, soulmateName],
                messages: []
            });

            statusMsg.textContent = "✅ Secret code saved successfully!";
            statusMsg.style.color = "green";

            // Optional: Clear success after 5 seconds
            setTimeout(() => { statusMsg.textContent = ""; }, 5000);
        }
    } catch (error) {
        statusMsg.textContent = "❌ Error: " + error.message;
        statusMsg.style.color = "red";
        console.error("Firebase Error:", error);
    } finally {
        saveBtn.disabled = false;
        saveBtnText.textContent = "Save Code";
        saveBtnSpinner.style.display = "none";
    }
}

function goBack() {
    window.location.href = "../index.html";
}
