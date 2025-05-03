const db = firebase.firestore();

async function createSecretCode() {
    const yourName = document.getElementById("yourName").value.trim();
    const soulmateName = document.getElementById("soulmateName").value.trim();
    const newSecretCode = document.getElementById("newSecretCode").value.trim();

    const statusMsg = document.getElementById("statusMsg");
    if (!statusMsg) {
        console.error("❌ Element with id='statusMsg' not found!");
        return;
    }

    const saveBtn = document.getElementById("saveBtn");
    const saveBtnText = document.getElementById("saveBtnText");
    const saveBtnSpinner = document.getElementById("saveBtnSpinner");

    if (!yourName || !soulmateName || !newSecretCode) {
        statusMsg.textContent = "Please fill in all fields.";
        statusMsg.style.color = "red";
        return;
    }

    // Start loading state
    saveBtn.disabled = true;
    saveBtnText.textContent = "Processing";
    saveBtnSpinner.style.display = "inline-block";
    statusMsg.textContent = "";

    try {
        // Check for duplicate secret code
        const snapshot = await db.collection("secretCodes")
            .where("secretCode", "==", newSecretCode)
            .get();

        if (!snapshot.empty) {
            statusMsg.textContent = "⚠️ Secret code already exists.";
            statusMsg.style.color = "orange";
        } else {
            // Save to secretCodes (auto-generated ID)
            await db.collection("secretCodes").add({
                yourName,
                soulmateName,
                secretCode: newSecretCode
            });

            // Also create a document in "chat" collection with secret code as ID
            await db.collection("chat").doc(newSecretCode).set({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                participants: [yourName, soulmateName],
                messages: [] // optional: start with empty message array
            });

            statusMsg.textContent = "✅ Secret code saved successfully!";
            statusMsg.style.color = "green";
        }
    } catch (error) {
        statusMsg.textContent = "❌ Error: " + error.message;
        statusMsg.style.color = "red";
    } finally {
        saveBtn.disabled = false;
        saveBtnText.textContent = "Save Code";
        saveBtnSpinner.style.display = "none";
    }
}

function goBack() {
    window.location.href = ".././index.html";
}
