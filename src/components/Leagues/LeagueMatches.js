import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import {Grid, makeStyles} from '@material-ui/core';

import {PaginationContainer} from '../PaginationContainer/PaginationContainer';
import {League} from './League';
import {LeagueMatch} from './LeagueMatch';
import {LeagueTeam} from './LeagueTeam';
import DateRangeSearch from '../DateRangeSearch/DateRangeSearch';
import Container from '@material-ui/core/Container';
import {Loader} from '../Loader/Loader';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      marginTop: theme.spacing(1),
    },
  },
  innerContainer: {
    padding: 0,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  }
}));

const filterMatches = (search, matches) => {
  if (!search) {
    return matches;
  }

  const searchParams = new URLSearchParams(search);
  const fromDate = new Date(searchParams.get('fromDate'));
  const toDate = new Date(searchParams.get('toDate'));

  if (!fromDate || !toDate) {
    return matches;
  }

  return matches.filter(({utcDate}) => {
    const date = new Date(utcDate.substr(0, 10));
    return date >= fromDate && date <= toDate
  });
};

export const LeagueMatches = ({location}) => {
  const classes = useStyles();
  const {search, pathname} = location;
  const {id} = useParams();

  const [getTeams, loadingTeams] = useHttp();
  const [getTeamOrLeague, loadingTeamOrLeague] = useHttp();

  const [matches, setMatches] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [team, setTeam] = useState(null);
  const [league, setLeague] = useState(null);

  useEffect(() => {
    (async () => {
      if (pathname.includes('/team/')) {
        const team = await getTeamOrLeague(`https://api.football-data.org/v2/teams/${id}`);
        setLeague(null);
        setTeam(team);

        const {matches} = await getTeams(`https://api.football-data.org/v2/teams/${id}/matches`);
        setMatches(matches);
        setFiltered(filterMatches(search, matches));
      } else {
        const league = await getTeamOrLeague(`https://api.football-data.org/v2/competitions/${id}`);
        setLeague(league);
        setTeam(null);

        const {matches} = await getTeams(`https://api.football-data.org/v2/competitions/${id}/matches`);
        setMatches(matches);
        setFiltered(filterMatches(search, matches));
      }
    })();
  }, [pathname]);

  useEffect(() => {
    setFiltered(filterMatches(search, matches));
  }, [search]);

  return (
    <Grid container className={classes.container}>

      <Container className={classes.innerContainer}>
        <DateRangeSearch/>
        {loadingTeamOrLeague && <Loader/>}
        {!loadingTeamOrLeague && team && <LeagueTeam team={team} xs={7} md={7}/>}
        {!loadingTeamOrLeague && league && <League league={league} xs={7} md={7}/>}
      </Container>

      {loadingTeams && <Loader/>}

      {
        !loadingTeams &&
        <PaginationContainer count={12}>
          {filtered && filtered.map(match => <LeagueMatch key={match.id} match={match}/>)}
        </PaginationContainer>
      }
      {
        !loadingTeams && !filtered.length && <Typography>No matches</Typography>
      }
    </Grid>
  )
};
