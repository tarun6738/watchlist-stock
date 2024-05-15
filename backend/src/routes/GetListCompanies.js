const {getsimilarcompanies} = require("../controller/GetListCompanies")
const express = require("express")

const router = express.Router();

router.get('/',getsimilarcompanies);

module.exports = router;