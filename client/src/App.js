import {CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily"
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown"
import Admin from "scenes/admin"
import Performance from "scenes/performance"
function App() {

  // we can use state info anytime we want (global state with redux)
  const mode = useSelector((state) => state.global.mode); // grab state (in state file)
  // in documentation for useMemo
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]) // passing state into createTheme func, passing theme setting with the mode, using createTheme to configure what's necessary for the MUI

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* like a CSS reset */}
          <CssBaseline/>
          <Routes>
            {/* any route within this particular component will have the Layout component as the main parent  */}
            <Route element={<Layout/>}>
              {/* if we go to the default homepage, we'll be navigating to the dashboard route (so when we land on the homepage it'll take us to the dashboard) */}
              <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/customers" element={<Customers/>}/>
              <Route path="/transactions" element={<Transactions/>}/>
              <Route path="/geography" element={<Geography/>}/>
              <Route path="/overview" element={<Overview/>}/>
              <Route path="/daily" element={<Daily/>}/>
              <Route path="/monthly" element={<Monthly/>}/>
              <Route path="/breakdown" element={<Breakdown/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/performance" element={<Performance/>}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

     
    </div>
  );
}

export default App;

