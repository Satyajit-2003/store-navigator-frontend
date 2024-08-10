import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../services/api";
import { Store } from "../types";
import { useAlert } from "./AlertContext";

const EditStoreDetails: React.FC = () => {
  const [store, setStore] = useState<Store | null>(null);
  const { setSuccess, setError } = useAlert();
  const history = useHistory();
  document.title = store?.name || "Edit Store Details";

  useEffect(() => {
    const token = Cookies.get("token");
    const storeId = Cookies.get("storeId");
    if (!token || !storeId) {
      history.push("/login");
      return;
    }

    const fetchStoreDetails = async () => {
      try {
        const response = await api.get("/store/" + storeId);
        setStore(response.data);
      } catch (err) {
        setError("Failed to fetch store details");
      }
    };

    fetchStoreDetails();
  }, [history]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = Cookies.get("token");
    if (store && token) {
      try {
        await api.put("/store/update", { token, ...store });
        setSuccess("Store details updated successfully");
      } catch (err) {
        setError("Failed to update store details");
      }
      window.location.href = "/";
    }
  };

  return (
    <Container>
      {store && (
        <Form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Store Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={store.name || ""}
                onChange={(e) => setStore({ ...store, name: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Location</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={store.location || ""}
                onChange={(e) =>
                  setStore({ ...store, location: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Store Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={store.phone || ""}
                onChange={(e) => setStore({ ...store, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={store.email || ""}
                readOnly
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Website</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={store.website || ""}
                onChange={(e) =>
                  setStore({ ...store, website: e.target.value })
                }
              />
            </div>
          </div>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default EditStoreDetails;
