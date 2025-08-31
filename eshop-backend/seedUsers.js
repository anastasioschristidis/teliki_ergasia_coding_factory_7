// seedUsers.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Συνδέθηκε στη βάση MongoDB');
    return User.deleteMany();
  })
  .then(() => {
    const users = [
      {
        name: 'test',
        email: 'test@email.gr',
        password: '$2b$10$uyz62pBfrcIcJf46bZawpeqgL8CkkqzpmAr4/sMqwzfB7BYxL8rTG', // ίδιο hash
        role: 'customer'
      },//κωδικος 1234
      {
        name: 'admin',
        email: 'admin@email.gr',
        password: '$2b$10$/qKmnsjJ8x4BwVLqePsmheYdoFRiRT1LgEQspU8fgoTaRe8aArlV0', // ίδιο hash
        role: 'admin'
      } //κωδικος 123456
    ];

    return User.insertMany(users);
  })
  .then(() => {
    console.log('Οι χρήστες προστέθηκαν με επιτυχία!');
    process.exit();
  })
  .catch((err) => {
    console.error('Σφάλμα:', err);
    process.exit(1);
  });
