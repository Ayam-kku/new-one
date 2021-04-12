import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from "axios";
import qs from 'qs';


import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { image } from './Profile';

const useStyles = makeStyles(() => ({
  root: {}
}));


const ProfileDetails = ({ className,clubMy, ...rest }) => {
  const classes = useStyles();
  let [club,setClub] = React.useState({
      Ext:clubMy.Ext,
      locationClub:clubMy.locationClub
  });


 
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

  const handleChange = (event) => {
    club[event.target.name] = event.target.value;
  };

  const handleClick = () => { 
    let formd = new FormData();
    formd.append("locationClub",club.locationClub);
    formd.append("Ext",club.Ext);
    uploadDataToDB(formd);
  };
 
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Club Information"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText={`location of club is ${clubMy.locationClub}`}
                label="Location of club"
                name="locationClub"
                onChange={handleChange}
                value={club.locationClub}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Ext Number"
                helperText={`Ext Number is ${clubMy.Ext}`}
                name="Ext"
                onChange={handleChange}
                value={club.Ext}
                variant="outlined"
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
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
