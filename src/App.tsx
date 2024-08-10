import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import EditStoreDetails from "./components/EditStoreDetails";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import api from "./services/api";
import { AlertProvider } from "./components/AlertContext";
import Alert from "./components/Alert";
import "./styles.css";

const App: React.FC = () => {
  const token = Cookies.get("token");
  const storeId = Cookies.get("storeId");

  const [storeName, setStoreName] = React.useState<string>("");
  React.useEffect(() => {
    const fetchStoreName = async () => {
      if (token && storeId) {
        try {
          const response = await api.get("/store/" + storeId);
          setStoreName(response.data.name);
        } catch (err) {
          console.error("Failed to fetch store name");
        }
      }
    };

    fetchStoreName();
  }, [token, storeId]);

  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    !token;

  return (
    <AlertProvider>
      <Router>
        {!hideHeader && <Header storeName={storeName} />}
        <Alert />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/edit-store" component={EditStoreDetails} />
          <Route path="/product/:productId" component={ProductDetails} />
          <Route path="/add-product" component={AddProduct} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </AlertProvider>
  );
};

export default App;
