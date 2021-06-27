import React, { useEffect, useState } from 'react';
import RedditSortDropdown from './reddit/RedditSortDropdown';
import RedditTimeFrame from './reddit/RedditTimeFrame';
// import SubredditDropdown from './reddit/SubredditDropdown'; //for adding more features later
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

  //Setting default state for stocks
  const [stocks, setStocks] = useState([]); //list of stocks to render
  //set state for sorting and time frame allows us to dynamically change the state
  const [sort, setSort] = useState('upvotes');
  const [timeFrame, setTimeFrame] = useState('24');
  // const [subreddit, setSubreddit] = useState('all');

  //Fetching the stock data from our API
  async function fetchData() {
    const req = await axios.get('/api/reddit', {
      params: { sortMethod: sort, timeFrame: timeFrame },
    });
    // console.log(sort);
    // console.log(timeFrame);
    setStocks(req.data);
    return req.data;
  }

  //Re render list when sort or time frame is changed -- no need to refresh page, state stays intact
  useEffect(() => {
    fetchData();
  }, [sort, timeFrame]);

  //Live updating the data every 5 seconds (constant live updates interrupts user experience)
  useEffect(() => {
    let timer = setTimeout(() => {
      fetchData();
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
          from {nbsp}
          <i>
            <strong>
              {/* {' '}
              {subreddit === 'all' ? 'All Subreddits' : `r/${subreddit}`} */}
              All Subreddits
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
          {/* <SubredditDropdown
            changeSubreddit={(subreddit) => setSubreddit(subreddit)}
          /> */}
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
                row
              ) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component='th' scope='row'>
                    {row._id}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{row.count}</StyledTableCell>
                  <StyledTableCell align='right'>{row.upvotes}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.comments}
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
