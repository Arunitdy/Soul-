let hasRun = false;

window.addEventListener("load", async function () {
  if (hasRun) return;
  hasRun = true;

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const details = {
    browser: navigator.userAgent,
    os: navigator.platform,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
    isMobile: isMobile ? "Mobile Device" : "Desktop Device",
    timestamp: new Date().toISOString(),
  };

  console.log("Device Info:", details);

  if (!window.db) {
    console.error("❌ Firebase Firestore is not initialized!");
    return;
  }

  try {
    await window.db.collection("portfolio").add(details);
    console.log("✅ Device info added to Firestore");
  } catch (error) {
    console.error("❌ Error adding device info:", error);
  }
});
