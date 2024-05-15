const express = require('express');

const {authMiddleware} = require("../utils/authMiddleware")

const {addSymboltoWatchlist} = require("../controller/AddSymbolToWatchlist")

const router = express.Router();


router.post('/',authMiddleware,addSymboltoWatchlist);

module.exports = router;