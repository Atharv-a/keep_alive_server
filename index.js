import fetch from 'node-fetch';
import express from 'express';

const app = express();

const port = process.env.PORT || 3000; 

const url = 'https://userbackend-4o9x.onrender.com/';
const interval = 40000; // 40 seconds

const pingServer = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log(`Server responded with status: ${response.status} at ${new Date().toLocaleTimeString()}`);
    } else {
      console.log(`Server error: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to reach server:', error.message);
  }
};

// Ping the server initially and then every 40 seconds
pingServer();
setInterval(pingServer, interval);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
