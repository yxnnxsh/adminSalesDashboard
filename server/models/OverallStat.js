// schema for the user that will represent the model of the data 
import mongoose from "mongoose"

// schema we pass into mongoose
// format that mongoDB will follow to 'register' a user 
const OverallStateSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
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
    }],
    salesByCategory: {
      type: Map,
      of: Number
    }
  },
  {
    timestamps: true
  }
);

const OverallStat = mongoose.model("OverallStat", OverallStateSchema);
export default OverallStat; 