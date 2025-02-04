'use client'; 
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

export default function Login() {
    const router = useRouter(); // Initialize the router

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        let isValid = true;

        const emailInput = document.getElementById("email") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;
        const userTypeSelect = document.getElementById("userType") as HTMLSelectElement;

        if (!emailInput || !passwordInput || !userTypeSelect) {
            console.error('One or more form elements are missing.');
            return; 
        }

        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();
        let userType = userTypeSelect.value;

        document.querySelectorAll(".error").forEach(e => e.textContent = "");

        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            document.getElementById("emailError")!.textContent = "Enter a valid email address.";
            isValid = false;
        }

        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            document.getElementById("passwordError")!.textContent = "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, and a number.";
            isValid = false;
        }

        if (userType === "") {
            document.getElementById("userTypeError")!.textContent = "Please select a user type.";
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, userType }),
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error('Error response:', errorData);
                    document.getElementById("message")!.textContent = "Error: " + errorData; 
                    document.getElementById("message")!.style.color = "red";
                    return;
                }

                const data = await response.json();

                // Redirect to another page after successful login
                document.getElementById("message")!.textContent = `🎉 Login Successful! User Type: ${userType}`;
                document.getElementById("message")!.style.color = "green";
                (document.getElementById("loginForm") as HTMLFormElement).reset();

                // Redirect based on user type
                if (userType === 'admin') {
                    router.push('/admin/dashboard'); // Redirect to admin dashboard
                } else if (userType === 'travel_agent') {
                    router.push('/agent/dashboard'); // Redirect to travel agent dashboard
                } else if (userType === 'customer') {
                    router.push('/customer/dashboard'); // Redirect to customer dashboard
                }

            } catch (error) {
                console.error('Error during login:', error);
                document.getElementById("message")!.textContent = "An error occurred. Please try again later.";
                document.getElementById("message")!.style.color = "red";
            }
        } else {
            document.getElementById("message")!.textContent = "";
        }
    };

    return (
      <div className="container">
        <style>{`
              body {
                  font-family: Arial, sans-serif;
                  background: #f4f4f4;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
              }
              .container {
                  width: 350px;
                  background: white;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                  text-align: center;
              }
              h2 {
                  color: #333;
                  margin-bottom: 20px;
              }
              label {
                  display: block;
                  text-align: left;
                  margin: 10px 0 5px;
                  font-weight: bold;
              }
              input, select {
                  width: 100%;
                  padding: 0.5rem;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  margin-bottom: 10px;
              }
              button {
                  background-color: #218838;
                  color: white;
                  padding: 10px;
                  border: none;
                  width: 100%;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 16px;
              }
              button:hover {
                  background-color: #1e7e34;
              }
              .error {
                  color: red;
                  font-size: 14px;
                  margin-bottom: 5px; 
                  text-align: left; 
              }
              .forgot-password {
                  display: flex; 
                  justify-content: space-between; 
                  font-size: 14px; 
              }
              .forgot-password a, .login a {
                  text-decoration: none; 
                  color: #218838; 
              }
              .forgot-password a:hover { 
                  text-decoration: underline; 
              }
              #message { 
                  margin-top: 15px; 
                  color: green; 
                  font-weight: bold; 
              }
          `}</style>
          <h2>Login</h2>
          <form id="loginForm" onSubmit={handleSubmit}>
              <label htmlFor="email">Email_ID:</label>
              <input type="email" id="email" name="email" />
              <div className="error" id="emailError"></div>

              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" />
              <div className="error" id="passwordError"></div>

              <label htmlFor="userType">User Type:</label>
              <select id="userType" name="userType">
                  <option value="">Select User Type</option>
                  <option value="admin">Admin</option>
                  <option value="travel_agent">Travel Agent</option>
                  <option value="customer">Customer</option>
              </select>
              <div className="error" id="userTypeError"></div>
              <button type="submit">Login</button>
              <br></br>
              <br></br>

              <p className="login">Don't have an account? <Link href="/registration">Register here</Link></p>
              <br></br>
              <div className="forgot-password">
                  <a href="#" id="forgotPasswordLink">Forgot Password?</a>
                  <a href="#" id="changePasswordLink">Change Password</a>
              </div>
          </form>

          <p id="message"></p>
      </div>     
    );
}
