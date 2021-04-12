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
import MoreInfoUser from "./views/moreInfoUser";
import Popup from './views/Popup';


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

  const status3 = useSelector((state) => state.stateInfoUser);


  const [screen, setScreen] = useState(window.matchMedia("(min-width: 800px)").matches);
  useEffect(() => {
    const handler = (e) => { return setScreen(e.matches); };
    window.matchMedia("(min-width: 800px)").addListener(handler);
  });


  return (
    <div
    className={clsx(classes.root, className)}
    {...rest}
  >

                         
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
