import fetch from 'node-fetch';
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

const urls = [
  { url: 'https://userbackend-4o9x.onrender.com/', interval: 600000 },
  { url: 'https://movie-recommender-0yro.onrender.com', interval: 600000 } 
];

const pingServer = async (url) => {
  try {
    console.info(`Sending request to ${url} at ${new Date().toLocaleTimeString()}`);
    const response = await fetch(url);
    if (response.ok) {
      console.log(`Server at ${url} responded with status: ${response.status} at ${new Date().toLocaleTimeString()}`);
    } else {
      console.error(`Server at ${url} returned an error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to reach server at ${url}: ${error.message}`);
  }
};

// Set up intervals to ping each server
urls.forEach(({ url, interval }) => {
  pingServer(url); // Initial ping
  setInterval(() => pingServer(url), interval); // Repeat at specified interval
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
