import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container, makeStyles} from '@material-ui/core';

import {Header} from './components/Header/Header';
import {Leagues} from './components/Leagues/Leagues';
import {LeagueMatches} from './components/Leagues/LeagueMatches';
import {LeagueTeams} from './components/Leagues/LeagueTeams';
import {Page404} from './components/Page404/Page404';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.grey[300],
    width: '100%',
    height: '100vh'
  },
  innerContainer:{
    backgroundColor: theme.palette.background.default,
    padding: 0,
    width: '100%',
    height: '100vh'
  },
  container: {
    padding: 0
  }
}));

export const App = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='xl' className={classes.mainContainer}>
      <Container maxWidth="md" className={classes.innerContainer}>
        <Header/>
        <Container className={classes.container}>
          <Switch>
            <Redirect exact from='/' to='/leagues'/>
            <Route exact path='/leagues' component={Leagues}/>
            <Route exact path='/leagues/:id/teams' component={LeagueTeams}/>
            <Route
              exact
              path={[
                '/leagues/:id/matches',
                '/leagues/team/:id/matches'
              ]}
              component={LeagueMatches}
            />
            <Route component={Page404}/>
          </Switch>
        </Container>
      </Container>
    </Container>
  )
};