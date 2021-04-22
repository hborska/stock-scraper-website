import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
// import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  MenuList,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
} from '@material-ui/core';
import { ShowChart, Menu } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  //Align menu to the right
  menuOptions: {
    marginLeft: 'auto',
  },
});

const Navbar = () => {
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
    <AppBar
      position='static'
      justify='space-between'
      color={theme.palette.primary.main}
    >
      <Toolbar>
        <Link to='/' className='stockIcon'>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <ShowChart />
          </IconButton>
        </Link>

        <Typography variant='h6'>TheTickerWatch.com</Typography>
        {/* Citation: Part of dropdown menu functionality from official material UI documentation: https://material-ui.com/components/app-bar/#app-bar */}
        <IconButton
          className={classes.menuOptions}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
        >
          <Menu />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper background={theme.palette.action.active}>
                <ClickAwayListener onClickAway={menuClosed}>
                  <MenuList autoFocusItem={open} id='menu-list-grow'>
                    <Link to='/' class='dropdownItem'>
                      <MenuItem onClick={menuClosed}>Return Home</MenuItem>
                    </Link>
                    <Link to='/reddit' class='dropdownItem'>
                      <MenuItem onClick={menuClosed}>
                        Hot Reddit Stocks
                      </MenuItem>
                    </Link>
                    <Link to='/twitter' class='dropdownItem'>
                      <MenuItem onClick={menuClosed}>
                        Hot Twitter Stocks
                      </MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {/* End citation */}
      </Toolbar>
    </AppBar>
  );
};

//Navbar.propTypes =

export default Navbar;
