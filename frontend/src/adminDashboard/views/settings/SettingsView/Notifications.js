import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Notifications
              </Typography>
              <FormControlLabel
                control={(
                  <Checkbox 
                  defaultChecked
                  style={{ color:'#1E8449' }}
                  />
                )}
                label="Email"
              />
              <FormControlLabel
                control={(
                  <Checkbox 
                  defaultChecked
                  style={{ color:'#1E8449' }}
                  />
                )}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Text Messages"
              />
              <FormControlLabel
                control={(
                  <Checkbox 
                  defaultChecked
                  style={{ color:'#1E8449' }}
                  />
                )}
                label="Phone calls"
              />
            </Grid>
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Messages
              </Typography>
              <FormControlLabel
                control={(
                  <Checkbox 
                  defaultChecked  
                  style={{ color:'#1E8449' }}
                  />
                )}
                label="Email"
              />
              <FormControlLabel
                control={(
                  <Checkbox 
                  style={{ color:'#1E8449' }}
                  />
                )}
                label="Push Notifications"
              />
              <FormControlLabel
                control={(
                  <Checkbox 
                  defaultChecked
                  style={{ color:'#1E8449' }}
                  />
                )}
                label="Phone calls"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            style={{ background:'#1E8449', color:"#ffffff" }}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
