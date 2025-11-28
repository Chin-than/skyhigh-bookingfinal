const mongoose = require('mongoose');

const uri = "mongodb+srv://Chintu:Chinthan@cluster0.ogvktf8.mongodb.net/?appName=Cluster0";

console.log("⏳ Attempting to connect...");

mongoose.connect(uri)
  .then(() => {
    console.log("✅ CONNECTED SUCCESSFULLY!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ CONNECTION FAILED");
    console.error("Reason:", err.message);
    process.exit(1);
  });