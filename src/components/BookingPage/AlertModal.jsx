import React from 'react';
import { IoMdClose } from "react-icons/io";

const AlertModal = ({ message, isVisible, onClose }) => {
  return (
    <div className={`modal ${isVisible ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}><IoMdClose /></span>
        <h2>Figyelmeztetés</h2>
        <div className="message-container">
          <p>{message}</p>
        </div>
        <button  onClick={onClose}>Oké</button>
      </div>
    </div>
  );
};

export default AlertModal;