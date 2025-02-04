// src/app/api.js

// Import necessary modules
const fetch = require('node-fetch'); // Ensure you have node-fetch installed

// Define the API endpoint
const API_URL = 'https://your-api-endpoint.com/data'; // Replace with your actual API URL

// Function to fetch data from the API
const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    
    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    const data = await response.json(); // Parse JSON data
    return data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching data:', error); // Log any errors
    throw error; // Rethrow error for further handling if needed
  }
};

// Export the fetchData function for use in other parts of the application
module.exports = {
  fetchData,
};
