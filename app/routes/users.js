const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

// Replace 'myDatabase' with your actual database name
const mongoDBURL = 'mongodb://localhost:27017/pintestDB1';

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  dp: {
    type: String,
    default: 'default_dp.jpg' // You can set a default profile picture here
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  }
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);






// const userschema = mongoose.Schema({
//   username: String,
//   name: String,
//   age: Number,
// })

// module.exports = mongoose.model('userss', userschema);