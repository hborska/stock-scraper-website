const express = require('express');
const router = express.Router();
const RedditStock = require('../models/RedditStock');

//Route for /api/reddit on our API, exporting a model based on state in our React front end
router.get('/', async (req, res) => {
  const sortMethod = req.query.sortMethod;
  const timeFrame = req.query.timeFrame;
  const subreddit = req.query.subreddit;

  //Linking React names to actual names in mongoDB
  const sortMethods = {
    upvotes: 'upvotes',
    comments: 'comments',
    posts: 'count',
  };
  const timeFrames = {
    4: 4 * 60 * 60 * 1000,
    24: 24 * 60 * 60 * 1000,
    5: 24 * 5 * 60 * 60 * 1000,
    Month: 24 * 30 * 60 * 60 * 1000,
  };

  let properSort = sortMethods[sortMethod];
  let properTimeFrame = timeFrames[timeFrame];

  querySubreddit = [
    {
      $match: {
        time_posted: { $gt: new Date(Date.now() - properTimeFrame) },
        subreddit: subreddit,
      },
    },
    {
      $group: {
        _id: '$stock',
        count: { $sum: 1 },
        upvotes: { $sum: '$ups' },
        comments: { $sum: '$numComments' },
      },
    },
    {
      $sort: { [properSort]: -1 },
    },
  ];

  queryAll = [
    {
      $match: {
        time_posted: { $gt: new Date(Date.now() - properTimeFrame) },
      },
    },
    {
      $group: {
        _id: '$stock',
        count: { $sum: 1 },
        upvotes: { $sum: '$ups' },
        comments: { $sum: '$numComments' },
      },
    },
    {
      $sort: { [properSort]: -1 },
    },
  ];

  try {
    if (subreddit === 'all') {
      stocks = await RedditStock.aggregate(queryAll).exec();
    } else {
      stocks = await RedditStock.aggregate(querySubreddit).exec();
    }
    res.status(200).json(stocks);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
