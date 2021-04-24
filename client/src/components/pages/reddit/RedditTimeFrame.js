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
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TimeFrameDropdown = ({ changeTime }) => {
  //Styling
  const classes = useStyles();
  const theme = useTheme();
  //State for dropdown
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  //Called when a item in the dropdown menu is clicked
  const handleMenuClick = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    const currentTime = event.target.getAttribute('value');
    if (currentTime === '4hr') changeTime('4');
    if (currentTime === '24hr') changeTime('24');
    if (currentTime === '5day') changeTime('5');
    setOpen(false);
  };

  //Toggles the dropdown open / closed
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Fragment>
      <p>Time Frame:</p>
      <IconButton
        className={classes.menuOptions}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        <WatchLaterIcon />
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
                  <MenuItem onClick={handleMenuClick} value='4hr'>
                    4 Hours
                  </MenuItem>
                  <MenuItem onClick={handleMenuClick} value='24hr'>
                    24 Hours
                  </MenuItem>
                  <MenuItem onClick={handleMenuClick} value='5day'>
                    5 Days
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

export default TimeFrameDropdown;
