import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Homepage() {
    const location = useLocation();
    const user = location.state?.user;
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const fetchtrans = "Select * from Buy";
        const fetchTransactions = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/sql-connect', { customQuery: fetchtrans });
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
          }
        };
        fetchTransactions();
      }, []);
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
          backgroundColor: 'white'
        },
        logo: {
          margin:'20px',
          fontSize: '24px',
          fontWeight: 'bold',
        },
        searchInput: {
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
        },
        userInfo: {
          display: 'flex',
          alignItems: 'center',
        },
        userAvatar: {
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
          margin: '20px',
          fontSize: '18px',
        },
        table: {
          borderRadius:'20px',
          width: '100%',
        },
        tableHeader: {
          width:'25%',
          backgroundColor: 'white',
          padding: '20px',
          borderBottom: '1px solid #ddd',
          fontWeight: 'bold',
        },
        tableCell: {
          borderBottom: '1px solid #ddd',
          paddingTop: '10px',
          paddingBottom: '10px',
          fontWeight: 'none'
        },
      };
      return (
        <div style={styles.dashboard}>
          <header style={styles.header}>
            <div style={styles.logo}>StoreFlow</div>
            <div className="search">
              <input type="text" placeholder="Search..." style={styles.searchInput} />
            </div>
            <div style={styles.userInfo}>
              <span style={styles.userAvatar}>{user[0].username}</span>
            </div>
          </header>
    
          <div style={styles.stats}>
            <div style={styles.statCard}>
              <h3 style={styles.statCardTitle}>Today's Sales</h3>
              <p style={styles.amount}>$4,890</p>
              <p style={styles.percentage}>+14.5% from yesterday</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statCardTitle}>Active Customers</h3>
              <p style={styles.amount}>1,234</p>
              <p style={styles.percentage}>+7.2% this week</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statCardTitle}>Total Inventory</h3>
              <p style={styles.amount}>892</p>
              <p style={styles.lowStock}>45 items low in stock</p>
            </div>
          </div>
          <section className="transactions">
            <h2 style={styles.transactionsHeader}>Recent Transactions</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Transaction ID</th>
                  <th style={styles.tableHeader}>Customer</th>
                  <th style={styles.tableHeader}>Items</th>
                </tr>
              </thead>
            <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.buy_id}>
                <th style={styles.tableCell}>{transaction.buy_id}</th>
                <th style={styles.tableCell}>{transaction.customer_id}</th>
                <th style={styles.tableCell}>{transaction.quantity}</th>
              </tr>
            ))}
          </tbody>
            </table>
          </section>
        </div>
      );
}

export default Homepage