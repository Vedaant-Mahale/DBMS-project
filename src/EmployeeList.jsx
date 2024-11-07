import React from 'react';

function EmployeeList({ employees }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '10px',
    }}>
      {employees.map(emp => (
        <div
          key={emp.employee_id}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src={emp.image_url}
            alt={`${emp.first_name} ${emp.last_name}`}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/100';
            }}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div style={{
            display: 'grid',
          }}>
            <p><strong>ID:</strong> {emp.employee_id}</p>
            <p><strong>Name:</strong> {emp.first_name} {emp.last_name}</p>
            <p><strong>Email:</strong> {emp.email}</p>
            <p><strong>Phone:</strong> {emp.phone_number}</p>
            <p><strong>Department:</strong> {emp.dept_id}</p>
            <p><strong>Salary:</strong> ${emp.salary}</p>
            <p><strong>Hire Date:</strong> {new Date(emp.hire_date).toLocaleDateString()}</p>
            <p><strong>Address:</strong> {emp.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;