import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies and handle CORS
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Allows requests from your React app

// MySQL Database Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'vedaant',
    password: 'retail',
    database: 'retail'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// API Route to handle custom query
app.post('/api/sql-connect', (req, res) => {
    const { customQuery } = req.body;

    // Execute the custom query
    connection.query(customQuery, (err, results) => {
        if (err) {
            console.error('Error executing the query:', err);
            return res.status(500).json({ error: 'Error executing query' });
        }
        res.json(results); // Send query results as JSON
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Close MySQL connection on process exit
process.on('SIGINT', () => {
    connection.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
        } else {
            console.log('Database connection closed.');
        }
        process.exit();
    });
});