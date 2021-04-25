import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

import { IconButton, Box } from '@material-ui/core';
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
        <h1 className='header'>View Hot Stocks from Reddit: </h1>
        <Link to='/reddit'>
          <IconButton className='icons iconReddit' color='#FF5700'>
            <RedditIcon />
          </IconButton>
        </Link>
      </Box>
    </div>
  );
};

export default IntroPage;
