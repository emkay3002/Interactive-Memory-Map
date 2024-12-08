import React, { useState } from 'react';
import '../stylesheets/Modal.css';  // Style for modal

const Modal = ({ isOpen, closeModal, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add Friend</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter friend's email"
            required
          />
          <button type="submit">Add Friend</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
