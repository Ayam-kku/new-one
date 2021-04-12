import React, { Component, useState,useEffect } from 'react';
import Modal from 'react-awesome-modal';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import DateFnsUtils from '@date-io/date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import qs from 'qs';
import Popup from './Popup';
import Map from './mapForLocation';
import { addInfoClub,addPosition,openupdateDate } from '../actions/clubs';

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));


const UpdateEvent = () => {
    const classes = useStyles();    
    const status = useSelector((state) => state.positionEvent);
    const dispatch = useDispatch();

  let [event] = React.useState({
    eventName :"",
    eventDesc :"",
    eventType :"",
    eventPresenter : "",
    eventCoordinator : "",
    eventPosition:{
      lat:"",
      lng:""
    },
    evenDay :"",
    evenDate :"",
    evenTime :"",
    eventBudget :"",
    eventDisply :""
  });



//---for type  
  const getTypeEvent = async () => {
    const res = await axios('/api/Event-Type');
    return res.data;
  }
  const info = useSelector((state) => state.stateClub);
  let nameOfEvent = info.eventName;
  let [typeEvent,setTypeEvent] = React.useState([]);
  let [typeEventItem,setTypeEventItem] = React.useState({
    name:"",
    description:""
  });
  function changeType(event) {
    if (event.target.selectedOptions[0].dataset.values!== 'default') {
    let obj = JSON.parse(event.target.selectedOptions[0].dataset.values); //object
    setTypeEventItem(obj);
    }
    else {
      setTypeEventItem("default");
      setTypeEventItem({
        name:"",
        description:""
       }); 
    }
  }
//--------------


//for select Date
  const [selectedDate, setDateChange] = useState(new Date(parseInt(info.evenTime)));
  const handleDateChange = (e) => {
    setDateChange(e);
  };
//----------------------------

const getDataEvents = async () => {
  const res = await axios('/api/club?id=6071d194d7edbe148cce1eff');
  return res.data;
}
let [allEvents,setAllEvents] = React.useState([]);
let [Infoclub,setInfoClub] = React.useState({});
function uploadDataToDB() {
  axios({
      method: 'put',
      url: `/api/club/6071d194d7edbe148cce1eff`,
      data: qs.stringify(allEvents),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
      .then((response) =>{
        alert('data updated');
        dispatch(addInfoClub(Infoclub));
        dispatch(addPosition(Infoclub));
      })
      .catch((error) =>{
          alert(`Error : + ${error.response.data.message}`);
      });
}
useEffect(()=>{
    getTypeEvent().then((u)=>{
      setTypeEvent(u);
    });
    setTypeEventItem(info.eventType);
    getDataEvents().then((u) =>{ setAllEvents(u); });
},[]);

//for map
  const [openPopup, setOpenPopup] = useState(false)
  const openInPopup = (item) => {
    setOpenPopup(true)
  }
//----------------------------
    return (
        <div>
          <Formik
            initialValues={{
                eventName :info.eventName,
                eventDesc :info.eventDesc,
                eventType :info.eventType,
                eventPresenter : info.eventPresenter,
                eventCoordinator : info.eventCoordinator,
                evenDay :info.evenDay,
                evenDate :info.evenDate,
                evenDate :info.evenDate,
                eventbudget :info.eventbudget,
                eventDisply:info.eventDisply,
                eventPosition:{
                  lat:info.eventPosition !== undefined ? info.eventPosition.lat:undefined,
                  lng:info.eventPosition !== undefined ? info.eventPosition.lng:undefined,
                  
                }
            }}
            validationSchema={
                Yup.object().shape({
                  eventName: Yup.string().max(255).required('event name is required'),
                  eventbudget: Yup.string().max(255).required('event budget is required'),
                  eventDesc: Yup.string().max(255).required('event description is required'),
                })
              }  
            onSubmit={(info) => {     
              let arr = allEvents.event;
              info.evenDay = selectedDate.getUTCDay();
              info.evenDate = selectedDate.toDateString();
              info.evenTime = selectedDate.getTime();
              info.eventPosition.lat = status.lat === undefined ? info.eventPosition.lat : status.lat;
              info.eventPosition.lng = status.lng === undefined ? info.eventPosition.lng : status.lng;
              info.eventType = typeEventItem;
              for(let i=0;i<arr.length;i++) {
                if (arr[i].eventName === nameOfEvent) {
                  arr[i] = info;
                  console.log(info);
                }
              }
              allEvents.event = arr;
              
              uploadDataToDB();

            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>

                <Divider variant="middle" />

                <Grid container spacing={2}>  


                        <Grid item xs={4}>
                                      <TextField
                                          error={Boolean(touched.clubName && errors.clubName)}
                                          fullWidth
                                          helperText={touched.clubName && errors.clubName}
                                          label="Event Name"
                                          margin="normal"
                                          name="eventName"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.eventName}
                                          variant="outlined"
                                        />
                        </Grid>

                        <Grid item xs={4}>
                                  <TextField
                                          error={Boolean(touched.eventPresenter && errors.eventPresenter)}
                                          fullWidth
                                          helperText={touched.eventPresenter && errors.eventPresenter}
                                          label="Event Presenter"
                                          margin="normal"
                                          name="eventPresenter"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.eventPresenter}
                                          variant="outlined"
                                        />
                        </Grid>

                        <Grid item xs={4}>
                                  <TextField
                                          error={Boolean(touched.eventCoordinator && errors.eventCoordinator)}
                                          fullWidth
                                          helperText={touched.eventCoordinator && errors.eventCoordinator}
                                          label="Event Coordinator"
                                          margin="normal"
                                          name="eventCoordinator"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.eventCoordinator}
                                          variant="outlined"
                                        />
                          </Grid>
   

                                      {/* sec rows */}
                          <Grid item xs={12}>
                                            <TextField
                                                    error={Boolean(touched.eventbudget && errors.eventbudget)}
                                                    fullWidth
                                                    helperText={touched.eventbudget && errors.eventbudget}
                                                    label="Event Description"
                                                    margin="normal"
                                                    name="eventDesc"
                                                    required
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.eventDesc}
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                  />                      
                          </Grid>

                                    {/* third rows */}
                          <Grid item xs={4}>
                                                      <FormControl variant="outlined" className={classes.formControl} style={{ margin:"0 auto", marginTop:17, width:"100%" }}>
                                                          <Select
                                                          native
                                                          name="eventType"
                                                          value={typeEventItem.name}
                                                          onChange={changeType}
                                                          >
                                                          <option value="default">Select Event Type</option>                             
                                                          {typeEvent !== undefined && typeEvent.map((item,index) =>(
                                                            <option key={item._id} value={item.name} data-values={JSON.stringify(item)}>{item.name}</option>
                                                          ))}
                                                          </Select>
                                                      </FormControl>
                          </Grid>

                          <Grid item xs={4}>
                                                    <Button variant="contained" 
                                                    color="secondary"
                                                    fullWidth
                                                    size="large"
                                                    style={{ marginTop:"25px" }}
                                                    startIcon={<AddLocationIcon />}
                                                    onClick={(() => {
                                                        setOpenPopup(true);
                                                      })}>set Location</Button>
                          </Grid>

                                        <Popup
                                          title="Event Location"
                                          maxWidth="sm"
                                          updateLat={info.eventPosition !== undefined ? info.eventPosition.lat:undefined}
                                          updateLong={info.eventPosition !== undefined ? info.eventPosition.lng:undefined}
                                          openPopup={openPopup}
                                          setOpenPopup={setOpenPopup}
                                      >
                                          <Map />
                                        </Popup>   

                          <Grid item xs={4}>
                                                <TextField
                                                    error={Boolean(touched.eventbudget && errors.eventbudget)}
                                                    fullWidth
                                                    helperText={touched.eventbudget && errors.eventbudget}
                                                    label="Event Budget"
                                                    margin="normal"
                                                    name="eventbudget"
                                                    required
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.eventbudget}
                                                    variant="outlined"
                                                  />
                          </Grid>
                  
                                    {/* forth row */}
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-evenly">
                    
                                                        <KeyboardDatePicker
                                                            margin="normal"
                                                            id="date-picker-dialog"
                                                            label="Date picker dialog"
                                                            format="MM/dd/yyyy"
                                                            value={selectedDate}
                                                            onChange={handleDateChange}
                                                            KeyboardButtonProps={{
                                                              'aria-label': 'change date',
                                                            }}
                                                        />
                                                        <KeyboardTimePicker
                                                            margin="normal"
                                                            id="time-picker"
                                                            label="Event time"
                                                            value={selectedDate}
                                                            onChange={handleDateChange}
                                                            KeyboardButtonProps={{
                                                              'aria-label': 'change time',
                                                            }}
                                                        />
                                      </Grid>
                                  </MuiPickersUtilsProvider>
                              </Grid> 
              </Grid>
                <Box my={3}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    onSubmit={handleSubmit}
                    onClick={(() => {
                      dispatch(openupdateDate());
                    })}
                    variant="contained"
                    style={{ background: '#1E8449' }}
                  >
                    Update Event
                  </Button>  
                </Box>

              </form>
            )}     
            </Formik>        
        </div>
    );
};



export default UpdateEvent;
