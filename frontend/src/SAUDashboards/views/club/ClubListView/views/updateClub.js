import React, { Component, useState,useEffect } from 'react';
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
import { changeStatusOfStateToFalseUpdate } from '../actions/clubs';
import { getDataClub } from "../connectDB/getdata";

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


const UpdateClub = () => {
    const classes = useStyles();

    //for fetch from db and redux
    const collegesAll = useSelector((state) => state.stateInfo);
    const usersAll = useSelector((state) => state.stateUsers);
    const infoClub = useSelector((state) => state.stateClub);

    const [colleges,setColleges] = React.useState([]);
    const [users,setUsers] = React.useState([]);
    let [clubs,setClub] = React.useState([]);

    let [club] = React.useState({
      clubName :"",
      clubType : "",
      college : "",
      pioneer :"",
      president :""
    });
      
      const status = useSelector((state) => state.stateUpdate);
      const dispatch = useDispatch();


  function closeModal() {
      dispatch(changeStatusOfStateToFalseUpdate());
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
            // closeModal();
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
          closeModal();
        })
        .catch((error) =>{
            alert(`Error : + ${error.response.data.message}`);
        });
}


  function uploadDataToDB() {
      axios({
          method: 'put',
          url: `/api/club/${infoClub._id}`,
          data: qs.stringify(club),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
          .then((response) =>{
            closeModal();
          })
          .catch((error) =>{
              alert(`Error : + ${error.response.data.message}`);
          });
  }

  function updateUserPreInClub(user) {
    axios({
        method: 'put',
        url: `/api/club/${user._id}`,
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
    
    //president
    const [nameOfPresident,setNameOfPresident] = React.useState(infoClub.president.name);
    const [president,setPresident] = React.useState({
      _id:infoClub.president._id,
      name:infoClub.president.name,
      uniID:infoClub.president.uniID,
      postion:infoClub.president.postion,
      major:infoClub.president.major,
      level:infoClub.president.level,
      email:infoClub.president.email,
      phone:infoClub.president.phone,
      status:infoClub.president.status,
      usertype:infoClub.president.usertype
    });

    function changeTypePre(event) {
      if (event.target.selectedOptions[0].dataset.values !== 'default') {
      let obj = JSON.parse(event.target.selectedOptions[0].dataset.values); //object
         setPresident(obj);
         setNameOfPresident(obj.name);
      }
      else {
         setNameOfPresident("default");
         setPresident({
          _id:"", 
          uniID:"",
          name:"",
          postion: {
            clubName: "",
            typePos: ""
            },
          major:"",
          level:"",
          email:"",
          phone:""
         }); 
      }
    }

    //pionner
    const [pionner,setPionner] = React.useState({
      _id:infoClub.pioneer._id,
      name:infoClub.pioneer.name,
      jobID:infoClub.pioneer.jobID,
      postion:infoClub.pioneer.postion,
      major:infoClub.pioneer.major,
      qualification:infoClub.pioneer.qualification,
      email:infoClub.pioneer.email,
      phone:infoClub.pioneer.phone,
      status:infoClub.pioneer.status,
      usertype:infoClub.pioneer.usertype
    });
    const [nameOfPionner,setNameOfPionner] = React.useState(infoClub.pioneer.name);
    function changeTypePio(event) {
      if (event.target.selectedOptions[0].dataset.values !== 'default') {
      let obj = JSON.parse(event.target.selectedOptions[0].dataset.values); //object
         setPionner(obj);
         setNameOfPionner(obj.name);
      }
      else {
        setNameOfPionner("default");
         setPionner({
          _id:"",
          jobID:"",
          name:"",
          postion: {
            clubName: "",
            typePos: ""
            },
          major:"",
          qualification:"",
          email:"",
          phone:""
         }); 
      }
    }

    //college
    const [collegeObj,setCollegeObj] = React.useState({
      _id:infoClub.college._id, 
      name:infoClub.college.name,
      building:infoClub.college.building,
      link:infoClub.college.link
    });
    const [nameOfCollege,setNameOfCollege] = React.useState(infoClub.college.name);
    function changeTypeCollege(event) {
      if (event.target.selectedOptions[0].dataset.values !== 'default') {
      let obj = JSON.parse(event.target.selectedOptions[0].dataset.values); //object
         console.log(obj);
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
    
  
    useEffect(() => {
      setColleges(collegesAll[collegesAll.length - 1]);
      setUsers(usersAll[usersAll.length - 1]);
    });
  
    useEffect(() => {
      getDataClub().then((u) =>{ setClub(u); });
    },[]);

    return (
        <section>
            <Modal visible={status} width="auto" height="auto" effect="fadeInUp" onClickAway={() => closeModal()}>
                <div>
                <Container maxWidth="sm">                
          <Formik
            initialValues={{
                clubName :infoClub.clubName,
                clubType : infoClub.clubType,
                college : "",
                collegeName : infoClub.college.name,
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
              

              console.log(infoClub,'s;',club);
              
              //if all pio and pre null
              if (club.president.email !== "" && club.pioneer.email !== "") {
                          if ((infoClub.president.postion.clubName !== club.president.postion.clubName && infoClub.pioneer.postion.clubName !== club.pioneer.postion.clubName)
                              && (club.president.postion.clubName !== "" && club.pioneer.postion.clubName !== "")) {
                                    if (window.confirm(`The pioneer is a member of ${club.pioneer.postion.clubName} club And The president is a member of ${club.president.postion.clubName} club ....`)) {
                                                   //this for update pre 
                                                          //now update club
                                                          clubs.forEach((clubItem) => {
                                                            if (clubItem.president.postion.clubName !== "" && clubItem.clubName === club.president.postion.clubName) {
                                                                        clubItem.president = {
                                                                          postion: {
                                                                          clubName: "",
                                                                          typePos: ""
                                                                          },
                                                                          jobID: "",
                                                                          uniID: "",
                                                                          major: "",
                                                                          level: "",
                                                                          qualification: "",
                                                                          officeNo: "",
                                                                          name: "",
                                                                          usertype: "",
                                                                          password: "",
                                                                          email: "",
                                                                          phone: "",
                                                                          status: ""
                                                                        };
                                                                updateUserPreInClub(clubItem);
                                                              
                                                            }
                                                        });
                                                        //it's used to remove pre that in club and remove from club
                                                          if (infoClub.president.postion.clubName !== "") {
                                                            //now update club
                                                            clubs.forEach((clubItem) => {
                                                              if (clubItem.president.postion.clubName !== "" && clubItem.clubName === club.president.postion.clubName) {
                                                                  clubItem.president = {
                                                                    postion: {
                                                                    clubName: "",
                                                                    typePos: ""
                                                                    },
                                                                    jobID: "",
                                                                    uniID: "",
                                                                    major: "",
                                                                    level: "",
                                                                    qualification: "",
                                                                    officeNo: "",
                                                                    name: "",
                                                                    usertype: "",
                                                                    password: "",
                                                                    email: "",
                                                                    phone: "",
                                                                    status: ""
                                                                  };
                                                                  updateUserPreInClub(clubItem);
                                                              }
                                                            });

                                                            //then user
                                                            infoClub.president.postion.typePos = "";
                                                            infoClub.president.postion.clubName = "";
                                                            updateInfoOfPositionOfPre(infoClub.president);
                                                          }
                                            
                                                          club.president.postion.typePos = "President";
                                                          club.president.postion.clubName = club.clubName;
                                                          updateInfoOfPositionOfPre(club.president);//update user
                                                   //----------
                                                   
                                                   //this update for pio
                                                     //now update club
                                                        clubs.forEach((clubItem) => {
                                                          if (clubItem.pioneer.postion.clubName !== "" && clubItem.clubName === club.pioneer.postion.clubName) {
                                                                      clubItem.pioneer = {
                                                                        postion: {
                                                                        clubName: "",
                                                                        typePos: ""
                                                                        },
                                                                        jobID: "",
                                                                        uniID: "",
                                                                        major: "",
                                                                        level: "",
                                                                        qualification: "",
                                                                        officeNo: "",
                                                                        name: "",
                                                                        usertype: "",
                                                                        password: "",
                                                                        email: "",
                                                                        phone: "",
                                                                        status: ""
                                                                      };
                                                              updateUserPreInClub(clubItem);
                                                            
                                                          }
                                                        });
                                                        if (infoClub.pioneer.postion.clubName !== "") {
                                                                    //now update club
                                                                    clubs.forEach((clubItem) => {
                                                                      if (clubItem.pioneer.postion.clubName !== "" && clubItem.clubName === club.pioneer.postion.clubName) {
                                                                          clubItem.pioneer = {
                                                                            postion: {
                                                                            clubName: "",
                                                                            typePos: ""
                                                                            },
                                                                            jobID: "",
                                                                            uniID: "",
                                                                            major: "",
                                                                            level: "",
                                                                            qualification: "",
                                                                            officeNo: "",
                                                                            name: "",
                                                                            usertype: "",
                                                                            password: "",
                                                                            email: "",
                                                                            phone: "",
                                                                            status: ""
                                                                          };
                                                                          updateUserPreInClub(clubItem);
                                                                      }
                                                                    });

                                                                    //then user
                                                                    infoClub.pioneer.postion.typePos = "";
                                                                    infoClub.pioneer.postion.clubName = "";
                                                                    updateInfoOfPositionOfPre(infoClub.pioneer);
                                                        }
  
                                                    club.pioneer.postion.typePos = "Pioneer";
                                                    club.pioneer.postion.clubName = club.clubName;
                                                    updateInfoOfPositionOfPio(club.pioneer);      

                                                   //----------
                                                    uploadDataToDB();//update club
                                     }                
                          }

                          else if (infoClub.president.postion.clubName !== club.president.postion.clubName && club.president.postion.clubName !== "") {
                            if (window.confirm(`The president is a member of ${club.president.postion.clubName} club ..`)) {
                            //now update club
                                      clubs.forEach((clubItem) => {
                                                    if (clubItem.president.postion.clubName !== "" && clubItem.clubName === club.president.postion.clubName) {
                                                                clubItem.president = {
                                                                  postion: {
                                                                  clubName: "",
                                                                  typePos: ""
                                                                  },
                                                                  jobID: "",
                                                                  uniID: "",
                                                                  major: "",
                                                                  level: "",
                                                                  qualification: "",
                                                                  officeNo: "",
                                                                  name: "",
                                                                  usertype: "",
                                                                  password: "",
                                                                  email: "",
                                                                  phone: "",
                                                                  status: ""
                                                                };
                                                        updateUserPreInClub(clubItem);
                                                      
                                                    }
                                      });
                                      //it's used to remove pre that in club and remove from club
                                        if (infoClub.president.postion.clubName !== "") {
                                          //now update club
                                          clubs.forEach((clubItem) => {
                                            if (clubItem.president.postion.clubName !== "" && clubItem.clubName === club.president.postion.clubName) {
                                                clubItem.president = {
                                                  postion: {
                                                  clubName: "",
                                                  typePos: ""
                                                  },
                                                  jobID: "",
                                                  uniID: "",
                                                  major: "",
                                                  level: "",
                                                  qualification: "",
                                                  officeNo: "",
                                                  name: "",
                                                  usertype: "",
                                                  password: "",
                                                  email: "",
                                                  phone: "",
                                                  status: ""
                                                };
                                                updateUserPreInClub(clubItem);
                                            }
                                          });

                                          //then user
                                          infoClub.president.postion.typePos = "";
                                          infoClub.president.postion.clubName = "";
                                          updateInfoOfPositionOfPre(infoClub.president);
                                        }
                          
                          club.president.postion.typePos = "President";
                          club.president.postion.clubName = club.clubName;
                          updateInfoOfPositionOfPre(club.president);//update user
                          
                          uploadDataToDB();//update club
                            }
                          }

                          else if (infoClub.pioneer.postion.clubName !== club.pioneer.postion.clubName && club.pioneer.postion.clubName !== "") {
                            if (window.confirm(`The pioneer is a member of ${club.pioneer.postion.clubName} club ..`)) {
                            //now update club
                                      clubs.forEach((clubItem) => {
                                                    if (clubItem.pioneer.postion.clubName !== "" && clubItem.clubName === club.pioneer.postion.clubName) {
                                                                clubItem.pioneer = {
                                                                  postion: {
                                                                  clubName: "",
                                                                  typePos: ""
                                                                  },
                                                                  jobID: "",
                                                                  uniID: "",
                                                                  major: "",
                                                                  level: "",
                                                                  qualification: "",
                                                                  officeNo: "",
                                                                  name: "",
                                                                  usertype: "",
                                                                  password: "",
                                                                  email: "",
                                                                  phone: "",
                                                                  status: ""
                                                                };
                                                        updateUserPreInClub(clubItem);
                                                      
                                                    }
                                      });
                                       //it's used to remove pre that in club and remove from club
                                        if (infoClub.pioneer.postion.clubName !== "") {
                                          //now update club
                                          clubs.forEach((clubItem) => {
                                            if (clubItem.pioneer.postion.clubName !== "" && clubItem.clubName === club.pioneer.postion.clubName) {
                                                clubItem.pioneer = {
                                                  postion: {
                                                  clubName: "",
                                                  typePos: ""
                                                  },
                                                  jobID: "",
                                                  uniID: "",
                                                  major: "",
                                                  level: "",
                                                  qualification: "",
                                                  officeNo: "",
                                                  name: "",
                                                  usertype: "",
                                                  password: "",
                                                  email: "",
                                                  phone: "",
                                                  status: ""
                                                };
                                                updateUserPreInClub(clubItem);
                                            }
                                          });
            
                                          //then user
                                          infoClub.pioneer.postion.typePos = "";
                                          infoClub.pioneer.postion.clubName = "";
                                          updateInfoOfPositionOfPre(infoClub.pioneer);
                          }
                          
                          club.pioneer.postion.typePos = "Pioneer";
                          club.pioneer.postion.clubName = club.clubName;
                          updateInfoOfPositionOfPio(club.pioneer);
                          
                          uploadDataToDB();//update club
                            }
                          }
                          
                          else {
                            if (infoClub.president.postion.clubName !== "") {
                              infoClub.president.postion.typePos = "";
                              infoClub.president.postion.clubName = "";
                              updateInfoOfPositionOfPre(infoClub.president);

                              clubs.forEach((clubItem) => {
                                if (clubItem.president.postion.clubName !== "" && clubItem.clubName === club.president.postion.clubName) {
                                    clubItem.president = {
                                      postion: {
                                      clubName: "",
                                      typePos: ""
                                      },
                                      jobID: "",
                                      uniID: "",
                                      major: "",
                                      level: "",
                                      qualification: "",
                                      officeNo: "",
                                      name: "",
                                      usertype: "",
                                      password: "",
                                      email: "",
                                      phone: "",
                                      status: ""
                                    };
                                    updateUserPreInClub(clubItem);
                                }
                              });
                            }

                            club.president.postion.typePos = "President";
                            club.president.postion.clubName = club.clubName;
                            updateInfoOfPositionOfPre(club.president);//update user
                        
                            if (infoClub.pioneer.postion.clubName !== "") {
                              infoClub.pioneer.postion.typePos = "";
                              infoClub.pioneer.postion.clubName = "";
                              updateInfoOfPositionOfPre(infoClub.pioneer);

                              //now update club
                                  clubs.forEach((clubItem) => {
                                    if (clubItem.pioneer.postion.clubName !== "" && clubItem.clubName === club.pioneer.postion.clubName) {
                                        clubItem.pioneer = {
                                          postion: {
                                          clubName: "",
                                          typePos: ""
                                          },
                                          jobID: "",
                                          uniID: "",
                                          major: "",
                                          level: "",
                                          qualification: "",
                                          officeNo: "",
                                          name: "",
                                          usertype: "",
                                          password: "",
                                          email: "",
                                          phone: "",
                                          status: ""
                                        };
                                        updateUserPreInClub(clubItem);
                                    }
                                  });
                            }

                            club.pioneer.postion.typePos = "Pioneer";
                            club.pioneer.postion.clubName = club.clubName;
                            updateInfoOfPositionOfPio(club.pioneer);//update user
                            
                            uploadDataToDB();//update club
                          } 
              }
              //this for update from none to pre
              else if (club.president.email !== "" && club.pioneer.email === "") {
                //the future will delete the club that have club and will update it 
                if (infoClub.president.postion.clubName !== club.president.postion.clubName && club.president.postion.clubName !== "") {
                  if (window.confirm(`The president is a member of ${club.president.postion.clubName} club ..`)) {
                  //now update club
                            clubs.forEach((clubItem) => {
                                          if (clubItem.president.postion.clubName !== "" && clubItem.clubName === club.president.postion.clubName) {
                                                      clubItem.president = {
                                                        postion: {
                                                        clubName: "",
                                                        typePos: ""
                                                        },
                                                        jobID: "",
                                                        uniID: "",
                                                        major: "",
                                                        level: "",
                                                        qualification: "",
                                                        officeNo: "",
                                                        name: "",
                                                        usertype: "",
                                                        password: "",
                                                        email: "",
                                                        phone: "",
                                                        status: ""
                                                      };
                                              updateUserPreInClub(clubItem);
                                            
                                          }
                            });
                             //it's used to remove pre that in club and remove from club
                              if (infoClub.president.postion.clubName !== "") {
                                //now update club
                                clubs.forEach((clubItem) => {
                                  if (clubItem.president.postion.clubName !== "" && clubItem.clubName === club.president.postion.clubName) {
                                      clubItem.president = {
                                        postion: {
                                        clubName: "",
                                        typePos: ""
                                        },
                                        jobID: "",
                                        uniID: "",
                                        major: "",
                                        level: "",
                                        qualification: "",
                                        officeNo: "",
                                        name: "",
                                        usertype: "",
                                        password: "",
                                        email: "",
                                        phone: "",
                                        status: ""
                                      };
                                      updateUserPreInClub(clubItem);
                                  }
                                });

                                //then user
                                infoClub.president.postion.typePos = "";
                                infoClub.president.postion.clubName = "";
                                updateInfoOfPositionOfPre(infoClub.president);
                }
                
                club.president.postion.typePos = "President";
                club.president.postion.clubName = club.clubName;
                updateInfoOfPositionOfPre(club.president);//update user
                
                uploadDataToDB();//update club
                  }
                }
                else {
                //it's used to remove pre that in club and remove from club
                if (infoClub.president.postion.clubName !== "") {
                  //now update club
                  clubs.forEach((clubItem) => {
                    if (clubItem.president.postion.clubName !== "" && clubItem.clubName === club.president.postion.clubName) {
                        clubItem.president = {
                          postion: {
                          clubName: "",
                          typePos: ""
                          },
                          jobID: "",
                          uniID: "",
                          major: "",
                          level: "",
                          qualification: "",
                          officeNo: "",
                          name: "",
                          usertype: "",
                          password: "",
                          email: "",
                          phone: "",
                          status: ""
                        };
                        updateUserPreInClub(clubItem);
                    }
                  });

                  //then user
                  infoClub.president.postion.typePos = "";
                  infoClub.president.postion.clubName = "";
                  updateInfoOfPositionOfPre(infoClub.president);
                }
                
                club.president.postion.typePos = "President";
                club.president.postion.clubName = club.clubName;
                updateInfoOfPositionOfPre(club.president);//update user
                //for update pionner to null
                console.log('yes',infoClub);
                if (infoClub.pioneer.postion.typePos !== "") {
                infoClub.pioneer.postion.typePos = "";
                infoClub.pioneer.postion.clubName = "";
                updateInfoOfPositionOfPio(infoClub.pioneer);
                }
                uploadDataToDB();//update club
              }
            }
              // //this update from none to pio
              else if (club.president.email === "" && club.pioneer.email !== "") {
               //the future will delete the club that have club and will update it 
               if (infoClub.pioneer.postion.clubName !== club.pioneer.postion.clubName && club.pioneer.postion.clubName !== "") {
                if (window.confirm(`The pioneer is a member of ${club.pioneer.postion.clubName} club ..`)) {
                //now update club
                          clubs.forEach((clubItem) => {
                                        if (clubItem.pioneer.postion.clubName !== "" && clubItem.clubName === club.pioneer.postion.clubName) {
                                                    clubItem.pioneer = {
                                                      postion: {
                                                      clubName: "",
                                                      typePos: ""
                                                      },
                                                      jobID: "",
                                                      uniID: "",
                                                      major: "",
                                                      level: "",
                                                      qualification: "",
                                                      officeNo: "",
                                                      name: "",
                                                      usertype: "",
                                                      password: "",
                                                      email: "",
                                                      phone: "",
                                                      status: ""
                                                    };
                                            updateUserPreInClub(clubItem);
                                          
                                        }
                          });
                           //it's used to remove pre that in club and remove from club
                            if (infoClub.pioneer.postion.clubName !== "") {
                              //now update club
                              clubs.forEach((clubItem) => {
                                if (clubItem.pioneer.postion.clubName !== "" && clubItem.clubName === club.pioneer.postion.clubName) {
                                    clubItem.pioneer = {
                                      postion: {
                                      clubName: "",
                                      typePos: ""
                                      },
                                      jobID: "",
                                      uniID: "",
                                      major: "",
                                      level: "",
                                      qualification: "",
                                      officeNo: "",
                                      name: "",
                                      usertype: "",
                                      password: "",
                                      email: "",
                                      phone: "",
                                      status: ""
                                    };
                                    updateUserPreInClub(clubItem);
                                }
                              });

                              //then user
                              infoClub.pioneer.postion.typePos = "";
                              infoClub.pioneer.postion.clubName = "";
                              updateInfoOfPositionOfPre(infoClub.pioneer);
                                                                          }
              
              club.pioneer.postion.typePos = "Pioneer";
              club.pioneer.postion.clubName = club.clubName;
              updateInfoOfPositionOfPio(club.pioneer);
              
              uploadDataToDB();//update club
                }
              }
              else {  
                if (infoClub.pioneer.postion.clubName !== "") {

                  //now update club
                  clubs.forEach((clubItem) => {
                    if (clubItem.pioneer.postion.clubName !== "" && clubItem.clubName === club.pioneer.postion.clubName) {
                        clubItem.pioneer = {
                          postion: {
                          clubName: "",
                          typePos: ""
                          },
                          jobID: "",
                          uniID: "",
                          major: "",
                          level: "",
                          qualification: "",
                          officeNo: "",
                          name: "",
                          usertype: "",
                          password: "",
                          email: "",
                          phone: "",
                          status: ""
                        };
                        updateUserPreInClub(clubItem);
                    }
                  });

                  //then user
                  infoClub.pioneer.postion.typePos = "";
                  infoClub.pioneer.postion.clubName = "";
                  updateInfoOfPositionOfPre(infoClub.pioneer);
                }

                club.pioneer.postion.typePos = "Pioneer";
                club.pioneer.postion.clubName = club.clubName;
                updateInfoOfPositionOfPio(club.pioneer);
                 //for pre

                 if (infoClub.president.postion.typePos !== "") {
                 infoClub.president.postion.typePos = "";
                 infoClub.president.postion.clubName = "";
                 updateInfoOfPositionOfPre(infoClub.president);
                }
                uploadDataToDB();//update club
              }
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
                    Update the club
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
                                              value={nameOfCollege}
                                              onChange={changeTypeCollege}     
                                              >
                                              <option value="default" data-values="default">Select college</option>               
                                              {colleges !== undefined && colleges.map((college)=> { return (
                                                <option value={college.name} key={college._id} data-values={JSON.stringify(college)}>{college.name}</option>
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
                        value={nameOfPresident}
                        >
                        <option value="default" data-values="default">Select president</option>               
                        {users !== undefined && users.filter((user) => user.usertype === "Student").map((filtereduser,index) =>(
                          <option key={filtereduser._id} value={filtereduser.name} data-values={JSON.stringify(filtereduser)}>{filtereduser.name}</option>
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
                        value={nameOfPionner}
                        >
                        <option value="default" data-values="default">Select pioneer</option>
                        {users !== undefined && users.filter((user) => user.usertype === "Staff").map((filtereduser,index) =>(
                          <option key={filtereduser._id} value={filtereduser.name} data-values={JSON.stringify(filtereduser)}>{filtereduser.name}</option>
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
                    Update club
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



export default UpdateClub;
