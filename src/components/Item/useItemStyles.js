import {makeStyles} from '@material-ui/core';

export const useItemStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[1],
    display: 'flex',
    '& > *': {
      margin: 5,
    },
    height: '100%'
  },
  imageButton: {
    width: 70,
    height: 55,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover'
  },
  link: {
    fontSize: theme.typography.htmlFontSize,
    color: theme.palette.warning.main,
  }
}));