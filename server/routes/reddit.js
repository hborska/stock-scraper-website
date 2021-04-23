const express = require('express');
const router = express.Router();

const RedditStock = require('../models/RedditStock');
const sortByPosts = RedditStock.sortByPosts;
const sortByUpvotes = RedditStock.sortByUpvotes;
const sortByComments = RedditStock.sortByComments;

//Eventually make new routes for diff time frames and diff sorts (4hr route, 24 hr, 5 days)
router.get('/', async (req, res) => {
  //change to /posts later
  try {
    const stocks = await sortByPosts;
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
