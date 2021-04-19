import React, { useState, useEffect } from 'react';
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
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusOfStateToStart,changeStatusOfSearch } from './actions/index';
import AddUser from './component/addUser';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    direction: 'rtl',
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const status = useSelector((state) => state.state);
  const dispatch = useDispatch();

const handleClick = () => {
  dispatch(changeStatusOfStateToStart());
};
  const changeSearchItem = (event) => {
    dispatch(changeStatusOfSearch(event.target.value));
  }
  return (
    <StylesProvider jss={jss}>
    <div className='flex lg:flex bg-white p-5 rounded shadow md:flex sm:flex justify-between '
    >
    {status === true && (<AddUser />)}
        <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-1/2">
              <TextField
                fullWidth
                onChange={changeSearchItem}
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
                placeholder="Search user"
                variant="outlined"
              />
          </div>   
          <Button
            style={{ background:"#1E8449", color:'#ffffff' }}
            variant="contained"
            onClick={handleClick}
          >
          Add user
          </Button>
    </div>
    </StylesProvider>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
