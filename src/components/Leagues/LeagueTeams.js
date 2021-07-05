import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Grid, makeStyles} from '@material-ui/core';

import useHttp from '../../hooks/useHttp';
import StringYearSearch from '../StringYearSearch/StringYearSearch';
import {PaginationContainer} from '../PaginationContainer/PaginationContainer';
import {LeagueTeam} from './LeagueTeam';
import {Loader} from '../Loader/Loader';

const useStyles = makeStyles(theme => ({
  container: {
    '& > *': {
      marginTop: theme.spacing(1),
    },
  }
}));

const filterTeams = (search, teams) => {
  if (!search) {
    return teams;
  }

  const searchParams = new URLSearchParams(search);
  const searchName = searchParams.get('name');
  const searchYear = searchParams.get('year');

  let filtered = teams;

  if (searchName) {
    filtered = teams.filter(({name}) => name.toLowerCase().includes(searchName.toLowerCase()));
  }

  if (searchYear) {
    filtered = filtered.filter(({lastUpdated}) => {
      const year = new Date(lastUpdated).getFullYear();
      return year.toString() === searchYear
    })
  }

  return filtered;
};

export const LeagueTeams = ({location}) => {
  const classes = useStyles();
  const {search} = location;
  const {id} = useParams();

  const [teams, setTeams] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [get, loading] = useHttp();

  useEffect(() => {
    (async () => {
      try {
        const {teams} = await get(`http://api.football-data.org/v2/competitions/${id}/teams`);
        setTeams(teams);
        setFiltered(filterTeams(search, teams));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    setFiltered(filterTeams(search, teams));
  }, [search]);

  return (
    <Grid container className={classes.container}>
      <StringYearSearch yearParam='year' stringParam='name'/>

      {loading && <Loader/>}

      {
        !loading &&
        <PaginationContainer count={12}>
          {filtered && filtered.map(team => <LeagueTeam key={team.id} team={team} />)}
        </PaginationContainer>
      }
    </Grid>
  )
};