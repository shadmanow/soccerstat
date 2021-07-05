import React, {useEffect, useState} from 'react';
import {Grid, makeStyles} from '@material-ui/core';

import useHttp from '../../hooks/useHttp';
import {League} from './League';
import StringYearSearch from '../StringYearSearch/StringYearSearch';
import {PaginationContainer} from '../PaginationContainer/PaginationContainer';
import {Loader} from '../Loader/Loader';

const useStyles = makeStyles(theme => ({
  container: {
    '& > *': {
      marginTop: theme.spacing(1),
    },
  },
}));

const filterLeagues = (query, competitions) => {
  const queryParams = new URLSearchParams(query);
  const nameOrArea = queryParams.get('nameOrArea');
  const year = queryParams.get('year');

  if (!nameOrArea && !year) {
    return competitions;
  }

  let filtered = [];

  if (nameOrArea) {
    filtered = competitions.filter(({name, area}) => {
      const value = nameOrArea.toLowerCase();
      return name.toLowerCase().includes(value) ||
        area.name.toLowerCase().includes(value);
    })
  } else {
    filtered = competitions;
  }

  if (year) {
    filtered = filtered.filter(({currentSeason}) => {
      if (!currentSeason) return false;
      const {startDate, endDate} = currentSeason;
      return startDate.includes(year) || endDate.includes(year);
    })
  }

  return filtered;
};

export const Leagues = ({location}) => {
  const classes = useStyles();
  const [competitions, setCompetitions] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const {search} = location;
  const [get, loading] = useHttp();

  useEffect(() => {
    (async () => {
      try {
        const {competitions} = await get('http://api.football-data.org/v2/competitions?plan=TIER_ONE');
        setCompetitions(competitions);
         setFiltered(filterLeagues(search, competitions));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    setFiltered(filterLeagues(search, competitions));
  }, [search]);

  return (
    <Grid container className={classes.container}>
      <StringYearSearch stringParam='nameOrArea' yearParam='year'/>

      { loading && <Loader /> }

      {
        !loading &&
        <PaginationContainer count={12}>
          {filtered.map(league => <League key={league.id} league={league}/>)}
        </PaginationContainer>
      }

    </Grid>
  )
};