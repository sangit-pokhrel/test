const Product = require("../models/productModel");
const Category = require("../models/productCategoryModel");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock, brand } =
      req.body;

    if (
      !name ||
      !description
      // !price ||
      // !category ||
      // !countInStock ||
      // !brand
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Category does not exist" });
    }
    const productData = {
      name,
      description,
      price,
      category,
      countInStock,
      brand,
    };
    if (req.file) {
      productData.productImage = `uploads/productImg/${req.file.filename}`;
    }
    const newProduct = new Product({
      ...productData,
    });
    const productResponse = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      product: productResponse,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// const product = new Product(req.body);
// try {
//   await product.save();
//   res
//     .status(201)
//     .json({ msg: "Product created successfully", product: product });
// } catch (error) {
//   res.status(400).json({ message: error.message });
// }
// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ msg: "Product updated successfully", product: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
