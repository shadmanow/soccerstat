import React from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import {ItemWrapper} from '../Item/ItemWrapper';

const useStyles = makeStyles((theme) => ({
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  status: {
    ...theme.typography.button,
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
    borderRadius: 2,
    padding: theme.spacing(1),
    fontSize: theme.typography.fontSize - 3
  }
}));

export const LeagueMatch = ({match}) => {
  const classes = useStyles();
  const history = useHistory();

  const {
    homeTeam,
    awayTeam,
    utcDate,
    score,
  } = match;

  const {
    halfTime,
    fullTime,
    extraTime,
    penalties,
    winner
  } = score;

  const homeTeamGoals = +halfTime.homeTeam + +fullTime.homeTeam + +extraTime.homeTeam + +penalties.homeTeam;
  const awayTeamGoals = +halfTime.awayTeam + +fullTime.awayTeam + +extraTime.awayTeam + +penalties.awayTeam;

  const date = new Date(utcDate).toISOString()
    .substr(0, utcDate.length - 4)
    .split('T')
    .join(' - ');

  const handleAwayTeamClick = () => {
    history.push(`/leagues/team/${awayTeam.id}/matches`)
  };

  const handleHomeTeamClick = () => {
    history.push(`/leagues/team/${homeTeam.id}/matches`)
  };

  return (
    <ItemWrapper xs={12} sm={12} md={12}>
      <Grid item container xs={12} md={12} direction='row'>
        <Grid
          item
          container
          justify='center'
          alignItems='center'
          xs={12}
          sm={12}
          md={3}
        >
          <Typography noWrap>{date}</Typography>
        </Grid>
        <Grid
          item
          container
          alignItems='center'
          xs={10}
          sm={11}
          md={7}
          className={classes.innerContainer}
        >
          <Button
            variant="contained"
            size='small'
            color={winner === 'HOME_TEAM' ? 'secondary' : 'primary'}
            onClick={handleHomeTeamClick}
          >
            {homeTeam.name || 'NO TEAM'}
          </Button>
          <Typography variant='h6'>
            {homeTeamGoals}-{awayTeamGoals}
          </Typography>
          <Button
            variant="contained"
            size='small'
            color={winner === 'AWAY_TEAM' ? 'secondary' : 'primary'}
            onClick={handleAwayTeamClick}
          >
            {awayTeam.name || 'NO TEAM'}
          </Button>
        </Grid>
        <Grid
          item
          container
          justify='flex-end'
          alignItems='center'
          xs={2}
          sm={1}
          md={2}
        >
          <Typography
            variant='button'
            color='secondary'
            className={classes.status}
          >
            {winner || 'NO WINNER'}
          </Typography>
        </Grid>
      </Grid>
    </ItemWrapper>
  );
};