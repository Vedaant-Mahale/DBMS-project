import React, { useState } from 'react';

const initialFormData = {
  item_id: '',
  customer_id: '',
  batch_id: '',
  quantity: '',
  purchase_date: ''
};

function CustomerForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const inputStyle = {
    padding: '8px',
    margin: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '90%',
  };

  const buttonStyle = {
    backgroundColor: '#0072ff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <>
      <h2 style={{
      }}>Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          margin: '20px',
          borderRadius: '20px',
        }}>
          <input
            type="text"
            id="customer_id"
            placeholder="Customer ID"
            value={formData.customer_id}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            id="batch_id"
            placeholder="Batch ID"
            value={formData.batch_id}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            id="item_id"
            placeholder="Item ID"
            value={formData.item_id}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            id="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="date"
            id="purchase_date"
            placeholder="Purchase Date"
            value={formData.purchase_date}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{
          display: 'flex',
          gap: '10px',
        }}>
          <button type="submit" style={buttonStyle}>Submit</button>
          <button 
            type="button" 
            onClick={onCancel} 
            style={{
              ...buttonStyle,
              backgroundColor: '#95a5a6',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
      </>
  );
}

export default CustomerForm;