"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation'; 

export default function Cust_Registration() {
    const router = useRouter(); 

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 
        let isValid = true;

        const firstNameInput = document.getElementById("first_name") as HTMLInputElement;
        const lastNameInput = document.getElementById("last_name") as HTMLInputElement;
        const emailInput = document.getElementById("email") as HTMLInputElement;
        const phoneInput = document.getElementById("mobile") as HTMLInputElement;
        const addressInput = document.getElementById("address") as HTMLTextAreaElement;
        const genderSelect = document.getElementById("gender") as HTMLSelectElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;

        // Validate inputs (same validation logic as before)
        if (!firstNameInput || !lastNameInput || !emailInput || !phoneInput ||
            !addressInput || !genderSelect || !passwordInput) {
            console.error('One or more form elements are missing.');
            return; // Exit the function if any input is missing
        }

        // Get values from the inputs
        let firstName = firstNameInput.value.trim();
        let lastName = lastNameInput.value.trim();
        let email = emailInput.value.trim();
        let phone = phoneInput.value.trim();
        let address = addressInput.value.trim();
        let gender = genderSelect.value;
        let password = passwordInput.value.trim();

        // Clear previous error messages
        document.querySelectorAll(".error").forEach(e => e.textContent = "");

        // Name Validation
        const regex = /^[A-za-z]{1,50}$/;
        
        if (!regex.test(firstName)) {
            document.getElementById("firstNameError")!.textContent = "First name must contain only aplhabets.";
            isValid = false;
        }
        if (!regex.test(lastName)) {
            document.getElementById("lastNameError")!.textContent = "Last name must contain only aplhabets.";
            isValid = false;
        }

        // Email Validation
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            document.getElementById("emailError")!.textContent = "Enter a valid email address.";
            isValid = false;
        }

        // Phone Validation
        let phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            document.getElementById("mobileError")!.textContent = "Enter a valid 10-digit phone number.";
            isValid = false;
        }

        // Address Validation
        if (address === "") {
            document.getElementById("addressError")!.textContent = "Address is required.";
            isValid = false;
        }

        // Gender Validation
        if (gender === "") {
            document.getElementById("genderError")!.textContent = "Please select your gender.";
            isValid = false;
        }

        // Password Validation
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            document.getElementById("passwordError")!.textContent = "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, and a number.";
            isValid = false;
        }
        
       // If validation passes
       if (isValid) {
           try {
               const response = await fetch('/api/registration/customer', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({
                       first_name: firstNameInput.value.trim(),
                       last_name: lastNameInput.value.trim(),
                       email: emailInput.value.trim(),
                       mobile: phoneInput.value.trim(),
                       address: addressInput.value.trim(),
                       gender: genderSelect.value,
                       password: passwordInput.value.trim(),
                   }),
               });

               if (!response.ok) {
                   const errorText = await response.text();
                   console.error('Error response:', errorText);
                   throw new Error('Registration failed');
               }

               const data = await response.json();
               document.getElementById("message")!.textContent = data.message;
               document.getElementById("message")!.style.color = "green";
               (document.getElementById("registrationForm") as HTMLFormElement).reset();

           } catch (error) {
               console.error('Error during registration:', error);
               document.getElementById("message")!.textContent = 'An error occurred. Please try again.';
               document.getElementById("message")!.style.color = "red";
           }
       } else {
           // Handle validation failure
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
                 height: 125vh;
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
                position: relative;
                 color: #333;
                 margin-top: 20px;
                 margin-bottom: 20px;
             }
             label {
                 display: block;
                 text-align: left;
                 margin: 10px 0 5px;
                 font-weight: bold;
             }
             input, select, textarea {
                 width: 100%;
                 padding: 0.5rem;
                 border: 1px solid #ccc;
                 border-radius: 5px;
                 margin-bottom: 10px;
             }
             button {
                 background-color: #28a745;
                 color: white;
                 padding: 10px;
                 border: none;
                 width: 100%;
                 cursor: pointer;
                 border-radius: 5px;
                 font-size: 16px;
             }
             button:hover {
                 background-color: #218838;
             }
             .error {
                 color: red; 
                 font-size: 14px; 
                 margin-bottom: 5px; 
                 text-align: left; 
             }
             #message {
                 margin-top: 15px; 
                 color: green; 
                 font-weight: bold; 
             }
         `}</style>
         <h2>Customer Registration</h2>
         <form id="registrationForm" onSubmit={handleSubmit}>
             <label htmlFor="first_name">First Name:</label>
             <input type="text" id="first_name" name="first_name" />
             <div className="error" id="firstNameError"></div>
            
             <label htmlFor="last_name">Last Name:</label>
             <input type="text" id="last_name" name="last_name" />
             <div className="error" id="lastNameError"></div>

             <label htmlFor="email">Email_ID:</label>
             <input type="email" id="email" name="email" />
             <div className="error" id="emailError"></div>

             <label htmlFor="mobile">Mobile_No:</label>
             <input type="tel" id="mobile" name="mobile" />
             <div className="error" id="mobileError"></div>

             <label htmlFor="address">Address:</label>
             <textarea id="address" name="address" rows={3}></textarea>
             <div className="error" id="addressError"></div>

             <label htmlFor="gender">Gender:</label>
             <select id="gender" name="gender">
                 <option value="">Select Gender</option>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
             </select>
             <div className="error" id="genderError"></div>

             <label htmlFor="password">Password:</label>
             <input type="password" id="password" name="password" />
             <div className="error" id="passwordError"></div>

             <button type="submit">Register</button>
         </form>
         <p id="message"></p>
     </div>
   );
}
