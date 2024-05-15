const Watchlist = require("../models/Watchlist");
const mongoose = require('mongoose');

async function getUserWatchlist(req,res){
    try {
        const userId = req.userId;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const watchlist = await Watchlist.findOne({ userId });
        if(!watchlist){
            return res.status(404).json({ message: 'Watchlist not found' });
        }
        
        res.json({ watchlist });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports ={getUserWatchlist};