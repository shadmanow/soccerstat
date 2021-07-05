import React from 'react';
import {useHistory} from 'react-router-dom';
import {ButtonBase, Grid, Typography} from '@material-ui/core';
import noImage from '../../assets/images/no-image.jpg';

import {LeagueMenu} from './LeagueMenu';
import {useItemStyles} from '../Item/useItemStyles';
import {ItemWrapper} from '../Item/ItemWrapper';

export const League = ({ league, xs, sm, md}) => {
  const classes = useItemStyles();
  const history = useHistory();
  const {
    id,
    area,
    name,
    currentSeason
  } = league;

  const {ensignUrl} = area;
  const {startDate, endDate} = currentSeason;

  const handleCalendarClick = () => {
    const fromDate = startDate.substr(0, 10);
    const toDate = endDate.substr(0, 10);
    history.push(`/leagues/${id}/matches?fromDate=${fromDate}&toDate=${toDate}`);
  };

  const handleTeamsClick = () => {
    history.push(`/leagues/${id}/teams`);
  };

  return (
    <ItemWrapper xs={xs || 12} sm={sm || 12} md={md || 6}>
      <Grid
        item
        container
        xs={2}
        alignItems='center'
        justify='center'
      >
        <ButtonBase
          className={classes.imageButton}
          onClick={handleCalendarClick}
        >
          <img
            className={classes.img}
            src={ensignUrl || noImage}
            alt={area.name}
          />
        </ButtonBase>
      </Grid>
      <Grid
        item
        container
        xs={8}
        direction='column'
        alignItems='flex-start'
        justify='center'
      >
        <Typography>
          {area.name} {startDate.substr(0, 4)}
        </Typography>
        <Typography align='center'>{name}</Typography>
      </Grid>
      <Grid
        item
        container
        xs={2}
        justify='center'
        alignItems='center'
      >
        <LeagueMenu
          onTeamsClick={handleTeamsClick}
          onCalendarClick={handleCalendarClick}
        />
      </Grid>
    </ItemWrapper>
  )
};