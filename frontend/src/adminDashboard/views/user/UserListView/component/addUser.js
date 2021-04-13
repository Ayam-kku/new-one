import React, { Component, useState,useMemo,useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import Modal from 'react-awesome-modal';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Grid,
  Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import qs from 'qs';
import Controls from "./Controls";
import { getDataCollege } from '../connectDB/getdata';
import { changeStatusOfStateToFalse } from '../actions/index';
import { StyledDropzone } from './Basic';

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


const AddUser = () => {
    const classes = useStyles();

    //here for if click dean as type
    let [colleges,setColleges] = React.useState([]);
    useEffect(()=>{
      getDataCollege().then((u) =>{ setColleges(u); });
    },[]);
  //----------------------------------------

 

  const [type, setType] = React.useState('');

    const status = useSelector((state) => state.state);
    const dispatch = useDispatch();

    let [users] = React.useState({
      name: '',
      usertype: '',
      password: '',
      email: '',
      phone: '',
      status: '',
      jobID: '',
      postion: '',
      qualification: '',
      Userimg:'',
      level: '',
      major: '',
      uniID: '',
      college: '',
      officeNo: ''
  });
    
    function closeModal() {
        dispatch(changeStatusOfStateToFalse());
    }

    function changeType(event) {
      setType(event.target.value);
    }

    
    function uploadDataToDB(data) {
      console.log('smerah',data);
      axios({
          method: 'post',
          url: '/api/users',
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data'
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
        <section>
            <Modal visible={status} width="auto" height="auto" effect="fadeInUp" onClickAway={() => closeModal()}>
                <div>
                <Container maxWidth="sm">                
          <Formik
            initialValues={{
              name: '',
              email: '',
              status:'',
              password:'',
              type: '',
              phone: '',
              Userimg: '',
              uniID: '',
              jobID: '',
              major: '',
              college: '',
              level: '',
              qualification: '',
              officeNo: ''
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
                  
                  let formd = new FormData();
                  formd.append("Userimg",files[0]);     
                  formd.append("name",users.name);
                  formd.append("status",users.status);
                  formd.append("password",users.password);
                  formd.append("uniID",users.uniID);
                  formd.append("usertype",users.usertype);
                  formd.append("jobID",users.jobID);
                  formd.append("major",users.major);
                  formd.append("college",users.college);
                  formd.append("phone",users.phone);
                  formd.append("level",users.level);
                  formd.append("qualification",users.qualification);
                  formd.append("officeNo",users.officeNo);
                  formd.append("email",users.email);
                  
                  
                  console.log(files[0],'slsl');
                  if (users.usertype === "default") {
                    alert("Select the type ..")
                  }
                  else if ((type === "Dean" || type === "Student") && (users.college === undefined || users.college === "default" || users.college === "")) {
                      alert("Enter college ..");
                  }
                  else {
                  uploadDataToDB(formd);
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
                    Add new user
                  </Typography>
                </Box>

                <div className="container">
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        <p>Drag or click to select image for user</p>
                    </div>
                        <aside style={thumbsContainer}>
                          {thumbs}
                        </aside>
                </div>

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
             
              <Grid sm={12}>
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
                    Add user
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



export default AddUser;
