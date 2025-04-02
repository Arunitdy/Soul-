window.addEventListener("load", async function () {
  if (!window.db) {
    console.error("❌ Firebase Firestore is not initialized! Waiting...");
    
    // Wait for Firebase to initialize
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!window.db) {
      console.error("❌ Firestore still not initialized!");
      return;
    }
  }

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const details = {
    browser: navigator.userAgent,
    os: navigator.platform,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
    isMobile: isMobile ? "Mobile Device" : "Desktop Device" + " soul",
    timestamp: new Date().toISOString(),
  };

  console.log("📌 Device Info:", details);

  try {
    await window.db.collection("soul1").add(details);
    console.log("✅ Device info added to Firestore");
  } catch (error) {
    console.error("❌ Error adding device  info:", error);
  }
});
