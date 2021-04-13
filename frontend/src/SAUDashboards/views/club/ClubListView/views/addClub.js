import React, { Component, useState,useEffect,useMemo } from 'react';
import {useDropzone} from 'react-dropzone';
import Modal from 'react-awesome-modal';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import qs from 'qs';
import Controls from "../../../../../adminDashboard/views/user/UserListView/component/Controls";
import { changeStatusOfStateToFalse } from '../actions/clubs';

const userTypeEliment = [
  { id:'College', title:'College' },
  { id:'Centralized', title:'Centralized' },
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


const AddClub = () => {
    const classes = useStyles();
    const collegesAll = useSelector((state) => state.stateInfo);
    const usersAll = useSelector((state) => state.stateUsers);
    const [colleges,setColleges] = React.useState([]);

    const [users,setUsers] = React.useState([]);
    const [president,setPresident] = React.useState({
      _id:"",
      uniID:"",
      name:"",
      postion:{
        clubName:"",
        typePos:""
      },
      major:"",
      level:"",
      email:"",
      phone:""
    });

    const [pionner,setPionner] = React.useState({
      _id:"",
      jobID:"",
      major:"",
      name:"",
      postion:{
        clubName:"",
        typePos:""
      },
      qualification:"",
      email:"",
      phone:""
    });

    const [collegeObj,setCollegeObj] = React.useState({
      _id:"", 
      name:"",
      building:"",
      link:""
    });

    
     
    function changeTypePre(event) {
      if (event.target.value !== 'default') {
      let obj = JSON.parse(event.target.value); //object
         setPresident(obj);
      }
      else {
         setPresident({
          _id:"", 
          name:"",
          postion:{
            clubName:"",
            typePos:""
          },
          uniID:"",
          major:"",
          level:"",
          email:"",
          phone:""
         }); 
      }
    }

    const [nameOfCollege,setNameOfCollege] = React.useState("default");
    function changeTypeCollege(event) {
      if (event.target.selectedOptions[0].dataset.values !== 'default') {
      let obj = JSON.parse(event.target.selectedOptions[0].dataset.values); //object
         setCollegeObj(obj);
         setNameOfCollege(obj.name);
      }
      else {
        setNameOfCollege('default');
        setCollegeObj({
          _id:"", 
          name:"",
          building:"",
          link:""
         }); 
      }
    }
    
    function changeTypePio(event) {
      if (event.target.value !== 'default') {
      let obj = JSON.parse(event.target.value); //object
         setPionner(obj);
      }
      else {
         setPionner({
          _id:"",
          jobID:"",
          major:"",
          postion:{
            clubName: "",
            typePos: ""
          },          
          name:"",
          qualification:"",
          email:"",
          phone:""
         }); 
      }
    }

     useEffect(() => {
      setColleges(collegesAll[collegesAll.length - 1]);
      setUsers(usersAll[usersAll.length - 1]);
     });

  let [club] = React.useState({
    clubName :"",
    clubType : "",
    college : "",
    pioneer :"",
    president :"",
    Userimg:'',
  });
    
    const status = useSelector((state) => state.closepopup);
    const dispatch = useDispatch();

    function closeModal() {
        dispatch(changeStatusOfStateToFalse());
    } 

    function updateInfoOfPositionOfPre(user) {
      axios({
          method: 'put',
          url: `/api/users/${user._id}`,
          data: qs.stringify(user),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
          .then((response) =>{
          })
          .catch((error) =>{
              alert(`Error : + ${error.response.data.message}`);
          });
  } 
  
  function updateInfoOfPositionOfPio(user) {
    axios({
        method: 'put',
        url: `/api/users/${user._id}`,
        data: qs.stringify(user),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
        .then((response) =>{
        })
        .catch((error) =>{
            alert(`Error : + ${error.response.data.message}`);
        });
}

function uploadDataToDB(data) {
  axios({
      method: 'post',
      url: '/api/club',
      data: qs.stringify(data),
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
                clubName :"",
                clubType : "Centralized",
                college : "",
                pioneer :"",
                president :""
            }}
            validationSchema={
                Yup.object().shape({
                  clubName: Yup.string().max(255).required('name is required'),
                })
              }  
            onSubmit={(info) => {     
              club.clubName = info.clubName;
              club.clubType = info.clubType;
              club.college = collegeObj;
              club.president = president;
              club.pioneer = pionner;
              club.Userimg = "";
              
              if (president.name !== "") {
                club.president.postion = { clubName:club.clubName,typePos:"President" }
              }
              if (pionner.name !== "") {
                club.pioneer.postion = { clubName:club.clubName,typePos:"Pioneer" }
              }

              if (club.clubType === "College" && club.college.name === "") {
                alert("select college ...");
              }
              else {
                if (president.postion.clubName !== "") {
                  console.log(president);
                updateInfoOfPositionOfPre(president);
                }
                if (pionner.postion.clubName !== "") {
                updateInfoOfPositionOfPio(pionner);
                }
                  
                uploadDataToDB(club);
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
                    Add new club
                  </Typography>
                </Box>
                <Divider variant="middle" />

                <Grid container>  
                  <Grid item xs={4}>
                                        <TextField
                                          error={Boolean(touched.clubName && errors.clubName)}
                                          fullWidth
                                          helperText={touched.clubName && errors.clubName}
                                          label="club name"
                                          margin="normal"
                                          name="clubName"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.clubName}
                                          variant="outlined"
                                        />

                                        <Controls.RadioGroup
                                                label="Club Type:"
                                                name="clubType"
                                                value={values.clubType}
                                                onChange={handleChange}
                                                items={userTypeEliment}
                                                />

                                        {values.clubType === 'College' && (
                                          <FormControl variant="outlined" className={classes.formControl} style={{ margin:"0 auto", marginTop:10, width:"100%" }}>
                                              <Select
                                              native
                                              onChange={changeTypeCollege}
                                              value={nameOfCollege}
                                              >
                                              <option value="default" data-values="default">Select college</option>               
                                              {colleges !== undefined && colleges.map((college)=> { return (
                                                <option key={college._id} value={college.name} data-values={JSON.stringify(college)}>{college.name}</option>
                                              ) })}  
                                              </Select>
                                          </FormControl>        

                                        )}   
                            {(collegeObj.name !== "" && values.clubType === 'College') && (
                                          <Grid container spacing={1}>
                                              <Grid item sm={12}>
                                                <TextField
                                                 InputProps={{
                                                  readOnly: true,
                                                }}
                                                value={collegeObj.building}
                                                fullWidth
                                                />
                                              </Grid>

                                              
                                              <Grid item sm={12}>
                                                <TextField
                                                 InputProps={{
                                                  readOnly: true,
                                                }}
                                                value={collegeObj.link}
                                                fullWidth
                                                />
                                              </Grid>
                                            </Grid>        

                                        )}   
                                        <Divider orientation="vertical" flexItem />                                              
                  </Grid>
                                      

          <Grid item xs={4} style={{ paddingTop:"6px", paddingLeft:"20px" }}>
            <FormControl variant="outlined" className={classes.formControl} style={{ margin:"0 auto", marginTop:10, width:"100%" }}>
                        <Select
                        native
                        onChange={changeTypePre}
                        >
                        <option value="default">Select president</option>               
                        {users !== undefined && users.filter((user) => (user.usertype === "Student" && user.postion.typePos === "")).map((filtereduser,index) =>(
                          <option key={filtereduser._id} value={JSON.stringify(filtereduser)}>{filtereduser.name}</option>
                        ))}
                        </Select>
                    </FormControl>

               {(president.phone !== "") && (
                  <Grid container spacing={1}>

                  <Grid item sm={12}>
                        <TextField
                            InputProps={{
                              readOnly: true,
                            }}
                          value={president.uniID}
                          fullWidth
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <TextField
                           InputProps={{
                            readOnly: true,
                          }}
                         value={president.major}
                         fullWidth
                        />
                      </Grid>

                      <Grid item sm={12}>
                        <TextField
                           InputProps={{
                            readOnly: true,
                          }}
                         value={president.level}
                         fullWidth
                        />
                      </Grid>

                      <Grid item sm={12}>
                      <TextField
                           InputProps={{
                            readOnly: true,
                          }}
                         value={president.email}
                         fullWidth
                      />
                      </Grid>

                      <Grid item sm={12}>
                      <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                        value={president.phone}
                        fullWidth
                      />
                      </Grid>
                    </Grid>
              )}      
            </Grid> 
            

            <Grid item xs={4} style={{ paddingTop:"6px", paddingLeft:"20px" }}> 

              <FormControl variant="outlined" className={classes.formControl} style={{ margin:"0 auto", marginTop:10, width:"100%" }}>
                        <Select
                        native
                        onChange={changeTypePio}
                        >
                        <option value="default">Select pioneer</option>
                        {users !== undefined && users.filter((user) => user.usertype === "Staff" && user.postion.typePos === "").map((filtereduser,index) =>(
                          <option key={filtereduser._id} value={JSON.stringify(filtereduser)}>{filtereduser.name}</option>
                        ))}
                        </Select>
                    </FormControl> 

                    {(pionner.phone !== "") && (
                  <Grid container spacing={1}>

                  <Grid item sm={12}>
                        <TextField
                            InputProps={{
                              readOnly: true,
                            }}
                          value={pionner.jobID}
                          fullWidth
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <TextField
                           InputProps={{
                            readOnly: true,
                          }}
                         value={pionner.major}
                         fullWidth
                        />
                      </Grid>

                      <Grid item sm={12}>
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                         value={pionner.qualification}
                         fullWidth
                        />
                      </Grid>

                      <Grid item sm={12}>
                      <TextField
                           InputProps={{
                            readOnly: true,
                          }}
                         value={pionner.email}
                         fullWidth
                      />
                      </Grid>

                      <Grid item sm={12}>
                      <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                        value={pionner.phone}
                        fullWidth
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
                    Add club
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



export default AddClub;
