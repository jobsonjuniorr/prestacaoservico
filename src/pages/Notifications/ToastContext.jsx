import { createContext, useContext, useState } from "react";
import "../../styles/alert.css";
const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [alertBox, setAlertBox] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlertBox({ message, type });
  };

  const closeAlert = () => {
    setAlertBox(null);
  };

  return (
    <ToastContext.Provider value={{ showAlert }}>
      {children}

      {alertBox && (
        <div className="alert-overlay"> 
          <div className={`alert-box ${alertBox.type}`}>
            <p>{alertBox.message}</p>
            <button className="alert-btn" onClick={closeAlert}>OK</button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useAlert() {
  return useContext(ToastContext);
}
