require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const registerRoute = require('./api/register'); // Adjust path as necessary

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password, userType } = req.body;
    let table;

    switch(userType) {
        case 'admin':
            table = 'admin_tb';
            break;
        case 'travel_agent':
            table = 'travel_agent_tb';
            break;
        case 'customer':
            table = 'customer_tb';
            break;
        default:
            return res.status(400).json({ message: 'Invalid user type' });
    }

    const query = `SELECT * FROM ${table} WHERE Email_ID = ? AND Password = ?`;
    
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Use the registration route
app.use('/api', registerRoute); // Prefix all routes with /api

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
