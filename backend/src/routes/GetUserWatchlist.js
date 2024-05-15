
const {authMiddleware} = require("../utils/authMiddleware")
const {getUserWatchlist} = require("../controller/GetUserWatchlist")

const express = require('express');

const router = express.Router();

router.get('/',authMiddleware,getUserWatchlist)


module.exports = router;