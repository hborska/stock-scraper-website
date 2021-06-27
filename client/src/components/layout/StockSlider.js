import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const dummydata = ['GME', 'AAPL', 'TSLA', 'XXX', 'QYDN'];

const StockSlider = () => {
  //List of stocks to render in animation
  const [stocks, setStocks] = useState([]);
  //Which stocks we want to pull for the animation
  const [sort, setSort] = useState('posts');
  const [timeFrame, setTimeFrame] = useState('4');

  //Fetching the stock data from our API
  async function fetchData() {
    const req = await axios.get('/api/reddit', {
      params: { sortMethod: sort, timeFrame: timeFrame },
    });
    // console.log(req.data);
    setStocks(req.data);
    return req.data;
  }

  //Call once upon loading, don't really need to update for the animation
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='slider-div'>
      <div className='sliding-text'>
        <h2>{'Hot Stocks: '}&nbsp;</h2>
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
