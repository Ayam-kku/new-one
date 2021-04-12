import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import { getEvent } from './services';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  }
}));

const TotalCustomers = ({ className, ...rest }) => {
  const classes = useStyles();
  const [length, setLength] = useState(0);

  getEvent('6071d194d7edbe148cce1eff').then((u) =>setLength(u.length));

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL EVENT
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EventIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
