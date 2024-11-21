import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import CustomerForm from './CustomerForm.jsx';

function Homepage() {
  const location = useLocation();
  const user = location.state?.user;
  const [transactions, setTransactions] = useState([]);
  const [isemployeehovering, setIsEmployeeHovering] = useState(false);
  const [iswarehousehovering, setIsWarehouseHovering] = useState(false);
  const [sales, setSales] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [removeId, setRemoveId] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select * from Buy" });
        setTransactions(response.data);
      }
      catch (error) {
        console.error('Error fetching transactions:', error);
      }
      try {
        const salesresponse = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select sum(quantity) as sales from Buy" });
        setSales(salesresponse.data[0]);
        console.log(sales);
      }
      catch (error) {
        console.error('Error fetching transactions:', error);
      }
      try {
        const customerresponse = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select count(distinct customer_id) as u_customer from Buy" });
        setCustomer(customerresponse.data[0]);
      }
      catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);
  const toEmployee = () => {
    navigate('/employee', { state: { user: user } });
  }
  const toWarehouse = () => {
    navigate('/supplied', { state: { user: user } });
  }
  const handleEmployeeMouseHover = () => {
    setIsEmployeeHovering(true);
  }
  const handleEmployeeMouseLeave = () => {
    setIsEmployeeHovering(false);
  }
  const handleWarehouseMouseHover = () => {
    setIsWarehouseHovering(true);
  }
  const handleWarehouseMouseLeave = () => {
    setIsWarehouseHovering(false);
  }
  const handleaddclick = () => {
    setShowForm(true);
  }
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const addTransaction = async (newTransaction) => {
    console.log(newTransaction);
    const addtrans = `insert into Buy(buy_id,customer_id,batch_id,item_id,quantity,purchase_date) values(NULL,${newTransaction.customer_id},${newTransaction.batch_id},${newTransaction.item_id},${newTransaction.quantity},'${newTransaction.purchase_date}')`;
    const checkbatch = await axios.post('http://localhost:3000/api/sql-connect',{ customQuery: 'select quantity from Supplies where batch_id = ' + newTransaction.batch_id});
    if (checkbatch.data.length === 0) {
      alert("This Batch Does not Exist")
    }
    else if (checkbatch.data[0] < newTransaction.quantity) {
      alert("This Batch Does not have enough Quantity");
    }
    else {
      try {
        await axios.post('http://localhost:3000/api/sql-connect', { customQuery: addtrans });
        const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select * from Buy" });
        setTransactions(response.data);
      }
      catch {
        console.error('Error fetching transactions:', error);
        alert("An Unknown Error has Occurred");
      }
    }
  }
  const removeTransaction = async () => {
    const removetrans = "delete from buy where buy_id = " + removeId;
    const checkbatch = await axios.post('http://localhost:3000/api/sql-connect', { customQuery:'select * from buy where buy_id = '+removeId});
    console.log(checkbatch.data[0].batch_id);
    console.log('select quantity from Supplies where batch_id = '+checkbatch.data[0].batch_id)
    const checksupply = await axios.post('http://localhost:3000/api/sql-connect', { customQuery:'select quantity from Supplies where batch_id = '+checkbatch.data[0].batch_id});
    if (checkbatch.data.length === 0)
    {
      console.error('Error fetching transactions:', error);
      alert("This Transaction does not exist");
    }
    else if(checksupply.data.length === 0)
    {
      alert('This Batch was depleted in the warehouse, please ask an administrator to manually add the batch');
    }
    else
    {
      try{
      await axios.post('http://localhost:3000/api/sql-connect', { customQuery: removetrans });
      const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select * from Buy" });
      setTransactions(response.data);
      }
      catch{
        console.error('Error fetching transactions:', error);
        alert('An unknown Error has Occurred')
      }
    }
  }
  const handleFilter = async () =>
  {
      const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select * from Buy where purchase_date > curdate() - INTERVAL "+selectedOption+" DAY" });
      setTransactions(response.data);
  }
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      height: '100%',
    },
    bodyfilter: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: '100%',
    },
    header: {
      zIndex: '10',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      height: '70px',
      backgroundColor: '#0072ff',
    },
    container: {
      zIndex: '10',
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      color: '#333',
      borderRadius: '10px',
    },
    newheader: {
      zIndex: '10',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      height: '70px',
      borderRadius: '10px',
    },
    Employeebutton: {
      backgroundColor: isemployeehovering ? '#0072ff' : 'white',
      color: isemployeehovering ? 'white' : 'black',
      fontWeight: 'bold',
      padding: '10px',
      fontFamily: '20px',
      width: '100px',
      borderRadius: '20px',
      border: 'solid white 2px',
      pointer: 'cursor',
      transition: 'background-color 0.1s ease-in',
      margin: '20px',
    },
    Warehousebutton: {
      backgroundColor: iswarehousehovering ? '#0072ff' : 'white',
      color: iswarehousehovering ? 'white' : 'black',
      fontWeight: 'bold',
      padding: '10px',
      fontFamily: '20px',
      width: '100px',
      borderRadius: '20px',
      border: 'solid white 2px',
      pointer: 'cursor',
      transition: 'background-color 0.1s ease-in',
      margin: '20px',
    },
    logo: {
      width: '60px',
      filter: 'invert(1)',
      margin: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    userAvatar: {
      backgroundColor: 'white',
      borderRadius: '5px',
      margin: '10px',
      fontWeight: 'bold',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    addButton: {
      backgroundColor: '#0072ff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      marginLeft: '30px',
      marginRight: '30px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    removeInputContainer: {
      display: 'flex',
      marginRight: '30px',
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
    stats: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      flex: '1',
      margin: '0 10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    statCardTitle: {
      fontSize: '16px',
      color: '#0072ff',
    },
    amount: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    transactionsHeader: {
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '5px',
      width: '178px',
      margin: '30px',
      fontSize: '18px',
    },
    filterdropdown: {
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '18px',
    },
    filterbutton: {
      backgroundColor: '#0072ff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      marginRight: '30px',
      borderRadius: '5px',
      cursor: 'pointer',
      width:'100px',
      height: '40px',
      transition: 'background-color 0.3s',
    },
    table: {
      paddingLeft: '25px',
      paddingRight: '25px',
      borderSpacing: '0 10px',
      width: '100%',
    },
    trstyle: {
      padding: '20px',
      backgroundColor: 'white',
      fontSize: '18px',
    },
    thleft: {
      width: '20%',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '5px 0 0 5px',
      borderLeft: '2px #0072ff solid',
      borderTop: '2px #0072ff solid',
      borderBottom: '2px #0072ff solid',
    },
    th: {
      width: '20%',
      padding: '20px',
      backgroundColor: 'white',
      borderTop: '2px #0072ff solid',
      borderBottom: '2px #0072ff solid',
    },
    thright: {
      width: '20%',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '0 5px 5px 0',
      borderRight: '2px #0072ff solid',
      borderTop: '2px #0072ff solid',
      borderBottom: '2px #0072ff solid',
    },
    tableHeader: {
      width: '20%',
      color: '#0072ff',
      padding: '20px',
      fontWeight: 'bold',
      backgroundColor: 'white',
    },
  };
  return (
    <div style={styles.body}>
      <div style={styles.bodyfilter}>
        <header style={styles.header}>
          <img src={logo} style={styles.logo}></img>
          <div className="buttons">
            <button style={styles.Employeebutton} onClick={toEmployee} onMouseEnter={handleEmployeeMouseHover} onMouseLeave={handleEmployeeMouseLeave}>Employee</button>
            <button style={styles.Warehousebutton} onClick={toWarehouse} onMouseEnter={handleWarehouseMouseHover} onMouseLeave={handleWarehouseMouseLeave}>Warehouse</button>
          </div>
          <div style={styles.userInfo}>
            <span style={styles.userAvatar}>{user[0].username}</span>
          </div>
        </header>
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h3 style={styles.statCardTitle}>Total Sales</h3>
            <p style={styles.amount}>${sales.sales}</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statCardTitle}>Active Customers</h3>
            <p style={styles.amount}>{customer.u_customer}</p>
          </div>
        </div>
        {!showForm && (
          <div style={styles.newheader}>
            <button
              style={styles.addButton}
              onClick={handleaddclick}
            >
              Add Transaction
            </button>
            <div style={styles.removeInputContainer}>
              <input
                type="text"
                value={removeId}
                onChange={(e) => setRemoveId(e.target.value)}
                placeholder="Enter Transaction ID"
                style={styles.removeInput}
              />
              <button
                style={styles.removeButton}
                onClick={removeTransaction}
              >
                Remove Transaction
              </button>
            </div>
          </div>)}
        {showForm && (
          <>
            <div style={styles.container}>
              <CustomerForm
                onSubmit={addTransaction}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </>
        )}
        <div style={styles.newheader}>
        <h2 style={styles.transactionsHeader}>Recent Transactions</h2>
        <div>
        <select id="options" style = {styles.transactionsHeader} value={selectedOption} onChange={handleChange}>
          <option value="">--Select an option--</option>
          <option value="1">Today</option>
          <option value="30">This Month</option>
          <option value="365">This Year</option>
        </select>
        <button style = {styles.filterbutton} onClick={handleFilter}>Filter</button>
      </div>

        </div>
        <section className="transactions">
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.thleft}>Transaction ID</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Batch ID</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.thright}>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.buy_id}>
                  <th style={styles.thleft}>{transaction.buy_id}</th>
                  <th style={styles.th}>{transaction.customer_id}</th>
                  <th style={styles.th}>{transaction.batch_id}</th>
                  <th style={styles.th}>{transaction.quantity}</th>
                  <th style={styles.thright}>{transaction.purchase_date}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Homepage