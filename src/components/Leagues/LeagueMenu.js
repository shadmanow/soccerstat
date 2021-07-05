import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles, Menu, MenuItem} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    maxHeight: 48,
  },
  menu: {
    marginTop: 40,
  },
  paper: {
    color: theme.palette.info.contrastText,
    backgroundColor: theme.palette.info.main
  },
}));

export const LeagueMenu = ({onTeamsClick, onCalendarClick}) => {
  const classes = useStyles();
  const [anchor, setAnchor] = useState(null);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => setAnchor(null);

  const handleTeamsClick = () => {
    onTeamsClick();
    handleClose();
  };

  const handleCalendarClick = () => {
    onCalendarClick();
    handleClose();
  };

  return (
    <>
      <IconButton className={classes.button} onClick={handleClick}>
        <MoreVertIcon/>
      </IconButton>
      <Menu
        keepMounted
        className={classes.menu}
        classes={{ paper: classes.paper }}
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}
      >
        <MenuItem onClick={handleTeamsClick}>Teams</MenuItem>
        <MenuItem onClick={handleCalendarClick}>Calendar</MenuItem>
      </Menu>
    </>
  )
};