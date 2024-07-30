import Product from "../models/Product.js"
import ProductStat from "../models/ProductStat.js"
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async(req, res) => {
  try {
    // returns all products
    const products = await Product.find();
    // for every product, we're finding the corresponding product stats using the product id
    const ProductsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id
        })
        return {
          ...product._doc,
          stat,
        }
      })
    );

    res.status(200).json(ProductsWithStats);

  } catch (error) {
      res.status(404).json({ message: error.message })
  }
}

export const getCustomers = async (req, res) => {
  try {
    // get the customers only (i.e. role of 'user')
    // remove password when sending infor on customers to FE
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
      res.status(404).json({ message: error.message })
  }
}


export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    //frontend will send that as a string
    //need to parse that into a JS object

    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 } -what mongodb can read


    //if sort=asc sortParsed.field=1 else -1
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);

      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };

      return sortFormatted;
    };

    //if sort exists we do the generateSort
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        //search the cost field with the user inputted search from frontend
        { cost: { $regex: new RegExp(search, "i") } },
        { "userId": { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);


    const total = await Transaction.countDocuments(
      {
        "userId": { $regex: new RegExp(search, "i") },
      }
    );

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      // changes country code form 2 to 3 - need to do this for nivo chart 
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    // converts to mappedLocations object into an array of objects that nivo charts recognises
    const formattedLocation = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count }
      }
    );

    res.status(200).json(formattedLocation); 
  } catch (error) {
      res.status(404).json({ message: error.message })
  }
}