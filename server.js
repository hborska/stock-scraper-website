const express = require('express');
const dbConnection = require('./server/database/connection');
const dotenv = require('dotenv');
// const path = require('path'); //for production

const app = express();

//Database connection
dbConnection();

//Middleware
app.use(express.json({ extended: false }));
dotenv.config({ path: '.env' });

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the Stock Scraper API' });
});

//Defining routes
app.use('/api/reddit', require('./server/routes/reddit'));
// app.use('/twitter', require('./server/routes/twitter'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
