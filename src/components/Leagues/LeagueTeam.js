import React from 'react';
import {useHistory} from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {ButtonBase, Grid, Link, Typography} from '@material-ui/core';

import {useItemStyles} from '../Item/useItemStyles';
import {ItemWrapper} from '../Item/ItemWrapper';
import noImage from '../../assets/images/no-image.jpg';
import IconButton from '@material-ui/core/IconButton';

export const LeagueTeam = ({team, season, xs, sm, md}) => {
  const classes = useItemStyles();
  const history = useHistory();

  const {
    id,
    name,
    crestUrl,
    website,
    lastUpdated
  } = team;

  const handleClick = () => {
    history.push(`/leagues/team/${id}/matches`);
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
          onClick={handleClick}
          className={classes.imageButton}
        >
          <img
            className={classes.img}
            src={crestUrl || noImage}
            alt={name}
          />
        </ButtonBase>
      </Grid>
      <Grid
        item
        container
        direction='column'
        xs={8}
        justify='center'
        alignItems='flex-start'
      >
        <Typography variant='h6'>
          {name}
        </Typography>
        <Link
          href={website}
          target='_blank'
          className={classes.link}
        >
          {website}
        </Link>
        <Typography variant='subtitle2'>
          Last updated { lastUpdated.substr(0, 10) }
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={2}
        alignItems='center'
        justify='center'
      >
        <IconButton className={classes.button} onClick={handleClick}>
          <ArrowForwardIcon />
        </IconButton>
      </Grid>
    </ItemWrapper>
  )
};