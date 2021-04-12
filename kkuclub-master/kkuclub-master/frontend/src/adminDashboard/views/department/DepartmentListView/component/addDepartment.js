import React, { Component, useState,useEffect } from 'react';
import Modal from 'react-awesome-modal';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import qs from 'qs';
import { getDataCollege } from '../connectDB/getdata';

import { changeStatusOfStateToFalse } from '../actions/index';

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


const AddDepartment = () => {

    let [colleges,setColleges] = React.useState([]);
    const [type, setType] = React.useState();
    useEffect(()=>{
      getDataCollege().then((u) =>{ setColleges(u); });
    },[]);
    const classes = useStyles();
    const status = useSelector((state) => state.state);
    const dispatch = useDispatch();

    let [department] = React.useState({
      name: '',
      building: '',
      college: ''
  });

    function closeModal() {
        dispatch(changeStatusOfStateToFalse());
    }

    function changeType(event) {
      setType(event.target.value);
    }
    
    function uploadDataToDB() {
      axios({
          method: 'post',
          url: '/api/department',
          data: qs.stringify(department),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
          .then((response) =>{
            alert('data added');
            closeModal();
          })
          .catch((error) =>{
              alert(`Error : + ${error.response.data.message}`);
          });
  }

    return (
        <section>
            <Modal visible={status} width="auto" height="auto" effect="fadeInUp" onClickAway={() => closeModal()}>
                <div>
                <Container maxWidth="sm">
          <Formik
            initialValues={{
              name: '',
              building:'',
              college: '',
              link:''
            }}
            validationSchema={
              Yup.object().shape({
                name: Yup.string().max(255).required('name is required'),
                building: Yup.string().max(255).required('building is required'),
                link: Yup.string().max(255).required('link is required')
              })
            }
            onSubmit={(info) => {
                department.name = info.name;
                department.building = info.building;
                department.college = type;
                department.link = info.link;
                uploadDataToDB();    
            }}
            onChange={(event) => {
              setType(event.target.value);
          }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              touched,
              handleChange,
              values
            }) => (
              <form onSubmit={handleSubmit}>

                <Box mb={1}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    style={{ paddingTop: "20px" }}
                  >
                    Add new department
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="name"
                  margin="normal"
                  name="name"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />


                <TextField
                  error={Boolean(touched.building && errors.building)}
                  fullWidth
                  helperText={touched.building && errors.building}
                  label="building"
                  margin="normal"
                  name="building"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.building}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.link && errors.link)}
                  fullWidth
                  helperText={touched.link && errors.link}
                  label="link"
                  margin="normal"
                  name="link"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.link}
                  variant="outlined"
                />

                
   <FormControl variant="outlined" className={classes.formControl} style={{ margin:"0 auto", marginTop:10, width:"100%" }}>
                        <Select
                        native
                        value={type}
                        onChange={changeType}
                        label="college"
                        inputProps={{
                            name: 'college',
                            id: 'outlined-age-native-simple',
                        }}
                        >
                        <option value="default">Select a college</option>  
                        {colleges.map((college)=>(
                          <option value={college.name}>{college.name}</option>
                        ))}  
                        </Select>
                  </FormControl>


                <Box my={1}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    style={{ background: '#1E8449' }}
                  >
                    Add department
                  </Button>
                </Box>
              </form>
            )}
                </Formik>
            </Container>
        </div>
            </Modal>
        </section>
    );
};

export default AddDepartment;
