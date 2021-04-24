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

const SortByDropdown = ({ changeSort }) => {
  //Styling
  const classes = useStyles();
  const theme = useTheme();
  //State for dropdown
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  //Called when an item in the dropdown menu is clicked
  const handleMenuClick = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    //Retrieves the value of the item selected in the dropdown
    const currentSort = event.target.getAttribute('value');
    if (currentSort === 'posts') changeSort('posts');
    if (currentSort === 'upvotes') changeSort('upvotes');
    if (currentSort === 'comments') changeSort('comments');
    setOpen(false);
  };

  //Toggles the dropdown open / closed
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
              <ClickAwayListener onClickAway={handleMenuClick}>
                <MenuList autoFocusItem={open} id='menu-list-grow'>
                  <MenuItem onClick={handleMenuClick} value='posts'>
                    Number of Posts
                  </MenuItem>
                  <MenuItem onClick={handleMenuClick} value='comments'>
                    Comments
                  </MenuItem>
                  <MenuItem onClick={handleMenuClick} value='upvotes'>
                    Upvotes
                  </MenuItem>
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
