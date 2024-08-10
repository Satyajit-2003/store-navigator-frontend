import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Alert, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import ProductList from "./ProductList";
import { Store, Product } from "../types";
import { useAlert } from "./AlertContext";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setSuccess, setError } = useAlert();
  const history = useHistory();
  document.title = "Home";

  useEffect(() => {
    const token = Cookies.get("token");
    const storeId = Cookies.get("storeId");
    if (!token || !storeId) {
      history.push("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await api.get("/product/" + storeId);
        setProducts(response.data.products);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, [history]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {
        <>
          <Form.Group controlId="formSearch">
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Button variant="primary">Search</Button>
              </Col>
            </Row>
          </Form.Group>
          <ProductList products={filteredProducts} setProducts={setProducts} />
          {products.length === 0 ? (
            <h1 style={{ textAlign: "center" }}>
              No Products yet, add products
            </h1>
          ) : (
            <></>
          )}
        </>
      }
    </Container>
  );
};

export default Home;
