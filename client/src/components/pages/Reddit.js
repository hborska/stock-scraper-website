import React, { useEffect, useState } from 'react';
import RedditSortDropdown from '../layout/RedditSortDropdown';
import RedditTimeFrame from '../layout/RedditTimeFrame';
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(ticker, numPosts, numUpvotes, numComments) {
  return { ticker, numPosts, numUpvotes, numComments };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Reddit = () => {
  const classes = useStyles();
  const theme = useTheme();

  //Setting default state for stocks, going to use to choose which list to render
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/api/reddit');
      console.log(req.data);
      setStocks(req.data);
      return req.data;
    }
    fetchData();
  }, []);

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
            <strong> {1 + 1} Hours</strong>
          </i>
        </h4>

        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          color={theme.palette.text.primary}
          style={{ padding: '0 1% 2% 1%' }}
        >
          <RedditTimeFrame />
          <RedditSortDropdown />
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
