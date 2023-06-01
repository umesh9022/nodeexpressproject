import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://umeshkumar:CH03K9022@cluster0.busvkeh.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "testingNodeProject",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, 
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// Middleware
app.use(bodyParser.json());

// get User API endpoint
app.get("/users", (req, res) => {
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        console.error("Failed to fetch user list", error);
        res.status(500).json({ error: "Failed to fetch user list" });
      });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
