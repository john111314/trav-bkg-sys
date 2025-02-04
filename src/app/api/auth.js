const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation
const db = require('./db'); // Your database connection

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;

    // Determine the table based on userType
    let userTable;
    let userIdField; // To store the field name for user ID

    if (userType === 'admin') {
        userTable = 'admin_tb';
        userIdField = 'Admin_Id'; // Assuming this is the primary key for admin
    } else if (userType === 'travel_agent') {
        userTable = 'travel_agent_tb';
        userIdField = 'Travel_Agent_Id'; // Assuming this is the primary key for travel agents
    } else if (userType === 'customer') {
        userTable = 'customer_tb';
        userIdField = 'Customer_Id'; // Assuming this is the primary key for customers
    } else {
        return res.status(400).json({ message: 'Invalid user type' });
    }

    try {
        // Query to find the user by email
        const userQuery = `SELECT * FROM ${userTable} WHERE Email_ID = ?`; // Ensure this matches your DB schema
        db.query(userQuery, [email], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = results[0];

            // Compare the password with the hashed password in the database
            const match = await bcrypt.compare(password, user.Password); // Ensure this matches your DB schema
            if (!match) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: user[userIdField], email: user.Email_ID }, 'your_jwt_secret', { expiresIn: '1h' });

            // Return success response with token
            res.json({ message: 'Login successful', token });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
