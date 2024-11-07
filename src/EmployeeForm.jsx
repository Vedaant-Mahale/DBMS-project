import React, { useState } from 'react';

const initialFormData = {
  employee_id: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  hire_date: '',
  dept_id: '',
  manager_id: '',
  salary: '',
  address: '',
  birth_date: '',
  gender: '',
  image_url: ''
};

function EmployeeForm({ onSubmit, onCancel }) {
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
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
  };

  const buttonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '20px',
    }}>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '20px',
      }}>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '20px',
        }}>
          <input
            type="text"
            id="employee_id"
            placeholder="Employee ID"
            value={formData.employee_id}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            id="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            id="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="tel"
            id="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="date"
            id="hire_date"
            value={formData.hire_date}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            id="dept_id"
            placeholder="Department ID"
            value={formData.dept_id}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            id="manager_id"
            placeholder="Manager ID"
            value={formData.manager_id}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="number"
            id="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <textarea
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '60px',
            }}
          />
          <input
            type="date"
            id="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
          <input
            type="url"
            id="image_url"
            placeholder="Image URL"
            value={formData.image_url}
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
    </div>
  );
}

export default EmployeeForm;