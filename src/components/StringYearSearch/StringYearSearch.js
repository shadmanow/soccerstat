import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import {KeyboardDatePicker} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    backgroundColor: theme.palette.info.dark,
    display: 'flex',
    alignItems: 'center',
    padding: 15
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
  yearPicker: {
    color: theme.palette.info.contrastText,
    width: 100,
    marginLeft: theme.spacing(1),
  }
}));

export default function StringYearSearch({stringParam, yearParam}) {
  const classes = useStyles();
  const history = useHistory();
  const {pathname, search} = useLocation();
  const searchParams = new URLSearchParams(search);

  const [string, setString] = useState(searchParams.get(stringParam) || '');
  const [year, setYear] = useState(new Date());

  useEffect(() => {
    if (searchParams.has(yearParam)) {
      setYear(new Date(searchParams.get(yearParam)));
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (string) {
        searchParams.set(stringParam, string);
      } else {
        searchParams.delete(stringParam);
      }
      history.push({
        pathname,
        search: searchParams.toString()
      });
    }, 600);
    return () => clearTimeout(timeout);
  }, [string]);

  useEffect(() => {
    if (year) {
      searchParams.set(yearParam, year.getFullYear().toString());
    } else {
      searchParams.delete(yearParam);
    }
    history.push({
      pathname,
      search: searchParams.toString()
    });
  }, [year]);

  return (
    <Paper variant="outlined" square className={classes.paper}>
      <TextField
        label='Name'
        value={string}
        onChange={e => setString(e.target.value)}
        InputProps={{className: classes.input}}
        InputLabelProps={{className: classes.inputLabel}}
      />

      <KeyboardDatePicker
        className={classes.yearPicker}
        InputProps={{className: classes.input}}
        InputLabelProps={{className: classes.inputLabel}}
        disableToolbar
        views={['year']}
        variant="inline"
        format="yyyy"
        label="Year"
        value={year}
        onChange={(date) => setYear(date)}
      />
    </Paper>
  )
}