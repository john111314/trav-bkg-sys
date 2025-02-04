import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db'; // Adjust the import path as necessary
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    const { first_name, last_name, email, mobile, address, gender, password } = await req.json();

    // Validate input fields
    if (!first_name || !last_name || !email || !mobile || !address || !gender || !password) {
        return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Hash the password before storing it
    const registrationDate = new Date();
    const lastLoginDate = null; 

    const sql = `
        INSERT INTO customer_tb (First_Name, Last_Name, Mobile_No, Email_ID, Password, Address, Gender, Registration_Date, Last_Login)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    try {
        await db.query(sql, [first_name, last_name, mobile, email, password, address, gender.charAt(0), registrationDate, lastLoginDate]);
        return NextResponse.json({ message: 'Registration successful!' }, { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ message: 'Error registering travel agent.' }, { status: 500 });
    }
}
