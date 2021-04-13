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
import DescriptionIcon from '@material-ui/icons/Description';
import DateFnsUtils from '@date-io/date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import qs from 'qs';
import { values } from 'lodash';

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


const AddEvent = (props) => {
    const classes = useStyles();    
    
    function uploadDataToDB(data) {
      axios({
          method: 'post',
          url: '/api/EventReport',
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((response) =>{
            alert('data added');
          })
          .catch((error) =>{
              alert(`Error : + ${error.response.data.message}`);
          });
  }


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
      <div key={file.name}>
        <div>
          <p>{file.name}</p>
        </div>
      </div>
    ));

    return (
        <div>
          <Formik
            initialValues={{
                eventName :props.club.eventName,
                eventType :props.club.eventType.name,
                evenDate :props.club.evenDate,
                eventPlace :"",
                eventHours :"",
                eventInformation:"",
                eventIntroduction:"",
                eventBeneficiaries :"",
                eventOrganizers :""
            }}
            validationSchema={
                Yup.object().shape({
                  eventInformation : Yup.string().required('event information is required'),
                  eventIntroduction : Yup.string().required('event introduction is required'),
                  eventHours : Yup.string().required('event hours is required'),
                  eventPlace : Yup.string().required('event place is required'),
                  eventOrganizers : Yup.string().required('event organizers is required'),
                  eventBeneficiaries : Yup.string().required('event beneficiaries is required'),
                })
              }  
            onSubmit={(info) => {
              let formd = new FormData();
              formd.append("Userimg",files[0]);
              formd.append("name",info.eventName);
              formd.append("eventType",info.eventType);
              formd.append("evenDate",info.evenDate);
              formd.append("eventInformation",info.eventInformation);
              formd.append("eventBeneficiaries",info.eventBeneficiaries);
              formd.append("eventOrganizers",info.eventOrganizers);
              formd.append("eventIntroduction",info.eventIntroduction);
              formd.append("eventHours",info.eventHours);
              formd.append("eventPlace",info.eventPlace);

              uploadDataToDB(formd);
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


                        <Grid item xs={6}>
                                      <TextField
                                          fullWidth
                                          label="Event Name"
                                          margin="normal"
                                          name="eventName"
                                          value={values.eventName}
                                          variant="outlined"
                                        />
                        </Grid>

                        <Grid item xs={6}>
                                  <TextField
                                          fullWidth
                                          label="Event Type"
                                          margin="normal"
                                          name="eventType"
                                          value={values.eventType}
                                          variant="outlined"
                                        />
                        </Grid>
   

                                {/* forth row */}


                            <Grid item xs={6}>
                                          <TextField
                                               error={Boolean(touched.eventOrganizers && errors.eventOrganizers)}
                                               fullWidth
                                               helperText={touched.eventOrganizers && errors.eventOrganizers}
                                               label="Event Organizers"
                                               margin="normal"
                                               name="eventOrganizers"
                                               required
                                               onBlur={handleBlur}
                                               onChange={handleChange}
                                               value={values.eventOrganizers}
                                               variant="outlined"
                                            />
                            </Grid>

                            <Grid item xs={6}>
                                      <TextField
                                               fullWidth
                                               label="Event Beneficiaries"
                                               margin="normal"
                                               name="eventBeneficiaries"
                                               value={values.eventBeneficiaries}
                                               onChange={handleChange}
                                               variant="outlined"
                                            />
                            </Grid>


                                    {/* third rows */}
 

                                    <Grid item xs={4}>
                                                <TextField
                                                    error={Boolean(touched.eventHours && errors.eventHours)}
                                                    fullWidth
                                                    helperText={touched.eventHours && errors.eventHours}
                                                    label="Event Hours"
                                                    margin="normal"
                                                    name="eventHours"
                                                    required
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.eventHours}
                                                    variant="outlined"
                                                  />
                          </Grid>

                          <Grid item xs={4}>
                                                <TextField
                                                    error={Boolean(touched.eventPlace && errors.eventPlace)}
                                                    fullWidth
                                                    helperText={touched.eventPlace && errors.eventPlace}
                                                    label="Event Place"
                                                    margin="normal"
                                                    name="eventPlace"
                                                    required
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.eventPlace}
                                                    variant="outlined"
                                                  />
                          </Grid>

                          <Grid item xs={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Even Date"
                                                    margin="normal"
                                                    name="eventHours"
                                                    value={values.evenDate}
                                                    variant="outlined"
                                                  />
                          </Grid>

                                      {/* sec rows */}
                                      
                          <Grid item xs={12}>
                                            <TextField
                                                    error={Boolean(touched.eventIntroduction && errors.eventIntroduction)}
                                                    fullWidth
                                                    helperText={touched.eventIntroduction && errors.eventIntroduction}
                                                    label="Event Introduction"
                                                    margin="normal"
                                                    name="eventIntroduction"
                                                    required
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.eventIntroduction}
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                  />                      
                          </Grid>

                          <Grid item xs={12}>
                                            <TextField
                                                    error={Boolean(touched.eventInformation && errors.eventInformation)}
                                                    fullWidth
                                                    helperText={touched.eventInformation && errors.eventInformation}
                                                    label="Event Information"
                                                    margin="normal"
                                                    name="eventInformation"
                                                    required
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.eventInformation}
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                  />                      
                          </Grid>

                    
                          <Grid container item xs={12} alignContent="center" justify="center">
                                          <div className="container">
                                    <div {...getRootProps({style})}>
                                        <input {...getInputProps()} />
                                        <p>Drag or click to select image for user</p>
                                    </div>
                                        <aside style={thumbsContainer}>
                                          {thumbs}
                                        </aside>
                                </div> 
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
                    Add Report
                  </Button>  
                </Box>

              </form>
            )}     
            </Formik>        
        </div>
    );
};



export default AddEvent;
