import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { red,green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Grid
} from '@material-ui/core';
import { postClubInfo } from './clubService';


const Toolbar = ({ className,club,...rest }) => {
  const [value,setValue] = useState(club.notefrompioneer === "" ? club.notefromstu:club.notefrompioneer); 
  return (       
                          <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                          >

                              <TextField
                                fullWidth
                                label="Notes"
                                margin="normal"
                                name="eventDesc"
                                multiline
                                rows={4}
                                value={value}
                                variant="outlined"
                                />  
                        </Grid>    
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
