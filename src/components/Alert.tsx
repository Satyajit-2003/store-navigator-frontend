import React from "react";
import { useAlert } from "./AlertContext";

const Alert: React.FC = () => {
  const { success, error, clearAlerts } = useAlert();

  if (!success && !error) return null;

  return (
    <div className="alert-container">
      {success && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
          style={{ borderLeft: "90px", borderRight: "90px" }}
        >
          {success}
          <button
            type="button"
            className="btn-close"
            onClick={clearAlerts}
            aria-label="Close"
          ></button>
        </div>
      )}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
          style={{ borderLeft: "90px", borderRight: "90px" }}
        >
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={clearAlerts}
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
};

export default Alert;
