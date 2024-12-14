const mongoose = require("mongoose");

// Function to connect the database
const connect = async () => {
  try {
    const connections = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connections) {
      console.log(`Database connected to ${connections.connection.host}`);
    } else {
      console.log("No database connection");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
