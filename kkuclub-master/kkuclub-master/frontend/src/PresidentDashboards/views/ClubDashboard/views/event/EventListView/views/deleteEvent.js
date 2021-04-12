import React, { useEffect,useState } from 'react';
import {
  Box,
  Button,
  Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteDataFromDB } from './clubEventService'
import axios from "axios";
import qs from 'qs';
import { closePopupDelete } from '../actions/clubs';



const AddEvent = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (() => {
    deleteDataFromDB(props.club);
    dispatch(closePopupDelete());
   }) 

    return (
        <div>
           <Typography variant="h3" style={{ textAlign:'center' }}>
                     Are you sure?
                 </Typography>
                <Box my={3}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    style={{ background: '#B93131' }}
                  >
                    Delete Event
                  </Button>  
                </Box> 
        </div>
    );
};



export default AddEvent;
