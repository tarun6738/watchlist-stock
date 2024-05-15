import React, { useState, useEffect, useRef } from 'react';
import { MdDelete } from "react-icons/md";

import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [keywords, setKeywords] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watchListSize, setwatchListSize] = useState(0);
  const [isPresent, setisPresent] = useState({});
  const [user, setUser] = useState(null);
  const ref = useRef(null);

 

  console.log("watchlist",watchlist);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getsimilarcompanies?keywords=${keywords}`);

        if (response.ok) {
          const result = await response.json();
          setSuggestions(result.symbols);
        } else {
          console.error('Error fetching similar companies');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (keywords.trim().length > 0) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [keywords]);

  const handleSymbolClick = async (symbol) => {
    // console.log("symbol received: ", symbol);
    setSuggestions([]);

    if (!user) {
      alert("Please login to add symbols to your watchlist!");
      return;
    }

    if(isPresent[symbol]) return;

    const getSymbolPrice = async () => {
      const { data } = await axios.get(`http://localhost:5000/getsymboldata?symbol=${symbol}`);
      // console.log("API", data);
      return data["4. close"];
    };


    const price = await getSymbolPrice();

    const response = await axios.post('http://localhost:5000/addsymbol', {
        symbol,
        price,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    
    
      setWatchlist([...watchlist, { id: watchListSize, symbol, price }]);
      setwatchListSize(watchListSize + 1);
      setisPresent({ ...isPresent, [symbol]: true });
    

   
  };
  

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    setWatchlist([]); // Clear watchlist state on logout
    setwatchListSize(0);
    setisPresent({});
  }

  useEffect(() => {
    // console.log("watch list updated -> ", watchlist);
  }, [watchlist]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (user) {
        try {
          const response = await axios.get('http://localhost:5000/getUserWatchlist', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });



          if (response.data.watchlist) {

            console.log("response from db",response.data.watchlist.symbols);
            setWatchlist(response.data.watchlist.symbols);
            setwatchListSize(response.data.watchlist.symbols);
            const watchlistSymbols = {};
            response.data.watchlist.symbols.forEach(item => watchlistSymbols[item.symbol] = true);
            setisPresent(watchlistSymbols);
          } else {
            setWatchlist([]);
            setwatchListSize(0);
            setisPresent({});
          }
        } catch (error) {
          console.error('Error fetching watchlist:', error);
        }
      }
    };

    fetchWatchlist();
  }, [user]); 

  const handleWatchListItemDelete = async (index) => {
    const watchlistsymbol = watchlist[index].symbol;
    try {
      const response = await axios.delete(`http://localhost:5000/deletesymbol?symbol=${watchlistsymbol}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
  
      
        
        setWatchlist((prevWatchList) =>
          prevWatchList.filter((item, itemIndex) => itemIndex !== index)
        );
        setwatchListSize(watchListSize - 1);
        setisPresent({ ...isPresent, [watchlistsymbol]: false });
      
    } catch (error) {
      console.error('Error deleting symbol:', error);
      alert('Failed to delete symbol from watchlist!');
    }
  };

  return (
    <div className="mx-auto p-4">
      
      <header className="mt-8 flex justify-between items-center mb-4">
        <div classname="flex">
          
          <h1 className="text-2xl font-bold">Stock Track</h1>
        </div>
        <div>
        {user ? (
          <Link to="/" className="p-2 bg-blue-500 text-white rounded-md mr-2" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="p-2 bg-blue-500 text-white rounded-md mr-2">
              Login
            </Link>
            <Link to="/register" className="p-2 bg-blue-500 text-white rounded-md">
              Signup
            </Link>
          </>
        )}
      </div>
        
      </header>
      <div ref={ref} className="relative">
        <input
          type="text"
          placeholder="Search for a company..."
          className="w-80 p-2 border border-gray-300 rounded-md"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="z-50 absolute w-64 bg-white border border-gray-300 rounded-md mt-1">
            {suggestions.map((symbol, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => { handleSymbolClick(symbol) }}
              >
                {symbol}
              </li>
            ))}
          </ul>
        )}
        <h1 className='flex justify-center text-4xl font-bold mt-4'>Watch list</h1>
        {
          watchlist.length === 0 ? (
          <p className="text-center text-gray-500 mt-24">Add something to your watchlist!</p>
        ):
        (
          <ul className="mt-8 w-9/12 mx-auto bg-white rounded-md mt-1">
          <div className='flex justify-between items-center p-2 border-b'>
            <div className="flex-1 text-left font-bold">Stock Symbol</div>
            <div className="flex-1 text-center font-bold">Price</div>
            
          </div>
          {watchlist.map((watchListItem, index) => (
            <div key={index} className='flex justify-between items-center p-2'>
              <li className="flex-1 text-left mt-2">
                {watchListItem.symbol}
              </li>
              <div className='mt-2 flex-1 text-center ml-20'>{watchListItem.price}</div>
              <button className='ml-2 mt-2' onClick={() => handleWatchListItemDelete(index)}>
                <MdDelete className='text-red-500 text-2xl' />
              </button>
            </div>
          ))}
        </ul>
        )
        }
        
      </div>
    </div>
  );
}

export default Dashboard;
