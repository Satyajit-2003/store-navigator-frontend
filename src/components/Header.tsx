import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../services/api";
import { useAlert } from "./AlertContext";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header: React.FC<{ storeName: string }> = ({ storeName }) => {
  const history = useHistory();
  const storeId = Cookies.get("storeId");
  const [store, setStore] = React.useState<any>(null);
  const { setSuccess, setError } = useAlert();

  const handleLogout = () => {
    api.post("/auth/logout", { token: Cookies.get("token") });
    Cookies.remove("token");
    Cookies.remove("storeId");
    window.location.reload();
  };

  const fetchStoreDetails = async () => {
    try {
      const response = await api.get("/store/" + storeId);
      setStore(response.data);
    } catch (err) {
      setError("Failed to fetch store details");
    }
  };

  return (
    <Navbar
      variant="light"
      style={{
        backgroundColor: "#a8a8a8",
        marginLeft: "90px",
        marginRight: "90px",
        paddingLeft: "20px",
      }}
    >
      <Nav className="w-100 d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <Button
            variant="outline-primary"
            onClick={() => history.push("/")}
            className="mr-2"
          >
            <i className="bi bi-house"></i>
          </Button>
        </div>
        <h3
          className="m-0"
          style={{ flexGrow: 1, textAlign: "center", color: "#000000" }}
        >
          {storeName}
        </h3>
        <Button
          variant="outline-primary"
          onClick={() => history.push("/add-product")}
          className="mr-2"
        >
          <i className="bi bi-plus"></i>
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => history.push("/edit-store")}
        >
          <i className="bi bi-pencil"></i>
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
        </Button>
      </Nav>
    </Navbar>
  );
};

export default Header;
