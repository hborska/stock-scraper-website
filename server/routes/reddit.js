const express = require('express');
const router = express.Router();
const RedditStock = require('../models/RedditStock');

//Route for /api/reddit on our API, exporting a model based on state in our React front end
router.get('/', async (req, res) => {
  const sortMethod = req.query.sortMethod;
  const timeFrame = req.query.timeFrame;

  //Making objects to link react names to actual names in mongoDB
  const sortMethods = {
    upvotes: 'upvotes',
    comments: 'comments',
    posts: 'count',
  };
  const timeFrames = {
    4: 4 * 60 * 60 * 1000,
    24: 24 * 60 * 60 * 1000,
    5: 24 * 5 * 60 * 60 * 1000,
  };

  let properSort = sortMethods[sortMethod];
  let properTimeFrame = timeFrames[timeFrame];

  try {
    const stocks = await RedditStock.aggregate([
      {
        $match: {
          time_posted: { $lte: new Date(Date.now() - properTimeFrame) },
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
    ]).exec();
    res.json(stocks);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
