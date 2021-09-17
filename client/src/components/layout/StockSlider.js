import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockSlider = () => {
  //List of stocks to render in animation
  const [stocks, setStocks] = useState([]);
  //Which stocks we want to pull for the animation
  const sort = '24';
  const timeFrame = 'month';
  const subreddit = 'all';

  //Call once upon loading, don't really need to update for the animation
  useEffect(() => {
    //Fetching the stock data from our API (just default settings for the stock bar)
    async function getStocks() {
      const req = await axios.get('/api/reddit', {
        params: {
          sortMethod: sort,
          timeFrame: timeFrame,
          subreddit: subreddit,
        },
      });
      // console.log(req.data);
      setStocks(req.data);
      return req.data;
    }
    getStocks();
  }, []);

  return (
    <div className='slider-div'>
      <div className='sliding-text'>
        <h2>{'Hot Stocks - Past 24 hours: '}&nbsp;</h2>
        {stocks.slice(0, 10).map((stock) => (
          <h2 key={stock._id}>
            {stock._id}
            &nbsp;&nbsp; {/* nbsp to add spacing between stocks */}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default StockSlider;
