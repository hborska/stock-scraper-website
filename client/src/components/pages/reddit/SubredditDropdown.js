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
import RedditIcon from '@material-ui/icons/Reddit';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const RedditSortDropdown = ({ changeSort }) => {
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
      <p>Subreddit:</p>
      <IconButton
        className={classes.menuOptions}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        <RedditIcon />
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
                  <MenuItem onClick={handleMenuClick} value='all'>
                    All (Default)
                  </MenuItem>
                  <MenuItem onClick={handleMenuClick} value='wallstreetbets'>
                    R/wallstreetbets
                  </MenuItem>
                  <MenuItem onClick={handleMenuClick} value='daytrading'>
                    R/daytrading
                  </MenuItem>
                  <MenuItem onClick={handleMenuClick} value='stocks'>
                    R/stocks
                  </MenuItem>
                  <MenuItem onClick={handleMenuClick} value='investing'>
                    R/investing
                  </MenuItem>
                  <MenuItem onClick={handleMenuClick} value='pennystocks'>
                    R/pennystocks
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

export default RedditSortDropdown;
