const express = require("express")
const signupRoute = require("./routes/Signup")
const loginRoute = require("./routes/Login")
const getSymbolRoute = require("./routes/GetSymbolData")
const getsimilarcompaniesroute = require("./routes/GetListCompanies")
const addSymbolRoute = require("./routes/AddSymbol")
const getUserWatchlistRoute = require("./routes/GetUserWatchlist")
const deleteSymbolroute = require("./routes/DeleteSymbol");
const bodyParser = require("body-parser")
const cors = require("cors")


const app = express();

const PORT = 5000;


app.use(bodyParser.json())
app.use(cors())

app.use("/user",signupRoute)
app.use("/auth",loginRoute)
app.use("/getsymboldata",getSymbolRoute)
app.use("/getsimilarcompanies",getsimilarcompaniesroute)

app.use("/addsymbol",addSymbolRoute)
app.use("/getUserWatchlist",getUserWatchlistRoute)
app.use("/deletesymbol",deleteSymbolroute)



app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`)
})