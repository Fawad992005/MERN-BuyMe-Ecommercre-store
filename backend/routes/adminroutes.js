// routes/admin.js
const express = require("express");
const Product = require("../models/product");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // File naming convention
  },
});
const upload = multer({ storage });

// Create a new product
router.post("/", upload.single("image"), async (req, res) => {
  const { name, description, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : ""; // Use the saved filename
  try {
    const newProduct = new Product({ name, description, price, imageUrl });
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a product
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Check if a new image was uploaded

  try {
    // Prepare the updates object
    const updates = { name, description, price };
    if (imageUrl) {
      updates.imageUrl = imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).send({ message: "Product deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
