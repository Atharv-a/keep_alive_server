import fetch from 'node-fetch';
import cron from 'node-cron';

const endpoints = [
  { url: 'https://userbackend-4o9x.onrender.com', schedule: '*/10 * * * *' }, // Every 10 minutes
  { url: 'https://movie-recommender-0yro.onrender.com', schedule: '*/10 * * * *' } 
];

const pingServer = async (url) => {
  try {
    console.info(`Attempting to ping ${url} at ${new Date().toLocaleTimeString()}`);
    const response = await fetch(url);
    if (response.ok) {
      console.log(`Success: ${url} responded with status ${response.status} at ${new Date().toLocaleTimeString()}`);
    } else {
      console.warn(`Warning: ${url} responded with status ${response.status}`);
    }
  } catch (error) {
    console.error(`Error pinging ${url}: ${error.message}`);
  }
};


endpoints.forEach(({ url, schedule }) => {
  cron.schedule(schedule, () => pingServer(url), { timezone: 'UTC' });
});
