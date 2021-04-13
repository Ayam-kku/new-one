import React, { Component, useState } from 'react';
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
import axios from "axios";
import qs from 'qs';
import { changeStatusOfStateToFalseUpdate } from '../actions/index';

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


const UpdateCollege = (props) => {
    const classes = useStyles();
    const status = useSelector((state) => state.stateUpdate);
    const dispatch = useDispatch();

    let [college] = React.useState({
      name: '',
      building: '',
      link:''
  });
    console.log(props.college.link);
    function closeModal() {
        dispatch(changeStatusOfStateToFalseUpdate());
    }

      function uploadDataToDB() {
        axios({
            method: 'put',
            url: `/api/college/${props.college._id}`,
            data: qs.stringify(college),
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
              name: props.college.name,
              building: props.college.building,
              link: props.college.link
            }}
            validationSchema={
              Yup.object().shape({
                name: Yup.string().max(255).required('name is required'),
                building: Yup.string().max(255).required('building is required'),
                link: Yup.string().max(255).required('link is required')

              })
            }
            onSubmit={(info) => {
              college.name = info.name;
              college.building = info.building;
              college.link = info.link;
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

                <Box mb={1}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    style={{ paddingTop: "20px" }}
                  >
                    Update the college
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

                <Box my={1}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    style={{ background: '#1E8449' }}
                  >
                    Update college
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

export default UpdateCollege;
