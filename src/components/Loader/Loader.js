import React from 'react';
import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'inherit',
    width: '100%'
  }
}));

export const Loader = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography variant='h5'>Loading...</Typography>
    </Container>
  )
};