const Watchlist = require("../models/Watchlist")

async function deleteSymbol(req,res){
    try {
        const {symbol} = req.query;
        console.log("Symbol is",symbol)
        const userId = req.userId;
        const watchlist = await Watchlist.findOne({ userId });
        console.log("Watchlist in delete",watchlist);
        if (!watchlist) {
            return res.status(404).json({ message: 'Watchlist not found' });
        }
        const index = watchlist.symbols.findIndex(item => item.symbol === symbol);

        console.log("Index found here",index);
        if (index === -1) {
            return res.status(400).json({ message: 'Symbol not found in watchlist' });
        }
        watchlist.symbols.splice(index, 1);
        await watchlist.save();
        res.json({ message: 'Symbol deleted from watchlist successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {deleteSymbol};

