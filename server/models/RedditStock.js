const mongoose = require('mongoose');

//Modeling stocks coming in from MongoDB, so no need to specify Schema structure here
const RedditStock = mongoose.model(
  'RedditStock',
  new mongoose.Schema({}),
  'topstocks'
);

module.exports = RedditStock;
