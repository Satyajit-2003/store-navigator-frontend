import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../services/api";
import { Product } from "../types";
import { useAlert } from "./AlertContext";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { setSuccess, setError } = useAlert();
  const storeId = Cookies.get("storeId");
  const history = useHistory();
  document.title = product?.name || "Product Details";

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      history.push("/login");
      return;
    }

    const fetchProductDetails = async () => {
      try {
        const response = await api.get("/product/" + storeId + "/" + productId);
        setProduct(response.data.products);
      } catch (err) {
        setError("Failed to fetch product details");
      }
    };

    fetchProductDetails();
  }, [history, productId]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = Cookies.get("token");
    if (product && token) {
      try {
        await api.put("/product/update", {
          token: token,
          product_id: product._id,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          quantity: product.quantity,
          aisle: product.aisle,
        });
        setSuccess("Product updated successfully");
        history.goBack();
      } catch (err) {
        setError("Failed to update product");
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      const token = Cookies.get("token");
      if (product && token) {
        try {
          await api.delete("/product/delete", {
            data: {
              token: token,
              product_id: product._id,
            },
          });
          setSuccess("Product deleted successfully");
          history.goBack();
        } catch (err) {
          setError("Failed to delete product");
        }
      }
    }
  };

  return (
    <Container>
      {product && (
        <Form onSubmit={handleSave}>
          <div className="form-group row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={product._id}
                hidden
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Product Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Price</label>
            <div className="col-sm-10">
              <input
                type="float"
                className="form-control"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: parseFloat(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <textarea
                aria-setsize={3}
                className="form-control"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Quantity</label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Aisle</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={product.aisle}
                onChange={(e) =>
                  setProduct({ ...product, aisle: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Image URL</label>
            <div className="col-sm-10">
              <input
                type="url"
                className="form-control"
                value={product.image}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
              />
            </div>
          </div>

          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="danger" className="ml-2" onClick={handleDelete}>
            Delete
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default ProductDetails;
