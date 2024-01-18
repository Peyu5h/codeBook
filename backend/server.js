const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const generateToken = require("./helper/generateToken");

const bcrypt = require("bcrypt");
const User = require("./models/User");
const bodyParser = require("body-parser");
const Product = require("./models/Product");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.post("/addToCart", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    user.cart.push(product);

    await user.save();

    res
      .status(200)
      .json({ message: "Product added to cart successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to DB:", err));

const PORT = process.env.PORT || 3001;

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    const token = generateToken({ id: newUser._id.toString() }, "7d");

    return res.json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token,
      message: "Registration successful! ",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
