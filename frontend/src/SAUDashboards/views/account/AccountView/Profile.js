import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';

let image;

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    avatar: '',
    jobTitle: '',
    name: ''
  });

  function displayImage(event) {
    if (!event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      alert('not an image');
    } else {
      values.avatar = URL.createObjectURL(event.target.files[0]);
      image = event.target.files[0];
      setValues({ ...values });
    }
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={values.avatar}
            onChange={displayImage}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {values.name}
          </Typography>

          {/* <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            slsls
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export { image };
export default Profile;
