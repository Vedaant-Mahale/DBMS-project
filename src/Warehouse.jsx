import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';

function Customer() {
    const location = useLocation();
    const user = location.state?.user;
    const [transactions, setTransactions] = useState([]);
    const [isemployeehovering, setIsEmployeeHovering] = useState(false);
    const [isCustomerhovering, setIsCustomerHovering] = useState(false);
    const [amount,setAmount] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchTransactions = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select * from Item" });
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
          }
          try {
            const amounttrans = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select sum(quantity) as t_amount from Item" });
            setAmount(amounttrans.data[0]);
        } catch (error) {
            console.error('Error fetching transactions:', error);
          }
        };
        fetchTransactions();
      }, []);
      const toEmployee = () =>
      {
          navigate('/employee',{ state: { user: user } });
      }
      const toCustomer = () =>
      {
          navigate('/Customer',{state: { user:user}});
      }
      const handleEmployeeMouseHover = () => 
      {
        setIsEmployeeHovering(true);
      }
      const handleEmployeeMouseLeave = () =>
      {
        setIsEmployeeHovering(false);
      }
      const handleCustomerMouseHover = () =>
      {
        setIsCustomerHovering(true);
      }
      const handleCustomerMouseLeave = () =>
      {
        setIsCustomerHovering(false);
      }
    const styles = {
        dashboard: {
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#F5F5F5',
        },
        header: {
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          height:'70px',
          backgroundColor: '#AADDFF',
        },
        newheader: {
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          height:'70px',
        },
        Employeebutton: {
          backgroundColor: isemployeehovering? '#AADDFF':'white',
          color: isemployeehovering? 'white':'black',
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
        Customerbutton: {
          backgroundColor: isCustomerhovering? '#AADDFF':'white',
          color: isCustomerhovering? 'white':'black',
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
        logo: {
          width:'60px',
          filter: 'invert(1)',
          margin:'20px',
          fontSize: '24px',
          fontWeight: 'bold',
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
          color: '#555',
        },
        amount: {
          fontSize: '24px',
          fontWeight: 'bold',
        },
        percentage: {
          color: '#2ecc71',
        },
        lowStock: {
          color: '#e74c3c',
        },
        transactionsHeader: {
          margin: '30px',
          fontSize: '18px',
        },
        table: {
          paddingLeft:'25px',
          paddingRight:'25px',
          borderSpacing: '0 10px',
          width: '100%',
        },
        tableHeader: {
          borderRadius: '5px',
          width:'20%',
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '200px',
          fontWeight: 'bold',
        },
        tableCell: {
          borderRadius: '5px',
          backgroundColor: 'white',
          paddingTop: '20px',
          paddingBottom: '20px',
          fontWeight: 'none',
        },
      };
      return (
        <div style={styles.dashboard}>
          <header style={styles.header}>
            <img src = {logo} style={styles.logo}></img>
            <div className="buttons">
              <button style = {styles.Employeebutton} onClick={toEmployee} onMouseEnter={handleEmployeeMouseHover} onMouseLeave={handleEmployeeMouseLeave}>Employee</button>
              <button style = {styles.Customerbutton} onClick={toCustomer} onMouseEnter={handleCustomerMouseHover} onMouseLeave={handleCustomerMouseLeave}>Customer</button>
            </div>
            <div style={styles.userInfo}>
              <span style={styles.userAvatar}>{user[0].username}</span>
            </div>
          </header>
    
          <div style={styles.stats}>
            <div style={styles.statCard}>
              <h3 style={styles.statCardTitle}>Amount in Stock</h3>
              <p style={styles.amount}>{amount.t_amount}</p>
            </div>
          </div>
          <div style = {styles.newheader}>
          <h2 style={styles.transactionsHeader}>Recent Transactions</h2>
          </div>
          <section className="transactions">
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Batch ID</th>
                  <th style={styles.tableHeader}>Item ID</th>
                  <th style={styles.tableHeader}>Amount</th>
                </tr>
              </thead>
            <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.buy_id}>
                <th style={styles.tableCell}>{transaction.batch_id}</th>
                <th style={styles.tableCell}>{transaction.item_id}</th>
                <th style={styles.tableCell}>{transaction.quantity}</th>
              </tr>
            ))}
          </tbody>
            </table>
          </section>
        </div>
      );
}

export default Customer