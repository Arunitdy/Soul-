const db = firebase.firestore();

// Elements for button text and spinner
const saveBtn = document.getElementById("saveBtn");
const saveBtnText = document.getElementById("saveBtnText");
const saveBtnSpinner = document.getElementById("saveBtnSpinner");

// Alert for sample code
alert("Try '1111' as sample code 🩷🩷");

// Auto-fill secret code input if stored
window.addEventListener("load", () => {
    const storedCode = localStorage.getItem("secretCode");
    if (storedCode) {
        document.getElementById("secretCodeInput").value = storedCode;
    }
});

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

    // Disable button and show spinner
    saveBtn.disabled = true;
    saveBtnText.textContent = "Processing...";
    saveBtnSpinner.style.display = "inline-block";

    try {
        const querySnapshot = await window.db.collection("secretCodes")
            .where("secretCode", "==", input)
            .get();

        if (!querySnapshot.empty) {
            // Store the successful code
            localStorage.setItem("secretCode", input);
            window.location.href = "Home.html";
        } else {
            errorMsg.textContent = "Incorrect code. Please try again.";
        }
    } catch (error) {
        console.error("❌ Error verifying code:", error);
        errorMsg.textContent = "Something went wrong. Try again.";
    } finally {
        // Restore button state
        saveBtn.disabled = false;
        saveBtnText.textContent = "Enter";
        saveBtnSpinner.style.display = "none";
    }
}

function goToCreatePage() {
    window.location.href = "create/create.html";
}

function toggleCodeVisibility() {
    const input = document.getElementById("secretCodeInput");
    const checkbox = document.getElementById("showCodeCheckbox");
    input.type = checkbox.checked ? "text" : "password";
}
