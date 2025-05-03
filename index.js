
const db = firebase.firestore();

// Elements for button text and spinner
const saveBtn = document.getElementById("saveBtn");
const saveBtnText = document.getElementById("saveBtnText");
const saveBtnSpinner = document.getElementById("saveBtnSpinner");

// Alert for sample code
alert("Try '0000' as sample code");

async function verifyCode() {
    const input = document.getElementById("secretCodeInput").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (!window.db) {
        console.error("❌ Firestore not initialized. Waiting...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (!window.db) {
            errorMsg.textContent = "Error: Database not connected.";
            return;
        }
    }

    // Disable the button and show the spinner while processing
    saveBtn.disabled = true;
    saveBtnText.textContent = "Processing";
    saveBtnSpinner.style.display = "inline-block";
    
    try {
        // Query Firestore for the secret code
        const querySnapshot = await window.db.collection("secretCodes")
            .where("secretCode", "==", input)
            .get();

        if (!querySnapshot.empty) {
            window.location.href = "Home.html"; // Redirect if match found
        } else {
            errorMsg.textContent = "Incorrect code. Please try again.";
        }
    } catch (error) {
        console.error("❌ Error verifying code:", error);
        errorMsg.textContent = "Something went wrong. Try again.";
    } finally {
        // Re-enable the button and reset its state
        saveBtn.disabled = false;
        saveBtnText.textContent = "Enter";
        saveBtnSpinner.style.display = "none";
    }
}

function goToCreatePage() {
    window.location.href = "create/create.html";
}
