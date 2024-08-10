import React, { useState } from "react";
import { ListGroup, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { Product } from "../types";
import { Link } from "react-router-dom";
import api from "../services/api";
import Cookies from "js-cookie";
import { useAlert } from "./AlertContext";

interface ProductListProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductList: React.FC<ProductListProps> = ({ products, setProducts }) => {
  const { setSuccess, setError } = useAlert();
  const updateQuantity = (id: string, newQuantity: number) => {
    const updatedProducts = products.map((product) => {
      if (product._id === id) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);

    api.put("/product/update", {
      token: Cookies.get("token"),
      product_id: id,
      quantity: newQuantity,
    });
  };

  return (
    <Container>
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item key={product._id}>
            <Row>
              <Col md={2}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "50%" }}
                />
              </Col>
              <Col md={6}>
                <h5>{product.name}</h5>
                <p>Aisle: {product.aisle}</p>
                <p>Price: ₹{product.price}</p>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      updateQuantity(product._id, product.quantity - 1)
                    }
                    disabled={product.quantity === 0}
                  >
                    -
                  </Button>
                  <span className="mx-2">{product.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      updateQuantity(product._id, product.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </div>
                <Link to={`/product/${product._id}`}>
                  <Button variant="primary" className="mt-2">
                    Edit
                  </Button>
                </Link>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ProductList;
