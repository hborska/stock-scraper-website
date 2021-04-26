import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const About = () => {
  return (
    <div className='about'>
      <Typography variant='h4' style={{ margin: '5% 5% 2% 5%' }}>
        Hot Stock Tracker - Version 1.0.0.
      </Typography>
      <Typography variant='h5'>
        Github Repo
        <IconButton
          href='https://github.com/hborska/stock-scraper-website'
          target='_blank'
        >
          <GitHubIcon />
        </IconButton>
      </Typography>
      <br />
      <Typography variant='body'>
        Data from more websites and other improvements to come in the future!
      </Typography>
    </div>
  );
};

export default About;
