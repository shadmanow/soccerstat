import React from 'react';
import { useHistory } from 'react-router-dom';
import {AppBar, makeStyles, Toolbar, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2)
  },
}));

export const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push('/leagues');
  };

  return (
    <AppBar position="static" color='primary'>
      <Toolbar variant="regular">
        <Typography variant="h6" color="inherit" className={classes.title}>
          Soccer Stats
        </Typography>
        <Button onClick={handleClick} color='secondary' variant='contained'>
          Leagues
        </Button>
        {/*
          Здесь была кнопка Teams, но в последний момент
          стало известно, что API ограничен и поэтому ее не стало
        */}
      </Toolbar>
    </AppBar>
  )
};