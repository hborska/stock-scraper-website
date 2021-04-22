import React, { Fragment } from 'react';
import '../../App.css';
import { useTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {
  IconButton,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import SortIcon from '@material-ui/icons/Sort';
import RedditIcon from '@material-ui/icons/Reddit';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Reddit = () => {
  const classes = useStyles();
  const theme = useTheme();

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
          Currently Showing Stocks from the Past {1 + 1} Hours
        </h3>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          color={theme.palette.text.primary}
          style={{ padding: '0 1% 2% 1%' }}
        >
          <p>Time Frame:</p>
          <IconButton>
            <WatchLaterIcon />
          </IconButton>
          <p>Sort By:</p>
          <IconButton>
            <SortIcon />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper}>
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
