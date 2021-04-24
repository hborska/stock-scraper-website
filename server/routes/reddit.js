const express = require('express');
const router = express.Router();

//Requiring our aggregated models
const RedditStock = require('../models/RedditStock');
const sortByPosts4 = RedditStock.sortByPosts4;
const sortByPosts24 = RedditStock.sortByPosts24;
const sortByPosts5Day = RedditStock.sortByPosts5Day;

const sortByUpvotes4 = RedditStock.sortByUpvotes4;
const sortByUpvotes24 = RedditStock.sortByUpvotes24;
const sortByUpvotes5Day = RedditStock.sortByUpvotes5Day;

const sortByComments4 = RedditStock.sortByComments4;
const sortByComments24 = RedditStock.sortByComments24;
const sortByComments5Day = RedditStock.sortByComments5Day;

//Route for /api/reddit on our API, exporting a model based on state in our React front end
router.get('/', async (req, res) => {
  let sortMethod = req.query.sortMethod;
  let timeFrame = req.query.timeFrame;
  try {
    if (sortMethod === 'posts') {
      if (timeFrame === '4') stocks = await sortByPosts4;
      if (timeFrame === '24') stocks = await sortByPosts24;
      if (timeFrame === '5') stocks = await sortByPosts5Day;
    }
    if (sortMethod === 'upvotes') {
      if (timeFrame === '4') stocks = await sortByUpvotes4;
      if (timeFrame === '24') stocks = await sortByUpvotes24;
      if (timeFrame === '5') stocks = await sortByUpvotes5Day;
    }
    if (sortMethod === 'comments') {
      if (timeFrame === '4') stocks = await sortByComments4;
      if (timeFrame === '24') stocks = await sortByComments24;
      if (timeFrame === '5') stocks = await sortByComments5Day;
    }
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
