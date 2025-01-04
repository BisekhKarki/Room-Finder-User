const mongoose = require("mongoose");

const connectionToDatabase = async () => {
  try {
    const connecting = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connecting) {
      console.log("Database connected to the port", connecting.connection.host);
    } else {
      console.log("Database connection Failed");
    }
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = connectionToDatabase;
