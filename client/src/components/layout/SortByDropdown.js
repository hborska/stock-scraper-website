import React, { Fragment, useState, useRef } from 'react';
import {
  IconButton,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const SortByDropdown = () => {
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
    <Fragment>
      <p>Sort By:</p>
      <IconButton
        className={classes.menuOptions}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        <SortIcon />
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
                  <MenuItem onClick={menuClosed}>Number of Posts</MenuItem>
                  <MenuItem onClick={menuClosed}>Comments</MenuItem>
                  <MenuItem onClick={menuClosed}>Upvotes</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

export default SortByDropdown;
