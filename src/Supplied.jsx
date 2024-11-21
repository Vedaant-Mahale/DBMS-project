import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import SuppliedForm from './SuppliedForm';

function Supplied() {
    const location = useLocation();
    const user = location.state?.user;
    const [transactions, setTransactions] = useState([]);
    const [isemployeehovering, setIsEmployeeHovering] = useState(false);
    const [isCustomerhovering, setIsCustomerHovering] = useState(false);
    const [amount,setAmount] = useState([]);
    const [showForm,setShowForm] = useState(false);
    const [removeId,setRemoveId] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchTransactions = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select * from Supplies" });
            setTransactions(response.data);
            console.log(response.data);
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
      const handleaddclick = () =>
      {
        setShowForm(true);
      }
      const removeSupplied = async () =>
      {
        const checkbatch = await axios.post('http://localhost:3000/api/sql-connect',{ customQuery: "select * from Supplies where batch_id = "+removeId})
        const removesupp = 'delete from supplies where batch_id = '+removeId;
        if(checkbatch.data.length === 0)
        {
          alert('This batch does not exist');
        }
        else
        {
          await axios.post('http://localhost:3000/api/sql-connect',{customQuery: removesupp})
          try
          {
            const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select * from Supplies" });
            setTransactions(response.data);
            const amounttrans = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select sum(quantity) as t_amount from Item" });
            setAmount(amounttrans.data[0]);
          }
          catch (error) 
          {
            console.error('Error fetching transactions:', error);
          }
        }
      }
      const addTransaction = async (supplies) =>
      {
        const checkitem = await axios.post('http://localhost:3000/api/sql-connect',{ customQuery: "select * from Supplies where Item_id = "+supplies.item_id});
        const addsupp = `Insert into Supplies(Supplier_id,Item_id,Batch_id,quantity,expired,supplied_date) values(${supplies.supplier_id},${supplies.item_id},${supplies.batch_id},${supplies.quantity},0,'${supplies.supplied_date}')`;
        if(checkitem.data.length === 0)
        {
          alert('This Item does not exist');
        }
        else
        {
          await axios.post('http://localhost:3000/api/sql-connect',{ customQuery: addsupp});
          try
          {
            const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select * from Supplies" });
            setTransactions(response.data);
            const amounttrans = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: "Select sum(quantity) as t_amount from Item" });
            setAmount(amounttrans.data[0]);
          }
          catch (error) 
          {
            console.error('Error fetching transactions:', error);
          }
        }
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
      },
        header: {
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          height:'70px',
          backgroundColor: '#0072ff',
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
          backgroundColor: isemployeehovering? '#0072ff':'white',
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
          backgroundColor: isCustomerhovering? '#0072ff':'white',
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
        transactionsHeader: {
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '5px',
          width: '178px',
          margin: '30px',
          fontSize: '18px',
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
        tableCell: {
          borderRadius: '5px',
          backgroundColor: 'white',
          paddingTop: '20px',
          paddingBottom: '20px',
          fontWeight: 'none',
        },
        transactions: {
          display:'flex',
          justifyContent:'center',
        }
      };
      return (
        <div style={styles.body}>
          <div style = {styles.bodyfilter}>
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
                onClick={removeSupplied}
              >
                Remove Transaction
              </button>
            </div>
          </div>)}
          {showForm && (
          <>
            <div style={styles.container}>
              <SuppliedForm
                onSubmit={addTransaction}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </>
        )}
          <div style = {styles.newheader}>
          </div>
          <h2 style={styles.transactionsHeader}>Recent Transactions</h2>
          <section style = {styles.transactions}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.thleft}>Batch ID</th>
                  <th style={styles.th}>Item ID</th>
                  <th style={styles.thright}>Quantity</th>
                </tr>
              </thead>
            <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.buy_id}>
                <th style={styles.thleft}>{transaction.Batch_id}</th>
                <th style={styles.th}>{transaction.Item_id}</th>
                <th style={styles.thright}>{transaction.quantity}</th>
              </tr>
            ))}
          </tbody>
            </table>
          </section>
        </div>
        </div>
      );
}

export default Supplied