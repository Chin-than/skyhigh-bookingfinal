const mongoose = require('mongoose');
// Hardcode the string here just for testing (REPLACE PASSWORD CAREFULLY)
const uri = "mongodb+srv://Chintu:Chinthan@cluster0.ogvktf8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log("✅ CONNECTED!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ FAILED:", err.message);
    process.exit(1);
  });