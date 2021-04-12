import React, { Component, useState,useEffect } from 'react';
import Modal from 'react-awesome-modal';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import qs from 'qs';
import { getDataCollege } from '../connectDB/getdata';
import Controls from "./Controls";
import { changeStatusOfStateToFalseUpdate } from '../actions/index';

const userTypeEliment = [
  { id:'Active', title:'Active' },
  { id:'InActive', title:'InActive' },
]

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


const UpdateUser = (props) => {
    const classes = useStyles();
    const [type, setType] = React.useState(props.user.usertype);
    const status = useSelector((state) => state.stateUpdate);
    const dispatch = useDispatch();
    
    let [colleges,setColleges] = React.useState([]);
    useEffect(()=>{
      getDataCollege().then((u) =>{ setColleges(u); });
    },[]);

    let [users] = React.useState({
      name: '',
      usertype: '',
      password: '',
      email: '',
      phone: '',
      status: '',
      jobID: '',
      Userimg: '',
      qualification: '',
      level: '',
      major: '',
      uniID: '',
      college: '',
      officeNo: ''
  });

    function closeModal() {
        dispatch(changeStatusOfStateToFalseUpdate());
    }

    function changeType(event) {
      setType(event.target.value);
    }
    
    function uploadDataToDB() {
      axios({
          method: 'put',
          url: `/api/users/${props.user._id}`,
          data: qs.stringify(users),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
          .then((response) =>{
            alert('data updated');
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
              name: props.user.name,
              email: props.user.email,
              password: props.user.password,
              usertype: props.user.usertype,
              status:props.user.status,
              phone: props.user.phone,
              uniID: props.user.uniID,
              jobID: props.user.jobID ,
              major: props.user.major ,
              college: props.user.college,
              level: props.user.level,
              qualification: props.user.qualification,
              officeNo: props.user.officeNo
            }}
            validationSchema={
                Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  name: Yup.string().max(255).required('name is required'),
                  password: Yup.string().max(255).required('password is required'),
                  phone: Yup.string().matches("^(009665|9665|9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$").required('phone is required')
                })
              }
            onSubmit={(info) => {
              users.name = info.name;
              users.email = info.email;
              users.status = info.status;
              users.password = info.password;
              users.phone = info.phone;
              users.usertype = type;
              users.uniID = info.uniID;
              users.jobID = info.jobID;
              users.major = info.major;
              users.college = info.college;
              users.level = info.level;
              users.qualification = info.qualification;
              users.officeNo = info.officeNo;
              users.Userimg = props.user.UserImg;
              if (users.usertype === "default") {
                alert("Select the type ..")
              }
              else if (type === "Dean" && (users.college === undefined || users.college === "default" || users.college === "")) {
                  alert("Enter college ..");
              }
              else {
              uploadDataToDB();
              }
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

                <Box mb={1}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    style={{ paddingTop: "20px" }}
                  >
                    Update the user
                  </Typography>
                </Box>

                <Grid container>  
                  <Grid item xs={6}>
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
                                          error={Boolean(touched.email && errors.email)}
                                          fullWidth
                                          helperText={touched.email && errors.email}
                                          label="email"
                                          margin="normal"
                                          name="email"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.email}
                                          variant="outlined"
                                        />
                                        <Controls.RadioGroup
                                                label="User Status:"
                                                name="status"
                                                value={values.status}
                                                onChange={handleChange}
                                                items={userTypeEliment}
                                                />

                                        <TextField
                                          error={Boolean(touched.password && errors.password)}
                                          fullWidth
                                          helperText={touched.password && errors.password}
                                          label="password"
                                          margin="normal"
                                          name="password"
                                          type="password"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.password}
                                          variant="outlined"
                                        />


                                        <TextField
                                          error={Boolean(touched.phone && errors.phone)}
                                          fullWidth
                                          helperText={touched.phone && errors.phone}
                                          label="phone"
                                          margin="normal"
                                          name="phone"
                                          required                                          
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.phone}
                                          variant="outlined"
                                        />
                  </Grid>

            <Grid item xs={6} style={{ paddingTop:"6px", paddingLeft:"20px" }}>

                <FormControl variant="outlined" className={classes.formControl} style={{ margin:"0 auto", marginTop:10, width:"100%" }}>
                        <Select
                        native
                        value={type}
                        defaultValue="admin"
                        onChange={changeType}
                        label="Type"
                        inputProps={{
                            name: 'type',
                            id: 'outlined-age-native-simple',
                        }}
                        >
                        <option value="default">Select User Type</option>
                        <option value="admin">Admin</option>
                        <option value="Student Activity Unit">Student Activity Unit</option>
                        <option value="Dean">Dean</option>
                        <option value="Staff">Staff</option>
                        <option value="Student">Student</option>
                        </Select>
                    </FormControl>
                    {/* here for dean as type */}

                  {type === "Dean" && (
                  <Grid container style={{ paddingTop:"14px" }}>  

                  <FormControl variant="outlined" className={classes.formControl} style={{ margin:"0 auto", marginTop:10, width:"100%" }}>
                        <Select
                        native
                        value={values.college}
                        onChange={handleChange}
                        label="College"
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

                  <Grid container spacing={1}>

                          <Grid item sm={12}>
                                <TextField
                                  required
                                  id="jobID"
                                  name="jobID"
                                  onChange={handleChange}
                                  value={values.jobID}
                                  inputProps={{
                                    maxLength: 10,
                                    minLength:9
                                  }}
                                  label="Unique Job Number"
                                  fullWidth
                                />
                              </Grid>

                              <Grid item sm={12}>
                                <TextField
                                  required
                                  id="major"
                                  name="major"
                                  onChange={handleChange}
                                  label="Major"
                                  value={values.major}
                                  fullWidth
                                />
                              </Grid>

                              <Grid item sm={12}>
                              <TextField
                                required
                                id="qualification"
                                name="qualification"
                                label="Qualification"
                                value={values.qualification}
                                fullWidth
                                onChange={handleChange}
                              />
                              </Grid>

                              <Grid item sm={12}>
                              <TextField
                                required
                                id="officeNo"
                                name="officeNo"
                                label="Office Number"
                                value={values.officeNo}
                                fullWidth
                                onChange={handleChange}
                              />
                              </Grid>
                          </Grid>    
                      </Grid>    
                      )}

                      {/* --------------------------------  */}

                      {type === "Staff" && (
                      <Grid container spacing={2}>
                      <Grid item sm={12}>
                        <TextField
                          required
                          id="jobID"
                          name="jobID"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.jobID}
                          type="number"
                          label="Unique Job Number"
                          fullWidth
                        />
                      </Grid>

                      <Grid item sm={12}>
                        <TextField
                          required
                          id="major"
                          name="major"
                          onBlur={handleBlur}
                          onChange={handleChange}                         
                          label="Major"
                          value={values.major}
                          fullWidth
                        />
                      </Grid>

                      <Grid item sm={12}>
                      <TextField
                        required
                        id="qualification"
                        name="qualification"
                        label="Qualification"
                        value={values.qualification}
                        fullWidth
                        onChange={handleChange}
                      />
                      </Grid>

                      <Grid item sm={12}>
                      <TextField
                        required
                        id="officeNo"
                        name="officeNo"
                        label="Office Number"
                        value={values.officeNo}
                        fullWidth
                        onChange={handleChange}
                      />
                      </Grid>
                    </Grid>    

              )}
              {/* ------------------------------ */}


          {type === "Student" && (
            <Grid container spacing={2}>

              <Grid item sm={12}>
                <TextField
                  required
                  id="uniID"
                  name="uniID"
                  onBlur={handleBlur}
                  onChange={handleChange} 
                  value={values.uniID}
                  type="number"
                  label="Unique University Number"
                  fullWidth
                />
              </Grid>

              <Grid item sm={12}>
              <FormControl variant="outlined" className={classes.formControl} style={{ margin:"0 auto", marginTop:10, width:"100%" }}>
                        <Select
                        native
                        value={values.college}
                        onChange={handleChange}
                        label="College"
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
              </Grid>  

              <Grid item sm={12}>
                <TextField
                  required
                  id="major"
                  name="major"
                  onBlur={handleBlur}
                  onChange={handleChange}                   
                  label="Major"
                  value={values.major}
                  fullWidth
                />
              </Grid>

            <Grid item xs={12}>
              <TextField
                required
                type="number"
                id="level"
                onBlur={handleBlur}
                onChange={handleChange} 
                name="level"
                label="Level"
                value={values.level}
                fullWidth
              />
            </Grid>

          </Grid>    
              )} 

              {/* --------------------------------  */}

          {type === "Student Activity Unit" && (
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <TextField
                  required
                  id="jobID"
                  name="jobID"
                  onChange={handleChange}
                  value={values.jobID}
                  type="number"
                  label="Unique Job Number"
                  fullWidth
                />
              </Grid>

            <Grid item sm={12}>
              <TextField
                required
                id="officeNo"
                name="officeNo"
                label="Office Number"
                value={values.officeNo}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>    
              )} 


            </Grid>    
                </Grid>
                <Box my={3}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    style={{ background: '#1E8449' }}
                  >
                    Update user
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

export default UpdateUser;
