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

  const handleClick = () => {
    dispatch(changeStatusOfStateToStart());  
    dispatch(fetchColleges());
    dispatch(fetchUsers());
  };

  return (
    <div className='flex lg:flex bg-white p-5 rounded shadow md:flex sm:flex justify-between '
    >
  {status === true && (<AddClub />)}
  {(status2 === true) && (<UpdateClub />)}
  {(status3 === true) && (<MoreInfoUser />)}

  <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-1/2">
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
            />
            </div>
        <Button
        style={{ background:"#1E8449", color:'#ffffff' }}
        variant="contained"
        onClick={handleClick}
      >
        Add club
      </Button>
  </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
