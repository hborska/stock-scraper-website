const express = require('express');
const dbConnection = require('./server/database/connection');
const dotenv = require('dotenv');
const path = require('path'); //for production

const app = express();

//Database connection
dbConnection();

//Middleware
app.use(express.json({ extended: false }));

//Configuring environment variables
dotenv.config({ path: '.env' });

//Defining routes
app.use('/api/reddit', require('./server/routes/reddit'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
