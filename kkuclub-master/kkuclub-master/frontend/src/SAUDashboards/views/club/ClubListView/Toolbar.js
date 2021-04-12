import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Search as SearchIcon } from 'react-feather';
import axios from "axios";
import AddClub from './views/addClub';
import UpdateClub from "./views/updateClub";
import MoreInfoUser from "./views/moreInfoUser";
import { changeStatusOfStateToStart,addInfoCollege,addInfoUsers } from './actions/clubs';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));


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
      console.log(data,'io');  
      dispatch(addInfoUsers(data));
    });
  };
}

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const status = useSelector((state) => state.closepopup);
  const status2 = useSelector((state) => state.stateUpdate);
  const status3 = useSelector((state) => state.stateInfoUser);
  const dispatch = useDispatch();


  const [screen, setScreen] = useState(window.matchMedia("(min-width: 800px)").matches);
  useEffect(() => {
    const handler = (e) => { return setScreen(e.matches); };
    window.matchMedia("(min-width: 800px)").addListener(handler);
  });

  const handleClick = () => {
    dispatch(changeStatusOfStateToStart());  
    dispatch(fetchColleges());
    dispatch(fetchUsers());
  };

  return (
    <div
    className={clsx(classes.root, className)}
    {...rest}
  >

  {status === true && (<AddClub />)}
  {(status2 === true) && (<UpdateClub />)}
  {(status3 === true) && (<MoreInfoUser />)}

    <Box mt={3}>
      <Card>
        <CardContent style={{ position:'relative' }}>
          <Box 
          maxWidth={500}
          display="flex"
          justifyContent="space-between"
          flex-direction="column"
          >
          { screen === true ? (
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search club"
              variant="outlined"
            />)
             : (
              <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search college"
              variant="outlined"
            />
            ) }
            
            { screen === true ? (
              
            <Button
            style={{ background:"#1E8449", color:'#ffffff', position: "absolute", right: "0px", marginRight:"18px", marginTop:"6px", padding:"12px" }}
            variant="contained"
            onClick={handleClick}
            >
            Add club
          </Button>
          ) : (
        <Button
        style={{ background:"#1E8449", color:'#ffffff' }}
        variant="contained"
        onClick={handleClick}
      >
        Add club
      </Button>
          )}

      </Box>
        </CardContent>
      </Card>
    </Box>
  </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
