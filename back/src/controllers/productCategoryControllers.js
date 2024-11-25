const ProductCategory = require("../models/productCategoryModel");

// Get all categories
const getProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    return res.status(200).json({ categories });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get product category by id
const getProductCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ProductCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ category });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller to create a new category

const createProductCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.body)
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const category = await ProductCategory.findOne({ name });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new ProductCategory({ name });
    const categoryResponse = await newCategory.save();
    return res
      .status(201)
      .json({ message: "Category created", category: categoryResponse });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//update category

const updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const category = await ProductCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name;
    const updatedCategory = await category.save();
    return res
      .status(200)
      .json({ message: "Category updated", category: updatedCategory });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//delete category
const deleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ProductCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await ProductCategory.findByIdAndDelete(id);
    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createProductCategory,
  deleteProductCategory,
  updateProductCategory,
  getProductCategories,
  getProductCategoryById,
};
