const mongoose = require('mongoose');

const RedditStockSchema = mongoose.Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    numPosts: {
      type: Number,
      required: true,
    },
    upvotes: {
      type: Number,
      required: true,
    },
    comments: {
      type: Number,
      required: true,
    },
    timePosted: {
      type: Number,
      required: true,
    },
  },
  { collection: 'topstocks' }
);

const RedditStock = mongoose.model('redditStock', RedditStockSchema);

const sortByPosts = RedditStock.aggregate([
  {
    $group: {
      _id: '$stock',
      count: { $sum: 1 },
      upvotes: { $sum: '$ups' },
      comments: { $sum: '$numComments' },
    },
  },
  {
    $sort: { count: -1 },
  },
]);

const sortByUpvotes = RedditStock.aggregate([
  {
    $group: {
      _id: '$stock',
      count: { $sum: 1 },
      upvotes: { $sum: '$ups' },
      comments: { $sum: '$numComments' },
    },
  },
  {
    $sort: { upvotes: -1 },
  },
]);

const sortByComments = RedditStock.aggregate([
  {
    $group: {
      _id: '$stock',
      count: { $sum: 1 },
      upvotes: { $sum: '$ups' },
      comments: { $sum: '$numComments' },
    },
  },
  {
    $sort: { comments: -1 },
  },
]);

module.exports.RedditStock = RedditStock;
module.exports.sortByPosts = sortByPosts;
module.exports.sortByUpvotes = sortByUpvotes;
module.exports.sortByComments = sortByComments;
