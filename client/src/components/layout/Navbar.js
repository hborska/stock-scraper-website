import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
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
  //Styling
  const classes = useStyles();
  const theme = useTheme();
  //State for dropdown
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  //Called when menu item is clicked
  const menuClosed = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  //Toggles the dropdown open / closed
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <AppBar
      position='sticky'
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
                      <MenuItem onClick={menuClosed}>Reddit Stocks</MenuItem>
                    </Link>
                    <Link to='/about' class='dropdownItem'>
                      <MenuItem onClick={menuClosed}>About</MenuItem>
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
