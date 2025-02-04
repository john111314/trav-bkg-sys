
import mysql from 'mysql2/promise'; // Import MySQL library

const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root', 
  password: '22_5_PI_16_4',
  database: 'trav_bkg_sys',
});

export async function POST(req) {
    const { email, password, userType } = await req.json();
  
    try {
        let query;
        let values;

        if (userType === 'admin') {
            query = 'SELECT * FROM admin_tb WHERE Email_ID = ? AND Password = ?';
        } else if (userType === 'travel_agent') {
            query = 'SELECT * FROM travel_agent_tb WHERE Email_ID = ? AND Password = ?';
        } else if (userType === 'customer') {
            query = 'SELECT * FROM customer_tb WHERE Email_ID = ? AND Password = ?';
        } else {
            return new Response(JSON.stringify({ message: 'Invalid user type.' }), { status: 400 });
        }

        values = [email, password];

        const [rows] = await pool.query(query, values);

        if (rows.length > 0) {
            return new Response(JSON.stringify({ message: 'Login successful!' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'Invalid email or password.' }), { status: 401 });
        }
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
    }
}
