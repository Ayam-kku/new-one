import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  makeStyles
} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import { Search as SearchIcon } from 'react-feather';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Popup from '../../../../PresidentDashboards/views/ClubDashboard/controls/Popup';
import { red,green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const RedRadio = withStyles({
  root: {
    color: red[600],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function postClubInfo(data) {
  axios({
                  method: 'put',
                  url: `/api/club/${data._id}`,
                  data: qs.stringify(data),
                  headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                  }
                })
                  .then(response =>{
                     alert('data saved..');
                  })
                  .catch(error =>{
                    alert(`Error : + ${error.response.data.message}`);
                  })
          
}
const Toolbar = ({ className,club,...rest }) => {
  const classes = useStyles();

  const handleClick = () => {
    
  };
  const [value, setValue] = React.useState('Acceptance');
  const [valueText, setValueText] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChangeText = (event) => {
    setValueText(event.target.value);
  };
const [openPopup, setOpenPopup] = useState(false)
const openInPopup = item => {
    setOpenPopup(true)
}

const handleClickReplay = () => {
    setOpenPopup(true);
  };
  console.log(club.statusofplan);
  return (
    <div
    className={clsx(classes.root, className)}
    {...rest}
  >

    <Box mt={3}>
      <Card>
        <CardContent style={{ position:'relative' }}>
          <Box 
          display="flex"
          justifyContent="space-between"
          flex-direction="column"
          >
        
        <Grid 
           container
           direction="row"
           justify="flex-end"
           alignItems="center"
          >
        <Button
        style={{ background:"#1E8449", color:'#ffffff',marginRight:"10px" }}
        variant="contained"
        onClick={handleClickReplay}
        disabled={(club.statusofplan === "Under review" || club.statusofplan === "Approved") ? false : true}
        >
          Replay
        </Button>
      </Grid>
      </Box>
        </CardContent>
      </Card>
    </Box>
    <Popup
                    title="Confirm the status"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >                  
                      <RadioGroup aria-label="status" name="status1" value={value} onChange={handleChange}>
                          <FormLabel>Status of the request</FormLabel>
                          <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                          >
                            <Grid item>
                            <FormControlLabel
                              value="Acceptance"
                              control={<Radio />}
                              label="Acceptance"
                            />
                            </Grid>
                            
                            <Grid item>
                            <FormControlLabel
                              value="Rejection"
                              control={<RedRadio />}
                              label="Rejection"
                            />
                            </Grid>
                          </Grid>
                          </RadioGroup>
                                    {value === "Rejection" && (
                                      <Box mt={3}>
                                                      <TextField
                                                            fullWidth
                                                            label="Why rejection?"
                                                            margin="normal"
                                                            name="eventDesc"
                                                            multiline
                                                            rows={4}
                                                            value={valueText}
                                                            onChange={handleChangeText}
                                                            variant="outlined"
                                                      />  
                                      </Box>
                                    )}

                            <Box mt={3}>
                                        <Button
                                          color="primary"
                                          fullWidth
                                          size="large"
                                          type="submit"
                                          variant="contained"
                                          style={{ background: '#1E8449' }}
                                          onClick={(()=>{
                                            if (value === 'Acceptance') {
                                                club.statusofplan = "Approved";
                                                postClubInfo(club);
                                            }
                                            else {
                                              club.statusofplan = "Edit";
                                              club.notefromstu = valueText;
                                              postClubInfo(club);
                                              navigate('/app/studentactivityunit/club');
                                            }
                                          })}
                                        >
                                          Save
                                        </Button>  
                            </Box>
                  </Popup>
  </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
