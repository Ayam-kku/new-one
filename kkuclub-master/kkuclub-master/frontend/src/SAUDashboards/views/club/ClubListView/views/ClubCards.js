import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  makeStyles,
  CardMedia
} from '@material-ui/core';
import axios from "axios";
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { changeStatusOfStateToStartUpdate,addInfoCollege,addInfoUsers,addInfoClub,changeStatusOfStateToStartInfo,presidState,pioState } from '../actions/clubs';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  }
}));

function updateInfoOfPositionOfPre(user) {
  axios({
      method: 'put',
      url: `/api/users/${user._id}`,
      data: qs.stringify(user),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
      .then((response) =>{
      })
      .catch((error) =>{
          alert(`Error : + ${error.response.data.message}`);
      });
} 

function updateInfoOfPositionOfPio(user) {
axios({
    method: 'put',
    url: `/api/users/${user._id}`,
    data: qs.stringify(user),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
    .then((response) =>{
    })
    .catch((error) =>{
        alert(`Error : + ${error.response.data.message}`);
    });
}
function deleteDataFromDB(id) {
  axios({
      method: 'delete',
      url: `/api/club/${id}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
      .then((response) =>{
      })
      .catch((error) =>{
          alert(`Error : + ${error.response.data.message}`);
      });
}

export function fetchColleges() {
  return function (dispatch) {
    return axios.get("/api/college")
      .then(({ data }) => {
      dispatch(addInfoCollege(data));
    });
  };
}

export function fetchUsers() {
  return function (dispatch) {
    return axios.get("/api/users")
      .then(({ data }) => {
      dispatch(addInfoUsers(data));
    });
  };
}

export function fetchClub() {
  return function (dispatch) {
    return axios.get("/api/club")
      .then(({ data }) => {
      dispatch(addInfoUsers(data));
    });
  };
}




const ClubCard = ({ className, club: club, ...rest }) => {
  function uploadDataToDB(info) {
    axios({
        method: 'put',
        url: `/api/club/${club._id}`,
        data: qs.stringify(info),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
        .then((response) =>{
          alert("Upda")
        })
        .catch((error) =>{
            alert(`Error : + ${error.response.data.message}`);
        });
  }
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeForSwitche = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
              club.activeClub = event.target.checked;
              uploadDataToDB(club);
              console.log('yes');
  };

  const [state, setState] = React.useState({
    checkedA: club.activeClub === "true" ? true : false,  
  });


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
    <FormControlLabel
        control={<Switch checked={state.checkedA} onChange={handleChangeForSwitche} name="checkedA" />}
        label="Active"
      />
    <Divider />
    <CardMedia 
     onClick={() => {
      navigate('/app/studentactivityunit/club/detail', { state: club });
    }}
    >
      <Box
          display="flex"
          justifyContent="center"
          mb={1}
        >
          <Avatar
            alt="club"
            src={`http://localhost:5000/uploads\\image.jpeg`}
            className={classes.large}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {club.clubName}
        </Typography>

        <Typography
          align="center"
          color="primary"
          gutterBottom
          variant="h5"
        >
          {club.college.name}
        </Typography>
    </CardMedia>          
      <CardContent>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          Pioneer: <button 
          style={{ color:'#1E8449',background:'none',border:'none',outlineWidth:0 }} 
          onClick={() => {
            dispatch(changeStatusOfStateToStartInfo());
            dispatch(pioState());
            dispatch(addInfoClub(club));
          }}>{club.pioneer.name}</button>
        </Typography>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          President: <button 
          style={{ color:'#1E8449',background:'none',border:'none',outlineWidth:0 }} 
          onClick={() => {
            dispatch(changeStatusOfStateToStartInfo());
            dispatch(presidState());
            dispatch(addInfoClub(club));
          }}>{club.president.name}</button>
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              display="inline"
              variant="body2"
            >
              Type: <span style={{ color:'#1E8449' }}>{club.clubType}</span>
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
          <IconButton 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this information?')) {
                         
                        //when delete club will remove pre and pionner
                        if (club.president.postion.typePos !== "") {
                          club.president.postion.typePos = "";
                          club.president.postion.clubName = "";                         
                         updateInfoOfPositionOfPre(club.president);
                        }

                        if (club.pioneer.postion.typePos !== "") {
                          club.pioneer.postion.typePos = "";
                          club.pioneer.postion.clubName = "";
                         updateInfoOfPositionOfPio(club.pioneer);
                        }

                        deleteDataFromDB(club._id);
                      }
                    }} 
                    style={{ color:"#C43F3F" }} 
                    aria-label="Delete" 
                    align="center">
                      <DeleteIcon />
         </IconButton>

         <IconButton 
                    onClick={() => {
                      dispatch(changeStatusOfStateToStartUpdate());
                      dispatch(fetchColleges());
                      dispatch(fetchUsers());
                      dispatch(addInfoClub(club));
                    }} 
                    style={{ color:"#1E8449" }} 
                    aria-label="Update">
                      <CreateIcon />
         </IconButton>


          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ClubCard.propTypes = {
  className: PropTypes.string,
  club: PropTypes.object.isRequired
};

export default ClubCard;
