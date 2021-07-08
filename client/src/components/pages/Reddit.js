import React, { useEffect, useState } from 'react';
import RedditSortDropdown from './reddit/RedditSortDropdown';
import RedditTimeFrame from './reddit/RedditTimeFrame';
import SubredditDropdown from './reddit/SubredditDropdown';
import axios from 'axios';
import '../../App.css';

import { useTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import RedditIcon from '@material-ui/icons/Reddit';

//Citation: styling for the table cells and rows retrieved from material UI official documentation
//Theme for table cells
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//Theme for table rows
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

//Min width for the table
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
//End citation

//Main function for Reddit page
const Reddit = () => {
  //Styling
  const classes = useStyles();
  const theme = useTheme();

  //Setting state for stocks, sort, time frame, and subreddit
  const [stocks, setStocks] = useState([]); //list of stocks to render
  const [sort, setSort] = useState('upvotes');
  const [timeFrame, setTimeFrame] = useState('24');
  const [subreddit, setSubreddit] = useState('all');

  //Fetching the stock data from our API
  async function getStocks() {
    const req = await axios.get('/api/reddit', {
      params: { sortMethod: sort, timeFrame, subreddit },
    });
    setStocks(req.data);
    return req.data;
  }
  // console.log(stocks);

  //Re render list when sort or time frame is changed -- no need to refresh page, state stays intact
  useEffect(() => {
    getStocks();
  }, [sort, timeFrame, subreddit]);

  //Live updating the data every 5 seconds (constant live updates interrupts user experience)
  useEffect(() => {
    let timer = setTimeout(() => {
      getStocks();
    }, 5000);
    // console.log('Refreshing Data...');
    return () => clearTimeout(timer);
  }, [stocks]);

  return (
    <div className='tablePg'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        color={theme.palette.text.primary}
        style={{ padding: '0 0 0 2%' }}
      >
        <h2 className='header'>Hot Reddit Stocks</h2>
        <RedditIcon className='headerIcon' />
      </Box>
      <Box display='flex' className='headerBox'>
        <h3 className='header'>
          Showing Top 20 Stocks from the Past:
          <i>
            <strong>
              {(timeFrame === '24' || timeFrame === '4') &&
                ` ${timeFrame} Hours`}
              {timeFrame === '5' && ` ${timeFrame} Days`}
              {timeFrame === 'month' && ' Month'}
            </strong>
            <br />
          </i>
          from:
          <i>
            <strong>
              {' '}
              {subreddit === 'all' ? 'All Subreddits' : `r/${subreddit}`}
            </strong>
          </i>
        </h3>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          color={theme.palette.text.primary}
          style={{ padding: '0 1% 0 1%' }}
        >
          <RedditTimeFrame
            changeTime={(timeFrame) => setTimeFrame(timeFrame)}
          />
          <RedditSortDropdown changeSort={(sort) => setSort(sort)} />
          <SubredditDropdown
            changeSubreddit={(subreddit) => setSubreddit(subreddit)}
          />
        </Box>
      </Box>

      <TableContainer component={Paper} className='stockTable'>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Stock</StyledTableCell>
              <StyledTableCell align='right'>Number of Posts</StyledTableCell>
              <StyledTableCell align='right'>
                Total Upvotes&nbsp;
              </StyledTableCell>
              <StyledTableCell align='right'>
                Total Comments&nbsp;
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.slice(0, 20).map(
              (
                //picking the top 20 stocks
                stock
              ) => (
                <StyledTableRow key={stock._id}>
                  <StyledTableCell component='th' scope='row'>
                    {stock._id}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{stock.count}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {stock.upvotes}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {stock.comments}
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Reddit;
