async function getsimilarcompanies(req, res) {
    try {
        const { keywords } = req.query;
        // const symbolsData = {
        //     "symbols": [
        //         "RELIANCE.BSE",
        //         "RELI",
        //         "RELIW",
        //         "RELCAPITAL.BSE",
        //         "RELCHEMQ.BSE",
        //         "RLBS",          //get similar companies
        //         "RCOM.BSE",
        //         "540709.BSE",
        //         "532712.BSE",
        //         "503162.BSE"
        //     ]
        // }
        // res.status(200).json(symbolsData);

        const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=COWQDDC8IXJRD7RP`);
        const result = await response.json();

        

        if (result.bestMatches && Array.isArray(result.bestMatches)) {
            const symbols = result.bestMatches.map(match => match["1. symbol"]);
            const symbolsData = { symbols: symbols };
            
            res.status(200).json(symbolsData);
        } else {
            console.error('Invalid response structure:', result);
            res.status(500).json({ error: 'API access limit exceeded!' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getsimilarcompanies };
