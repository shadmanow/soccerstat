import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import {KeyboardDatePicker} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.info.contrastText,
    boxShadow: theme.shadows[5],
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    color: theme.palette.info.contrastText,
  },
  inputLabel: {
    color: theme.palette.info.contrastText,
    '&.Mui-focused': {
      color: theme.palette.info.contrastText,
    }
  },
  datePicker: {
    color: theme.palette.info.contrastText,
    width: 170,
    marginLeft: theme.spacing(1)
  }
}));

export default function DateRangeSearch() {
  const classes = useStyles();
  const history = useHistory();

  const {pathname, search} = useLocation();
  const searchParams = new URLSearchParams(search);

  const [fromDate, setFromDate] = useState(new Date('2000'));
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    if (searchParams.has('fromDate')) {
      setFromDate(new Date(searchParams.get('fromDate')));
    }
    if (searchParams.has('toDate')) {
      setToDate(new Date(searchParams.get('toDate')));
    }
  }, []);

  const handleChangeFromDate = (date) => {
    try {
      setFromDate(date);
      const utcDate = new Date(date);
      utcDate.setDate(utcDate.getDate() + 1);

      searchParams.set('fromDate', utcDate.toISOString().substring(0, 10));
      history.push({
        pathname,
        search: searchParams.toString()
      });
    } catch (e) {
    }
  };

  const handleChangeToDate = (date) => {
    try {
      setToDate(date);
      const utcDate = new Date(date);
      utcDate.setDate(utcDate.getDate() + 1);

      searchParams.set('toDate', utcDate.toISOString().substring(0, 10));
      history.push({
        pathname,
        search: searchParams.toString()
      });
    } catch (e) {
    }
  };

  return (
    <Paper variant="outlined" square className={classes.paper}>

      <KeyboardDatePicker
        className={classes.datePicker}
        InputProps={{className: classes.input}}
        InputLabelProps={{className: classes.inputLabel}}
        variant="inline"
        label="From Date"
        format='yyyy-MM-dd'
        value={fromDate}
        onChange={handleChangeFromDate}
      />

      <KeyboardDatePicker
        className={classes.datePicker}
        InputProps={{className: classes.input}}
        InputLabelProps={{className: classes.inputLabel}}
        variant="inline"
        label="To Date"
        format='yyyy-MM-dd'
        value={toDate}
        onChange={handleChangeToDate}
      />

    </Paper>
  )
}