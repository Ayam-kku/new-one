import React, { Component, useState } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import qs from 'qs';
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

    const status = useSelector((state) => state.stateUpdate);
    const dispatch = useDispatch();

    let [committee] = React.useState({
      name: '',
      description: '',
      task: ''
  });

    function closeModal() {
        dispatch(changeStatusOfStateToFalseUpdate());
    }

    
    function uploadDataToDB() {
      axios({
          method: 'put',
          url: `/api/Committee/${props.committee._id}`,
          data: qs.stringify(committee),
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
              name: props.committee.name,
              description: props.committee.description,
              task: props.committee.task
            }}
            validationSchema={
                Yup.object().shape({
                  name: Yup.string().max(255).required('name is required'),
                  description: Yup.string().max(255).required('description is required'),
                  task: Yup.string().max(255).required('task is required')
                })
              }
            onSubmit={(info) => {
              committee.name = info.name;
              committee.description = info.description;
              committee.task = info.task;
              
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
                    Update the committee
                  </Typography>
                </Box>

                <Grid container>  
                  <Grid item xs={12}>
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
                                          error={Boolean(touched.description && errors.description)}
                                          fullWidth
                                          helperText={touched.description && errors.description}
                                          label="description"
                                          margin="normal"
                                          name="description"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.description}
                                          variant="outlined"
                                        />
                                      

                                        <TextField
                                          error={Boolean(touched.task && errors.task)}
                                          fullWidth
                                          helperText={touched.task && errors.task}
                                          label="task"
                                          margin="normal"
                                          name="task"
                                          type="task"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.task}
                                          variant="outlined"
                                        />

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
                    Update committee
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
