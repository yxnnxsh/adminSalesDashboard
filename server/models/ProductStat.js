// schema for the user that will represent the model of the data 
import mongoose from "mongoose"

// schema we pass into mongoose
// format that mongoDB will follow to 'register' a user 
const ProductStateSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number
      }
    ],
    dailyData: [{
      date: String,
      totalSales: Number,
      totalUnits: Number
    }]
  },
  {
    timestamps: true
  }
);

const ProductStat = mongoose.model("ProductStat", ProductStateSchema);
export default ProductStat; 