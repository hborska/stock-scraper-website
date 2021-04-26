import React from 'react';

const dummydata = ['GME', 'AAPL', 'TSLA', 'XXX', 'QYDN'];

const StockSlider = () => {
  return (
    <div class='slider-wrap'>
      <div class='slider-move'>
        <div class='slide'>
          <h2>GME</h2>
        </div>
        <div class='slide'>
          <h1>AAPL</h1>
        </div>
        <div class='slide'>
          <h1>TSLA</h1>
        </div>
        <div class='slide'>
          <h1>UBER</h1>
        </div>
        <div class='slide'>
          <h1>NFLX</h1>
        </div>
      </div>
    </div>
  );
};

export default StockSlider;
