const mongoose = require('mongoose');

//Creating our schema for Reddit stock posts
const RedditStockSchema = mongoose.Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    url: {
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

//Modeling our schemas
const RedditStock = mongoose.model('redditStock', RedditStockSchema);

//Aggregating our model based on time posted, grouping posts, and sorting
//Aggregations below to be served to our reddit route then to the front end
const sortByPosts4 = RedditStock.aggregate([
  {
    $match: {
      time_posted: { $lte: new Date(Date.now() - 4 * 60 * 60 * 1000) },
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
    $sort: { count: -1 },
  },
]);

const sortByPosts24 = RedditStock.aggregate([
  {
    $match: {
      time_posted: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
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
    $sort: { count: -1 },
  },
]);

const sortByPosts5Day = RedditStock.aggregate([
  {
    $match: {
      time_posted: { $lte: new Date(Date.now() - 24 * 5 * 60 * 60 * 1000) },
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
    $sort: { count: -1 },
  },
]);

const sortByUpvotes4 = RedditStock.aggregate([
  {
    $match: {
      time_posted: { $lte: new Date(Date.now() - 4 * 60 * 60 * 1000) },
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
    $sort: { upvotes: -1 },
  },
]);

const sortByUpvotes24 = RedditStock.aggregate([
  {
    $match: {
      time_posted: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
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
    $sort: { upvotes: -1 },
  },
]);

const sortByUpvotes5Day = RedditStock.aggregate([
  {
    $match: {
      time_posted: { $lte: new Date(Date.now() - 24 * 5 * 60 * 60 * 1000) },
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
    $sort: { upvotes: -1 },
  },
]);

const sortByComments4 = RedditStock.aggregate([
  {
    $match: {
      time_posted: { $lte: new Date(Date.now() - 4 * 60 * 60 * 1000) },
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
    $sort: { comments: -1 },
  },
]);

const sortByComments24 = RedditStock.aggregate([
  {
    $match: {
      time_posted: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
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
    $sort: { comments: -1 },
  },
]);

const sortByComments5Day = RedditStock.aggregate([
  {
    $match: {
      time_posted: { $lte: new Date(Date.now() - 24 * 5 * 60 * 60 * 1000) },
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
    $sort: { comments: -1 },
  },
]);

//Exporting our aggregated models to our reddit route on our API
module.exports.RedditStock = RedditStock;

module.exports.sortByPosts4 = sortByPosts4;
module.exports.sortByPosts24 = sortByPosts24;
module.exports.sortByPosts5Day = sortByPosts5Day;

module.exports.sortByUpvotes4 = sortByUpvotes4;
module.exports.sortByUpvotes24 = sortByUpvotes24;
module.exports.sortByUpvotes5Day = sortByUpvotes5Day;

module.exports.sortByComments4 = sortByComments4;
module.exports.sortByComments24 = sortByComments24;
module.exports.sortByComments5Day = sortByComments5Day;
