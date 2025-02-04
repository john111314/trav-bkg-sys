// src/app/api/register.js

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db'); // Adjust path as necessary

const router = express.Router();

// Registration route for travel agents
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, mobileNo, address, gender, licenseNo } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password || !mobileNo || !address || !gender || !licenseNo) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if the email already exists
        const existingUserQuery = 'SELECT * FROM travel_agent_tb WHERE Email_ID = ?';
        db.query(existingUserQuery, [email], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already exists.' });
            }

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new travel agent into the database
            const insertQuery = 'INSERT INTO travel_agent_tb (First_Name, Last_Name, Mobile_No, Email_ID, Password, Address, Gender, License_No, Registration_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())';
            db.query(insertQuery, [firstName, lastName, mobileNo, email, hashedPassword, address, gender.charAt(0), licenseNo], (err) => {
                if (err) return res.status(500).json({ message: 'Error saving user.' });
                
                res.status(201).json({ message: 'Registration successful!' });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during registration.' });
    }
});

module.exports = router;
