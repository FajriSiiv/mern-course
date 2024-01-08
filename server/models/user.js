// models/user.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    // unique: true,
    // trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    // trim: true,
  },
  userRole: {
    type: String,
    enum: ["user", "admin"],
  },
});

// Method to compare passwords during login
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model("user", userSchema, "user_store");

export default User;
