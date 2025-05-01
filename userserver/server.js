const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 4000;
const connect = require("./Database/Connect");
const userRouter = require("./Routes/UserRoutes");
const passport = require("passport");
const approval = require("./Routes/Approval");
const roomsPosted = require("./Routes/MyRooms");
const cookieParser = require("cookie-parser");
// const validateUser = require("./Controller/ProtectRoute");
const ContactUs = require("./Routes/ContactUsRouter");
const paymentGateway = require("./Routes/PaymentRoute");
// const router = express.Router();
const roomRouter = require("./Routes/Rooms");
const rentedRouter = require("./Routes/Rented");
const watchListsRouter = require("./Routes/WatchLists");
const { scheduleUserEmails } = require("./lib/Automatic");

const homeRouter = require("./Routes/HomeRoute");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());

// Database connection
connect();

// For Automatic mail
scheduleUserEmails();

// Validate User
// for home router
app.use("/api", homeRouter);

// For user Routes
app.use("/api/user", userRouter);

// Router to save the room in the database for the approval from the admin
app.use("/api/rooms", approval);

// Router to fetch the room posted by the landlord
app.use("/api/posted", roomsPosted);

// Router to send contact us message from the user to the admin
app.use("/api/ContactUs", ContactUs);

// For payment
app.use("/api/payment", paymentGateway);

app.use("/api/tenants", roomRouter);

// For rented rooms
app.use("/api/rented", rentedRouter);

// For watchLists
app.use("/api/watchlists", watchListsRouter);

// Checking the server is running or not
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
