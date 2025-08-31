const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Εγγραφή χρήστη
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Ο χρήστης υπάρχει ήδη.' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Σφάλμα εγγραφής:', error);
    res.status(500).json({ message: 'Αποτυχία εγγραφής χρήστη.' });
  }
};

// @desc    Σύνδεση χρήστη
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Λανθασμένο email ή κωδικός.' });
    }

    const match = await user.matchPassword(password);

    if (!match) {
      return res.status(401).json({ message: 'Λανθασμένο email ή κωδικός.' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Σφάλμα σύνδεσης:', error);
    res.status(500).json({ message: 'Αποτυχία σύνδεσης χρήστη.' });
  }
};
