const express = require('express');
const cors = require('cors');

const app = express();

// Use cors middleware with custom headers
app.use(cors({
  origin: 'http://localhost:8081', // Replace with your Vue.js app's origin
  methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Api-Key', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));

// Your other routes and middleware

const port = 61050;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
