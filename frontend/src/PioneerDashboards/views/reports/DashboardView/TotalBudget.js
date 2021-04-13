import React, { useEffect, useState } from 'react';
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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { red,green } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { getBudget,getClub } from './services';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  }
}));
let value = 0;
const TotalCustomers = ({ className, ...rest }) => {
  const classes = useStyles();
  const [budget, setBudget] = useState(0);
  const [club, setClub] = useState({});

  getBudget('6071d194d7edbe148cce1eff').then((u) =>setBudget(u));

  useEffect(()=>{
     getClub('6071d194d7edbe148cce1eff').then((u)=>setClub(u));
  },[]);

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
              TOTAL BUDGET
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {budget}
            </Typography>
            {club.clubType === "Centralized" ? (
                        <Box>
                        {15000-budget < 0 ? (
                        <Box
                          display= 'flex'
                          alignItems= 'center'
                      >
                        <ArrowDownwardIcon style={{ color:'#ff0000' }} />
                        <Typography
                          style={{ color:'#ff0000' }}
                          variant="body2"
                        >
                        {15000-budget}
                        </Typography>
                    </Box>
                        ) : (
                            <Box
                              display= 'flex'
                              alignItems= 'center'
                          >
                            <ArrowUpwardIcon style={{ color:'#1E8449' }} />
                            <Typography
                              style={{ color:'#1E8449' }}
                              variant="body2"
                            >
                            {15000-budget}
                            </Typography>
                        </Box>
                        )}
                    </Box>
            ) : (
                <Box>
                {15000-budget < 0 ? (
                <Box
                  display= 'flex'
                  alignItems= 'center'
              >
                <ArrowDownwardIcon style={{ color:'#ff0000' }} />
                <Typography
                  style={{ color:'#ff0000' }}
                  variant="body2"
                >
                {10000-budget}
                </Typography>
            </Box>
                ) : (
                    <Box
                      display= 'flex'
                      alignItems= 'center'
                  >
                    <ArrowUpwardIcon style={{ color:'#1E8449' }} />
                    <Typography
                      style={{ color:'#1E8449' }}
                      variant="body2"
                    >
                    {10000-budget}
                    </Typography>
                </Box>
                )}
            </Box>
            )}
           
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
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
