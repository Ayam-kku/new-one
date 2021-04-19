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
import { changeStatusOfStateToStart, changeStatusOfSearch } from './actions/index';
import AddCollege from './component/addCollege';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));


const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const status = useSelector((state) => state.state);
  const dispatch = useDispatch();

  const [screen, setScreen] = useState(window.matchMedia("(min-width: 800px)").matches);
  useEffect(() => {
    const handler = (e) => { return setScreen(e.matches); };
    window.matchMedia("(min-width: 800px)").addListener(handler);
  });

  const handleClick = () => {
    dispatch(changeStatusOfStateToStart());
  };

  const changeSearchItem = (event) => {
    dispatch(changeStatusOfSearch(event.target.value));
  }

  return (
    <div className='flex lg:flex bg-white p-5 rounded shadow md:flex sm:flex justify-between '
    >
  {status === true && (<AddCollege />)}
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
              onChange={changeSearchItem}
              placeholder="Search college"
              variant="outlined"
            />
            </div>
        <Button
        style={{ background:"#1E8449", color:'#ffffff' }}
        variant="contained"
        onClick={handleClick}
      >
        Add college
      </Button>
  </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
