import { db, collection, addDoc } from "./firebase/firebaseConfig"; 

let hasRun = false; // ✅ Prevent multiple executions

async function getDeviceDetails() {
  if (hasRun) return; // ✅ Prevent second execution
  hasRun = true;

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const details = {
    browser: navigator.userAgent,
    os: navigator.platform,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
    isMobile: isMobile ? "Mobile Device" : "Desktop Device",
    timestamp: new Date().toISOString(), // Store timestamp
  };

  console.log("Device Info:", details);

  try {
    await addDoc(collection(db, "soul"), details);
    console.log("✅ Device info added to Firestore");
  } catch (error) {
    console.error("❌ Error adding device info:", error);
  }
}

// Call the function when the page loads
window.addEventListener("load", getDeviceDetails);
