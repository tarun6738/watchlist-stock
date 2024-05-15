
const Watchlist = require("../models/Watchlist");
async function addSymboltoWatchlist(req, res) {
    const {symbol, price } = req.body;
  
    const userId = req.userId;
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    
    try {
      const watchlist = await Watchlist.findOne({ userId });
  
      if (watchlist) {
        
        const existingSymbol = watchlist.symbols.find(s => s.symbol === symbol);
        if (existingSymbol) {
          return res.status(400).json({ message: 'Symbol already exists in watchlist!' });
        }
  
        watchlist.symbols.push({ symbol, price });
        await watchlist.save();
      } else {
        const newWatchlist = new Watchlist({ userId, symbols: [{ symbol, price }] });
        await newWatchlist.save();
      }
  
      res.json({ message: 'Symbol added to watchlist!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  module.exports = {addSymboltoWatchlist};
  