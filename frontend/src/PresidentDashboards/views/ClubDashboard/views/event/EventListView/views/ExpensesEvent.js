import React, { Component, useEffect,useState} from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  TextField,
  Grid
} from '@material-ui/core';

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

  export async function getAll() {
    const res = await axios('/api/EventReport');
    return res.data[res.data.length-1];
  }
const AddEvent = () => {
    const classes = useStyles();
    const [state, setState] = useState({});

    useEffect(()=>{
      getAll().then((u)=>{
        setState(u);
      })
    },[]);
     



    return (
           <div>
          { state !== undefined && (
            <Grid container spacing={2}>  
                        <Grid item xs={6}>
                                      <TextField
                                          fullWidth
                                          margin="normal"
                                          name="eventName"
                                          value={state.name}
                                          variant="outlined"
                                        />
                        </Grid>

                        <Grid item xs={6}>
                                  <TextField
                                          fullWidth
                                          margin="normal"
                                          name="eventType"
                                          value={state.eventType}
                                          variant="outlined"
                                        />
                        </Grid>
   


                            <Grid item xs={6}>
                                          <TextField
                                               fullWidth
                                               margin="normal"
                                               name="eventOrganizers"
                                               required
                                               value={state.eventOrganizers}
                                               variant="outlined"
                                            />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                               fullWidth
                                               margin="normal"
                                               name="eventBeneficiaries"
                                               required
                                               value={state.eventBeneficiaries}
                                               variant="outlined"
                                            />
                            </Grid>


                                    {/* third rows */}
 

                                    <Grid item xs={4}>
                                    <TextField
                                               fullWidth
                                               margin="normal"
                                               name="eventHours"
                                               required
                                               value={state.eventHours}
                                               variant="outlined"
                                            />
                          </Grid>

                          <Grid item xs={4}>
                                   <TextField
                                               fullWidth
                                               margin="normal"
                                               name="eventOrganizers"
                                               required
                                               value={state.evenDate}
                                               variant="outlined"
                                            />
                          </Grid>

                          <Grid item xs={4}>
                                <TextField
                                          fullWidth
                                          margin="normal"
                                          name="eventType"
                                          value={state.eventPlace}
                                          variant="outlined"
                                        />
                          </Grid>

                                      {/* sec rows */}
                                      
                          <Grid item xs={12}>
                                <TextField
                                          fullWidth
                                          margin="normal"
                                          name="eventType"
                                          multiline
                                          rows={4}
                                          value={state.eventIntroduction}
                                          variant="outlined"
                                        />                    
                          </Grid>

                          <Grid item xs={12}>
                                 <TextField
                                          fullWidth
                                          margin="normal"
                                          name="eventType"
                                          multiline
                                          rows={4}
                                          value={state.eventInformation}
                                          variant="outlined"
                                        />                    
                          </Grid>
                          <div style={{ textAlign:"center", margin:"0 auto" }}>

                          <a href={`http://localhost:5000/${state.Userimg}`}>
                              <Button
                                      color="primary"
                                      fullWidth
                                      size="large"
                                      type="submit"
                                      variant="contained"
                                      style={{ background: '#1E8449',marginBottom:"10px" }}
                                    >
                                      View File
                                </Button>
                          </a>
                          </div>
                    </Grid>     

           )}
                   
      </div>
    );
};

export default AddEvent;
