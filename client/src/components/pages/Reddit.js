import React, { useState, useRef } from 'react';
import '../../App.css';
import SortByDropdown from '../layout/SortByDropdown';
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
import TimeFrameDropdown from '../layout/TimeFrameDropdown';

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

//Getting the data
const dummyData = [
  createData('AAPL', 30, 3000, 2500),
  createData('GME', 450, 2000, 18),
  createData('HENF', 4500, 2000, 18),
  createData('EJF', 420, 2000, 1811),
  createData('FJEJ', 410, 2030, 118),
  createData('FEJ', 452, 2000, 148),
  createData('EUSS', 90, 2000, 18),
  createData('EJFI', 50, 2000, 18),
  createData('EFIJ', 4500, 2000, 29),
  createData('EIUH', 410, 2000, 18),
];

// const realData = await axios.get('http://localhost:5000/api/reddit');
// console.log(realData);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Reddit = () => {
  const classes = useStyles();
  const theme = useTheme();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const menuClosed = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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
          <TimeFrameDropdown />
          <SortByDropdown />
        </Box>
      </Box>

      {/* <DataGrid
        columns={[
          { field: 'Stock' },
          { field: 'Number of Posts' },
          { field: 'Total Upvotes' },
          { field: 'Total Comments' },
        ]}
        rows={[]}
      ></DataGrid> */}

      <TableContainer component={Paper} className='stockTable'>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Stock</StyledTableCell>
              <StyledTableCell align='right'>Total Upvotes</StyledTableCell>
              <StyledTableCell align='right'>
                Number of Mentions&nbsp;
              </StyledTableCell>
              <StyledTableCell align='right'>
                Total Comments&nbsp;
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row) => (
              <StyledTableRow key={row.ticker}>
                <StyledTableCell component='th' scope='row'>
                  {row.ticker}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.numPosts}</StyledTableCell>
                <StyledTableCell align='right'>
                  {row.numUpvotes}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {row.numComments}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Reddit;
