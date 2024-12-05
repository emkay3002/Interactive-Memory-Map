const app = require("./app"); // Import app instance from app.js
// server.js
const { connectDB } = require("./config/db"); // Adjust path if necessary

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Call the function to connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
