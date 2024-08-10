import React, { createContext, useState, useContext } from "react";

type AlertContextType = {
  success: string;
  error: string;
  setSuccess: (message: string) => void;
  setError: (message: string) => void;
  clearAlerts: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const clearAlerts = () => {
    setSuccess("");
    setError("");
  };

  return (
    <AlertContext.Provider
      value={{ success, error, setSuccess, setError, clearAlerts }}
    >
      {children}
    </AlertContext.Provider>
  );
};
