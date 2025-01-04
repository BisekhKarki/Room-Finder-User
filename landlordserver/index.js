const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const database = require("./db/Connection");
const approval = require("./router/Approval");
const roomsPosted = require("./router/MyRooms");
// Databse connection
database();

app.use(cors());
app.use(express.json());

// Router to save the room in the database for the approval from the admin
app.use("/api/rooms", approval);

// Router to fetch the room posted by the landlord
app.use("/api/posted", roomsPosted);

app.listen(PORT, () => {
  console.log(`Server Running at Port: ${5000}`);
});
