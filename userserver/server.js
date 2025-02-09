const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const connect = require("./Database/Connect");
const userRouter = require("./Routes/UserRoutes");
const passport = require("passport");
const approval = require("./Routes/Approval");
const roomsPosted = require("./Routes/MyRooms");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// Database connection
connect();

// For user Routes
app.use("/api/user", userRouter);
// Router to save the room in the database for the approval from the admin
app.use("/api/rooms", approval);

// Router to fetch the room posted by the landlord
app.use("/api/posted", roomsPosted);

// Checking the server is running or not
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
