'use client'; 
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegistrationType = () => {
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
                    margin: auto;
                    width: 350px;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                    text-align: center;
                }
                h2 {
                    color: #333;
                    margin-bottom: 40px;
                }
                h3 {
                    margin-bottom: 20px;
                }
                a {
                    text-decoration: none; 
                    color: #218838; 
                }
                a:hover { 
                    text-decoration: underline; 
                }
            `}</style>
            <h1>Register As: </h1>
            <br></br>
            <ul>
                <h3><Link href = "/registration/travelAgent">Travel Agent</Link></h3>
                <h3><Link href="/registration/customer">Customer</Link></h3>
            </ul>
        </div>     
    );
};

export default RegistrationType;