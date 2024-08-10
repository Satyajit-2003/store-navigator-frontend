import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../services/auth";
import { useAlert } from "./AlertContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setSuccess, setError } = useAlert();
  document.title = "Login";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      Cookies.set("token", data.token, { expires: 1 });
      Cookies.set("storeId", data.storeId);
      console.log(Cookies.get("token") + " " + Cookies.get("storeId"));
      window.location.href = "/";
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "500px" }}>
        <h1 style={{ textAlign: "center" }}>Welcome Back!!</h1>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <Form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Button variant="link">
          <Link to="/register">Don't have an account? Register here</Link>
        </Button>
      </div>
    </Container>
  );
};

export default Login;
