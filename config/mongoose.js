const mongoose = require('mongoose');

const dbURI = 'mongodb://18.119.130.95:27017/sahinotes'; // Replace with your MongoDB URI

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
console.log('Connected to MongoDB');
})
.catch((err) => {
console.error('Error connecting to MongoDB:', err);
});
