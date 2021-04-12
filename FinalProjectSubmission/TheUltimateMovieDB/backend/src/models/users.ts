import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Regular",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      follower: {
        type: mongoose.Types.ObjectId,
        ref:'users'
      },
    },
  ],
    following: [
    {
      following: {
        type: mongoose.Types.ObjectId,
        ref:'users'
      },
    },
  ],
});

const User = mongoose.model("users", schema);

module.exports = { User };

// User.findByIdAndUpdate('',{$push:{followers:''}});

// User.findById()