const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-js");

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
  try {
    const searchTerm = req.query.search || "";

    const query = searchTerm ? { name: new RegExp(searchTerm, "i") } : {};

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/cart/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: { cart: user.cart } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
    const isProductInCart = user.cart.some((cartProduct) =>
      cartProduct.equals(product._id)
    );

    if (isProductInCart) {
      user.cart = user.cart.filter(
        (cartProduct) => !cartProduct.equals(product._id)
      );
      await user.save();

      res.status(200).json({ message: "Product removed from cart", user });
    } else {
      user.cart.push(product);
      await user.save();

      res
        .status(200)
        .json({ message: "Product added to cart successfully", user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/order", async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      orderItems.push(product._id);
    }

    const order = {
      date: Date.now(),
      total: total,
      items: orderItems,
    };

    user.oldOrders = user.oldOrders || [];
    user.oldOrders.push({
      date: user.orderDate,
      items: user.order,
      total: total,
    });

    user.order = orderItems;
    user.orderDate = order.date;

    await user.save();

    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/emptyCart", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.cart = [];

    await user.save();

    return res.status(200).json({ message: "Cart emptied successfully" });
  } catch (error) {
    console.error("Error emptying cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/generateGuestCookie", (req, res) => {
  // Generate a unique guest ID (you can use a UUID library for this)
  const guestId = "65abb730d597db94b772cb11";

  // Set the guest ID as a cookie
  const cookieOptions = { expires: 365 }; // You can customize the expiration as needed
  const cookieValue = JSON.stringify({ guestId });
  const encodedCookie = cookie.encode(
    "guestCookie",
    cookieValue,
    cookieOptions
  );
  res.setHeader("Set-Cookie", [encodedCookie]);

  res.send("Guest cookie set!");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to DB:", err));

const PORT = process.env.PORT || 3001;

app.get("/userDetails/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Omit the password field from the response for security reasons
    const { password, ...userDetails } = user.toObject();

    res.json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
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

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
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
