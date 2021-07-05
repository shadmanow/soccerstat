import React, {useEffect, useState} from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 8,
  },
  paginationUl: {
    marginTop: theme.spacing(3),
    justifyContent: 'center'
  }
}));

export const PaginationContainer = ({children, count}) => {
  const classes = useStyles();
  const [countPages, setCountPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!children) return;
    const _countPages = children.length / count;
    if (_countPages > 1) {
      setCountPages(Math.ceil(_countPages));
    } else {
      setCountPages(null);
    }
  }, [children, count]);

  const onChangePage = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid
      container
      className={classes.container}
      justify='space-around'
    >
      <Grid
        item
        container
        spacing={2}
        xs={12}
        justify='space-around'
      >
        {
          children &&
          children.slice((currentPage - 1) * count, (currentPage - 1) * count + count)
        }
      </Grid>

      <Grid item xs={12}>
        {
          countPages &&
          <Pagination
            color='primary'
            classes={{ul: classes.paginationUl}}
            count={countPages}
            page={currentPage}
            onChange={onChangePage}
          />
        }
      </Grid>
    </Grid>
  )
};