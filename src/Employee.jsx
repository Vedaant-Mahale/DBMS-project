import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import logo from './assets/logo.png';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const location = useLocation();
  const user = location.state?.user;
  const [showForm, setShowForm] = useState(false);
  const [addupdate,setAddUpdate] = useState(false);
  const [removeId,setRemoveId] = useState('');
  const [iscustomerhovering, setIsCustomerHovering] = useState(false);
  const [iswarehousehovering, setIsWarehouseHovering] = useState(false);
  const navigate = useNavigate();
  const styles = {
    body: {
      margin: 0,
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(to right, #00c6ff, #0072ff)',
      animation: 'gradientBackground 8s ease infinite', // Gradient background animation
      backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085")', // Example background image (you can replace this URL with any image)
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', // Create a parallax effect
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover', // Ensure the image covers the whole background
      height: '100%',
  },
  bodyfilter: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
    header: {
        width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      height:'70px',
      backgroundColor: '#0072ff',
      color: 'black'
    },
    logo: {
      width:'60px',
      filter: 'invert(1)',
      margin:'20px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
   Customerbutton: {
      backgroundColor: iscustomerhovering? '#0072ff':'white',
      color: iscustomerhovering? 'white':'black',
      fontWeight:'bold',
      padding: '10px',
      fontFamily: '20px',
      width:'100px',
      borderRadius: '20px',
      border:'solid white 2px',
      pointer: 'cursor',
      transition: 'background-color 0.1s ease-in',
      margin:'20px',
    },
    Warehousebutton: {
      backgroundColor: iswarehousehovering? '#0072ff':'white',
      color: iswarehousehovering? 'white':'black',
      fontWeight:'bold',
      padding: '10px',
      fontFamily: '20px',
      width:'100px',
      borderRadius: '20px',
      border:'solid white 2px',
      pointer: 'cursor',
      transition: 'background-color 0.1s ease-in',
      margin:'20px',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    userAvatar: {
      backgroundColor:'white',
      borderRadius:'5px',
      margin:'10px',
      fontWeight: 'bold',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
      backgroundColor: 'rgba(255, 255, 255, 0.5)', 
      borderRadius:'5px',
      color: '#333',
    },
    headerbottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    addButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    updateButton: 
    {
      backgroundColor: '#5599BB',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    removeInputContainer: {
      display: 'flex',
      gap: '10px',
    },
    removeInput: {
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      width: '100%',
    },
    removeButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
  };

  useEffect(() => {
    const fetchtrans = "Select * from Employee";
    const fetchTransactions = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: fetchtrans });
        setEmployees(response.data);
    } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);
  const toCustomer = () =>
    {
        navigate('/customer',{ state: { user: user } });
    }
    const toWarehouse = () =>
    {
        navigate('/supplied',{state: { user:user}});
    }
    const handleCustomerMouseHover = () => 
    {
      setIsCustomerHovering(true);
    }
    const handleCustomerMouseLeave = () =>
    {
      setIsCustomerHovering(false);
    }
    const handleWarehouseMouseHover = () =>
    {
      setIsWarehouseHovering(true);
    }
    const handleWarehouseMouseLeave = () =>
    {
      setIsWarehouseHovering(false);
    }
  const addEmployee = async (newEmployee) => {
    // Constructing the SQL query string with the form data
    if(!addupdate)
    {
      const addtrans = `
        INSERT INTO Employee (
          employee_id, first_name, last_name, phone_number, email, 
          hire_date, dept_id, manager_id, salary, address, 
          birth_date, gender, image_url
        ) VALUES (
          '${newEmployee.employee_id}', '${newEmployee.first_name}', '${newEmployee.last_name}', '${newEmployee.phone_number}', '${newEmployee.email}',
          '${newEmployee.hire_date}', '${newEmployee.dept_id}', '${newEmployee.manager_id}', '${newEmployee.salary}', '${newEmployee.address}',
          '${newEmployee.birth_date}', '${newEmployee.gender}', '${newEmployee.image_url}'
        )
      `;
    
      // Sending the query to the backend
      try {
        await axios.post('http://localhost:3000/api/sql-connect', { customQuery: addtrans });
        const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: 'SELECT * FROM Employee' });
        setEmployees(response.data);
        Alert("Employee Added");
      } catch (error) {
        alert("Employee ID must be unique");
      }
    }
    else
    {
      const updatetrans = `Update Employee set first_name = '${newEmployee.first_name}',last_name = '${newEmployee.last_name}',phone_number = '${newEmployee.phone_number}',email = '${newEmployee.email}',
          hire_date = '${newEmployee.hire_date}', dept_id ='${newEmployee.dept_id}', manager_id = '${newEmployee.manager_id}', salary = '${newEmployee.salary}', address ='${newEmployee.address}',
          birth_date = '${newEmployee.birth_date}', gender = '${newEmployee.gender}', image_url = '${newEmployee.image_url}' where employee_id = '${newEmployee.employee_id}'`
      try {
        await axios.post('http://localhost:3000/api/sql-connect', { customQuery: updatetrans });
        const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: 'SELECT * FROM Employee' });
        setEmployees(response.data);
        alert('Details Update');
      } catch (error) {
        alert("Employee ID does not exist");
      }
    }
  };
  const removeEmployee = () => {
    const removetrans = "delete from Employee where employee_id = "+removeId;
    const removeTransactions = async () => {
      try {
          await axios.post('http://localhost:3000/api/sql-connect', { customQuery: removetrans });
          setEmployees(response.data);
          alert('Employee Removed');
      } catch (error) {
          console.error('Error fetching transactions:', error);
          alert('Id not found');
        }
      };
    removeTransactions();
    setRemoveId('');
  };
  return (
    <div style={styles.body}>
      <div style = {styles.bodyfilter}>
        <header style={styles.header}>
            <img src = {logo} style={styles.logo}></img>
            <div className="buttons">
            <button style = {styles.Customerbutton} onClick={toCustomer} onMouseEnter={handleCustomerMouseHover} onMouseLeave={handleCustomerMouseLeave}>Customer</button>
              <button style = {styles.Warehousebutton} onClick={toWarehouse} onMouseEnter={handleWarehouseMouseHover} onMouseLeave={handleWarehouseMouseLeave}>Warehouse</button>
            </div>
            <div style={styles.userInfo}>
              <span style={styles.userAvatar}>{user[0].username}</span>
            </div>
    </header>
      {!showForm && (
      <div style={styles.container}>
      <div style={styles.headerbottom}>
        <button 
          onClick={() => {
            setShowForm(true); 
            setAddUpdate(false);}} 
          style={styles.addButton}
        >
          Add Employee
        </button>
        <div style={styles.removeInputContainer}>
        <input
          type="text"
          value={removeId}
          onChange={(e) => setRemoveId(e.target.value)}
          placeholder="Enter Employee ID"
          style={styles.removeInput}
        />
        <button 
          onClick={removeEmployee}
          style={styles.removeButton}
        >
          Remove Employee
        </button>
    </div>
        <button 
          onClick={() => {
            setShowForm(true); 
            setAddUpdate(true);}} 
          style={styles.addButton}
        >
          Update Employee
        </button>
      </div>
      </div>)}
      {showForm && (
        <>
        <div style={styles.container}>
        <EmployeeForm 
          onSubmit={addEmployee} 
          onCancel={() => setShowForm(false)} 
        />
        </div>
        </>
      )}
      <div style={styles.container}>
      <EmployeeList employees={employees} />
      </div>
      </div>
      </div>
  );
}

export default Employee;
