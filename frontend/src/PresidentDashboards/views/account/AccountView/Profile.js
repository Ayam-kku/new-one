import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import axios from "axios";
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

function uploadDataToDB(data) {
  axios({
      method: 'put',
      url: `/api/club/6071d194d7edbe148cce1eff`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) =>{
        alert('data updated...'); 
      })
      .catch((error) =>{
          alert(`Error : + ${error.response.data.message}`);
      });
}

const Profile = ({ className,club,...rest }) => {
  const classes = useStyles();
  const [image, setImage] = useState({
    src: `http://localhost:5000/${club.Userimg === undefined ? "" : club.Userimg}`
  });
  console.log(club.Userimg); 
  function displayImage(event) {
       console.log(event.target.files[0]);
    if (!event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      alert('not an image');
    } 
    else {
      console.log(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
      let formd = new FormData();
      formd.append("Userimg",event.target.files[0]);
      uploadDataToDB(formd);
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
            src={image.src}
            onChange={displayImage}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {club.clubName}
          </Typography>

          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {club.clubType}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    {/* <CardActions>
      {/* <input type="file" onChange={displayImage}/> */}
      {/* <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button> */}
    {/* </CardActions> */}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export { image };
export default Profile;
