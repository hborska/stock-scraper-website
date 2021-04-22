import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

import { IconButton, Box } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import RedditIcon from '@material-ui/icons/Reddit';

import { useTheme } from '@material-ui/core/styles';

const IntroPage = () => {
  const theme = useTheme();

  return (
    <div className='introPage'>
      <Box
        borderRadius={16}
        borderColor='primary'
        style={{ backgroundColor: '#424242', padding: '10%' }}
      >
        <h1 className='header'>View Hot Stocks from Reddit and Twitter: </h1>
        <Link to='/reddit'>
          <IconButton className='icons' color='#FF5700'>
            <RedditIcon />
          </IconButton>
        </Link>
        <Link to='/twitter'>
          <IconButton className='icons' color='#1DA1F2'>
            <TwitterIcon />
          </IconButton>
        </Link>
      </Box>
    </div>
  );
};

export default IntroPage;
