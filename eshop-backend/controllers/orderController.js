const Order = require('../models/Order');

// @desc    Δημιουργία νέας παραγγελίας
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'Δεν υπάρχουν προϊόντα στην παραγγελία.' });
  }

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Αποτυχία δημιουργίας παραγγελίας.' });
  }
};
