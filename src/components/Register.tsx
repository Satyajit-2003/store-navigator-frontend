import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { register } from "../services/auth";
import { useAlert } from "./AlertContext";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setSuccess, setError } = useAlert();
  const history = useHistory();
  document.title = "Register";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!email || !storeName || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    try {
      await register(email, storeName, password);
      setSuccess("Account created successfully");
      history.push("/login");
    } catch (err) {
      setError("Email already in use");
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
        <h1 style={{ textAlign: "center" }}>Hey There!!</h1>
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <Form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Store Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Confirm Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Button variant="link">
          <Link to="/login">Already have an account? Login here</Link>
        </Button>
      </div>
    </Container>
  );
};

export default Register;
