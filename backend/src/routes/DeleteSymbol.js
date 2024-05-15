const express = require('express');
const { authMiddleware } = require('../utils/authMiddleware');
const {deleteSymbol} = require("../controller/DeleteSymbol")
const router = express.Router();

router.delete('/',authMiddleware,deleteSymbol);

module.exports = router;