import React, { useEffect, useState } from 'react';
import RedditSortDropdown from './reddit/RedditSortDropdown';
import RedditTimeFrame from './reddit/RedditTimeFrame';
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
  const [timeFrame, setTimeFrame] = useState('5');

  //Fetching the stock data from our API upon component mounting or the stocks list changing
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/api/reddit', {
        params: { sortMethod: sort, timeFrame: timeFrame },
      });
      console.log(req.data);
      setStocks(req.data);
      return req.data;
    }
    fetchData();
  }, [sort, timeFrame]); //also add function for every 5 secs stocks changes

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
        <h4 className='header'>
          Showing Top 20 Stocks from the Past:
          <i>
            <strong>
              {timeFrame === '24' || timeFrame === '4'
                ? ` ${timeFrame} Hours`
                : ` ${timeFrame} Days`}
            </strong>
          </i>
        </h4>
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
            {stocks.slice(0, 20).map((
              //picking the top 20 stocks
              row
            ) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component='th' scope='row'>
                  {row._id}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.count}</StyledTableCell>
                <StyledTableCell align='right'>{row.upvotes}</StyledTableCell>
                <StyledTableCell align='right'>{row.comments}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Reddit;
