const Order = require("../models/orderModel");
const Product = require("../models/productModel");


// Create an order
const createOrder = async (req, res) => {
  try {
    const { products, user, paymentId } = req.body;

    // Calculate total amount
    let totalAmount = 0;
    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      products,
      totalAmount,
      user,
      paymentId,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.product"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus
};
