// src/app/dataFetcher.js

// Import the fetchData function from api.js
const { fetchData } = require('./api'); // Adjust path as necessary

// Function to get data from the API
const getData = async () => {
  try {
    const data = await fetchData(); // Call the fetchData function
    console.log(data); // Log the retrieved data
  } catch (error) {
    console.error('Failed to retrieve data:', error); // Handle errors
  }
};

// Execute the getData function
getData();
