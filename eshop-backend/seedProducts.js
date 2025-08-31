// seedProducts.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config(); // για .env

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB Connected');
    return Product.deleteMany(); // καθαρίζει ό,τι υπήρχε
  })
  .then(() => {
    const products = [
      {
        name: 'Lenovo IdeaPad 5',
        image: '/uploads/lenovo-ideapad5.jpg',
        description: '14-inch laptop with AMD Ryzen 5 and 8GB RAM',
        price: 699.99,
        category: 'Laptops',
        countInStock: 18
      },
      {
        name: 'Asus ROG Zephyrus G14',
        image: '/uploads/asus-rog-zephyrus.jpg',
        description: 'Gaming laptop with Ryzen 9 and RTX 3060',
        price: 1499.99,
        category: 'Laptops',
        countInStock: 8
      }
    ];

    return Product.insertMany(products);
  })
  .then(() => {
    console.log(' Προϊόντα προστέθηκαν!');
    process.exit();
  })
  .catch((err) => {
    console.error(' Σφάλμα κατά την εισαγωγή προϊόντων:', err);
    process.exit(1);
  });
