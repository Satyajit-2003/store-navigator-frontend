import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../services/api";
import { useAlert } from "./AlertContext";

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [aisle, setAisle] = useState("");
  const { setSuccess, setError } = useAlert();
  const history = useHistory();
  document.title = "Add Product";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !price || !description || !image || !quantity || !aisle) {
      setError("All fields are required");
      return;
    }
    const token = Cookies.get("token");
    const storeId = Cookies.get("storeId");
    if (token && storeId) {
      try {
        await api.put("/product/add", {
          token,
          name,
          price,
          description,
          image,
          quantity,
          aisle,
        });
        setSuccess("Product added successfully");
        history.goBack();
      } catch (err) {
        setError("Failed to add product");
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Price</label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Image URL</label>
          <div className="col-sm-10">
            <input
              type="url"
              className="form-control"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Quantity</label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Aisle</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setAisle(e.target.value)}
            />
          </div>
        </div>

        <br />
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
