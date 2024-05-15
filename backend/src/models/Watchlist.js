const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference user model
      required: true,
    },
    symbols: [{
      symbol: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    }],
  })
  
  const Watchlist = mongoose.model('Watchlist', watchlistSchema);
  
  module.exports = Watchlist;
