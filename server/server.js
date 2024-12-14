const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const connect = require("./Database/Connect");
const userRouter = require("./Routes/UserRoutes");

app.use(express.json());
app.use(cors());

// Database connection
connect();

// For user Routes
app.use("/api/user", userRouter);

// Checking the server is running or not
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
