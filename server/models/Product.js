// schema for the user that will represent the model of the data 
import mongoose from "mongoose"

// schema we pass into mongoose
// format that mongoDB will follow to 'register' a user 
const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product; 