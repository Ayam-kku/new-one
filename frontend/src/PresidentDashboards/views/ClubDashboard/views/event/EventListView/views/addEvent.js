import React, { Component, useState,useEffect,useMemo } from 'react';
import {useDropzone} from 'react-dropzone';
import Modal from 'react-awesome-modal';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Grid
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
import { addInfoClub,addPosition } from '../actions/clubs';
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


const AddEvent = () => {
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
    eventBudget :""
  });

  const getDataClub = async () => {
    const res = await axios('/api/club?id=604ea20dd0367415e82112af');
    return res.data;
  }

const getTypeEvent = async () => {
    const res = await axios('/api/Event-Type');
    return res.data;
  }
  let [typeEvent,setTypeEvent] = React.useState([]);
  let [typeEventItem,setTypeEventItem] = React.useState({
    name:"",
    description:""
  });
    function changeType(event) {
      if (event.target.value !== 'default') {
      let obj = JSON.parse(event.target.value); //object
      setTypeEventItem(obj);
      }
      else {
        setTypeEventItem({
          name:"",
          description:""
         }); 
      }
    }



    let [club,setClub] = React.useState({});
    //this for change status of club in dispatch
    let [Infoclub,setInfoClub] = React.useState({});

useEffect(()=>{
    getDataClub().then((u)=>{
      setClub(u);
    });

    getTypeEvent().then((u)=>{
      setTypeEvent(u);
    });

    //here the dispatch
    dispatch(addInfoClub(Infoclub));
    dispatch(addPosition(Infoclub));
    
},[]);

  function uploadDataToDB() {
      axios({
          method: 'put',
          url: `/api/club/604ea20dd0367415e82112af`,
          data: qs.stringify(club),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
          .then((response) =>{
            alert('data added');
          })
          .catch((error) =>{
              alert(`Error : + ${error.response.data.message}`);
          });
  }
  


//for select Date
  const [selectedDate, setDateChange] = useState(new Date());
  const handleDateChange = (e) => {
    setDateChange(e);
  };
//----------------------------


//for map
  const [openPopup, setOpenPopup] = useState(false)
  const openInPopup = (item) => {
    setOpenPopup(true)
  }
//----------------------------


//for image
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const thumbsContainer = {
    display: 'flex',
    justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 130,
    height: 130,
    padding: 2,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  const style = useMemo(() => ({
    ...baseStyle,
  }));

  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    maxFiles:1,
    init: function() {
          this.on("maxfilesexceeded", function(file) {
                this.removeAllFiles();
                this.addFile(file);
          });
    }   
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));


    return (
        <div>
          <Formik
            initialValues={{
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
                eventbudget :"",
                eventDisply:true,
                eventImage:""
            }}
            validationSchema={
                Yup.object().shape({
                  eventName: Yup.string().max(255).required('event name is required'),
                  eventbudget: Yup.string().max(255).required('event budget is required'),
                  eventPresenter: Yup.string().max(255).required('event presenter is required'),
                  eventCoordinator: Yup.string().max(255).required('event coordinator is required'),
                  eventDesc: Yup.string().required('event description is required'),
                })
              }  
            onSubmit={(info) => {
                let arr = club.event;     
                info.evenDay = selectedDate.getUTCDay();
                info.evenDate = selectedDate.toDateString();
                info.evenTime = selectedDate.getTime();
                info.eventPosition.lat = status.lat;
                info.eventPosition.lng = status.lng;
                info.eventType = typeEventItem;
                info.eventImage = files[0];

                arr.push(info);
                club.event = arr;
                console.log(info);
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
                                                          onChange={changeType}
                                                          >
                                                          <option value="default">Select Event Type</option>                             
                                                          {typeEvent !== undefined && typeEvent.map((item,index) =>(
                                                            <option key={item._id} value={JSON.stringify(item)}>{item.name}</option>
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
                    variant="contained"
                    style={{ background: '#1E8449' }}
                  >
                    Add Event
                  </Button>  
                </Box>

              </form>
            )}     
            </Formik>        
        </div>
    );
};



export default AddEvent;
