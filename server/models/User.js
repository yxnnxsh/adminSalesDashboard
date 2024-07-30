// schema for the user that will represent the model of the data 
import mongoose from "mongoose"

// schema we pass into mongoose
// format that mongoDB will follow to 'register' a user 
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;