async function getSymbolData(req,res){
    const {symbol} = req.query;
    const last_refreshed_data = {
        "1. open": "170.6800",
        "2. high": "170.7500",
        "3. low": "170.6500",    //get symbol data
        "4. close": "170.7500",
        "5. volume": "2685"
    }
    // const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=COWQDDC8IXJRD7RP`)

    // const result = await response.json();
    // last_refreshed = result["Meta Data"]["3. Last Refreshed"]
    // last_refreshed_data = result["Time Series (5min)"][last_refreshed]
    res.status(200).json(last_refreshed_data);
}

module.exports = {getSymbolData};