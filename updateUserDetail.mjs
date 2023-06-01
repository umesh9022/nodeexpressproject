import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://umeshkumar:ch03k9022@cluster0.busvkeh.mongodb.net/?retryWrites=true&w=majority",
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

// Update user API endpoint
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  User.findByIdAndUpdate(userId, updatedUserData, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Failed to update user", error);
      res.status(500).json({ error: "Failed to update user" });
    });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
