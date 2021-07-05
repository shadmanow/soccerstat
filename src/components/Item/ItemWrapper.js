import React from 'react';
import {Container, Grid} from '@material-ui/core';
import {useItemStyles} from '../Item/useItemStyles';

export const ItemWrapper = ({children, xs, md, sm}) => {
  const classes = useItemStyles();
  return (
    <Grid
      item
      container
      xs={xs}
      md={md}
      sm={sm}
    >
      <Container className={classes.container}>
        {children}
      </Container>
    </Grid>
  )
};