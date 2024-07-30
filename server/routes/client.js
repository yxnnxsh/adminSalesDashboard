import express from "express";
import { getProducts, getCustomers, getTransactions, getGeography } from "../controllers/client.js"

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;


// create a route, i.e. router.get("/customers", getCustomers);
// import getCustomers from Controllers 
// create callback func getCustomers 
    // import data schema, this case the 'User' data schema 
// create the api endpoint (with the query and providesTags)
// import Customers component (in app.js)
    // create route for component 
// create Customers component 


// server-side pagination for transactions page 