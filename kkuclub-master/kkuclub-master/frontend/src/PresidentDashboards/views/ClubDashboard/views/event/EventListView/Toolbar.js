import React, { useState,useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import { useSelector, useDispatch } from 'react-redux';
import { Search as SearchIcon } from 'react-feather';
import axios from "axios";
import PrintIcon from '@material-ui/icons/Print';
import AddEvent from './views/addEvent';
import UpdateClub from "./views/updateClub";
import MoreInfoUser from "./views/moreInfoUser";
import Popup from './views/Popup';
import { ComponentToPrintE } from '../../../../../../modelsForPrint/eventToPrint';

import { addInfoCollege,addInfoUsers } from './actions/clubs';

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

const Toolbar = ({ className,clubInfo, ...rest }) => {
  const classes = useStyles();

  const status2 = useSelector((state) => state.stateUpdate);
  const status3 = useSelector((state) => state.stateInfoUser);
  const dispatch = useDispatch();


  //for open popup add
  const [openPopup, setOpenPopup] = useState(false);
  const openInPopup = (item) => { setOpenPopup(true); }
  //-------------

  const [screen, setScreen] = useState(window.matchMedia("(min-width: 800px)").matches);
  useEffect(() => {
    const handler = (e) => { return setScreen(e.matches); };
    window.matchMedia("(min-width: 800px)").addListener(handler);
  });

  const handleClick = () => {
    setOpenPopup(true);
    dispatch(fetchColleges());
    dispatch(fetchUsers());
  };

  //print
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});


  return (
    <div
    className={clsx(classes.root, className)}
    {...rest}
  >

      <Popup
          title="Add event"
          maxWidth="md"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
      >
          <AddEvent />
      </Popup>

      <Popup
          title="Update event"
          maxWidth="md"
          openPopup={status2}
          updatePopUpEvent={true} 
      >
          <UpdateClub />
        </Popup>
                         
  {(status3 === true) && (<MoreInfoUser />)}

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
                          onClick={handleClick}
                        >
                          Add event
                        </Button>

                        {clubInfo.event !== undefined && clubInfo.event.length > 0 && (     
                        <div style={{ display:'none' }}>
                        <ComponentToPrintE clubInfo={clubInfo.event} ref={componentRef} /> 
                        </div>     
                        )}
                        <Button
                          style={{ background:"#1E8449", color:'#ffffff' }}
                          variant="contained"
                          onClick={handleClick}
                          startIcon={<PrintIcon />}
                          onClick={handlePrint}

                        >
                          Print
                        </Button>
        </Grid>

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
