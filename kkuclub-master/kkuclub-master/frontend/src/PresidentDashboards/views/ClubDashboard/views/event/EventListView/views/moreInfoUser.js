import React, { Component, useState,useEffect } from 'react';
import Modal from 'react-awesome-modal';
import {
  Box,
  Container,
  TextField,
  Grid,
  Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { changeStatusOfStateToFalseInfo } from '../actions/clubs';

const UpdateClub = () => {
    
  const infoClub = useSelector((state) => state.stateClub);
  const howIsClick = useSelector((state) => state.statusOfClick);
  const status = useSelector((state) => state.stateInfoUser);
    const dispatch = useDispatch();


  function closeModal() {
    dispatch(changeStatusOfStateToFalseInfo());
  }

    return (
        <section>
            <Modal visible={status} width="auto" height="auto" effect="fadeInUp" onClickAway={() => closeModal()}>
                <div>
                  <Container maxWidth="sm">
                    {howIsClick ? (
                        <Grid>
                         <Box mb={1}>
                         <Typography
                           color="textPrimary"
                           variant="h2"
                           style={{ paddingTop: "10px" }}
                         >
                           President information
                         </Typography>
                     </Box>                  
                  <Grid container spacing={6} style={{ padding: "18px" }}>
                        <Grid item xs={6}>
                             <Grid item sm={12}>
                               <TextField
                               InputProps={{ readOnly: true }}
                               value={infoClub.president.name === "" ? "There is no name" : infoClub.president.name}
                               fullWidth
                               />
                             </Grid>
                             
                             <Grid item sm={12} style={{ marginTop:"10px" }}>
                               <TextField
                               InputProps={{ readOnly: true }}
                               value={infoClub.president.usertype === "" ? "There is no title" : infoClub.president.usertype}
                               fullWidth
                               />
                             </Grid>

                             <Grid item sm={12} style={{ marginTop:"10px" }}>
                               <TextField
                               InputProps={{ readOnly: true }}
                               value={infoClub.president.email === "" ? "There is no email" : infoClub.president.email}
                               fullWidth
                               />
                             </Grid>

                             <Grid item sm={12} style={{ marginTop:"10px" }}>
                               <TextField
                               InputProps={{ readOnly: true }}
                               value={infoClub.president.phone === "" ? "There is no phone" : infoClub.president.phone}
                               fullWidth
                               />
                             </Grid>
                        </Grid>

                      <Grid item xs={6}>
                             <Grid item sm={12}>
                               <TextField
                               InputProps={{ readOnly: true }}
                               value={infoClub.president.uniID === "" ? "There is no UNID" : infoClub.president.uniID}
                               fullWidth
                               />
                             </Grid>
                             
                             <Grid item sm={12} style={{ marginTop:"10px" }}>
                               <TextField
                               InputProps={{ readOnly: true }}
                               value={infoClub.president.status === "" ? "There is no status" : infoClub.president.status}
                               fullWidth
                               />
                             </Grid>

                             <Grid item sm={12} style={{ marginTop:"10px" }}>
                               <TextField
                               InputProps={{ readOnly: true }}
                               value={infoClub.president.level === "" ? "There is no level" : infoClub.president.level}
                               fullWidth
                               />
                             </Grid>

                             <Grid item sm={12} style={{ marginTop:"10px" }}>
                               <TextField
                               InputProps={{ readOnly: true }}
                               value={infoClub.president.major === "" ? "There is no major" : infoClub.president.major}
                               fullWidth
                               />
                             </Grid>

                        </Grid>
                </Grid>
          </Grid>
                    ) : (
                      <Grid>
                      <Box mb={1}>
                      <Typography
                        color="textPrimary"
                        variant="h2"
                        style={{ paddingTop: "10px" }}
                      >
                        Pioneer information
                      </Typography>
                  </Box>                  
               <Grid container spacing={6} style={{ padding: "18px" }}>
                     <Grid item xs={6}>
                          <Grid item sm={12}>
                            <TextField
                            InputProps={{ readOnly: true }}
                            value={infoClub.pioneer.name === "" ? "There is no name" : infoClub.pioneer.name}
                            fullWidth
                            />
                          </Grid>
                          
                          <Grid item sm={12} style={{ marginTop:"10px" }}>
                            <TextField
                            InputProps={{ readOnly: true }}
                            value={infoClub.pioneer.usertype === "" ? "There is no title" : infoClub.pioneer.usertype}
                            fullWidth
                            />
                          </Grid>

                          <Grid item sm={12} style={{ marginTop:"10px" }}>
                            <TextField
                            InputProps={{ readOnly: true }}
                            value={infoClub.pioneer.email === "" ? "There is no email" : infoClub.pioneer.email}
                            fullWidth
                            />
                          </Grid>

                          <Grid item sm={12} style={{ marginTop:"10px" }}>
                            <TextField
                            InputProps={{ readOnly: true }}
                            value={infoClub.pioneer.phone === "" ? "There is no phone" : infoClub.pioneer.phone}
                            fullWidth
                            />
                          </Grid>
                     </Grid>

                   <Grid item xs={6}>
                          <Grid item sm={12}>
                            <TextField
                            InputProps={{ readOnly: true }}
                            value={infoClub.pioneer.jobID === "" ? "There is no jobID" : infoClub.pioneer.jobID}
                            fullWidth
                            />
                          </Grid>
                          
                          <Grid item sm={12} style={{ marginTop:"10px" }}>
                            <TextField
                            InputProps={{ readOnly: true }}
                            value={infoClub.pioneer.status === "" ? "There is no status" : infoClub.pioneer.status}
                            fullWidth
                            />
                          </Grid>

                          <Grid item sm={12} style={{ marginTop:"10px" }}>
                            <TextField
                            InputProps={{ readOnly: true }}
                            value={infoClub.pioneer.qualification === "" ? "There is no qualification" : infoClub.pioneer.qualification}
                            fullWidth
                            />
                          </Grid>

                          <Grid item sm={12} style={{ marginTop:"10px" }}>
                            <TextField
                            InputProps={{ readOnly: true }}
                            value={infoClub.pioneer.major === "" ? "There is no major" : infoClub.pioneer.major}
                            fullWidth
                            />
                          </Grid>

                     </Grid>
             </Grid>
       </Grid>
                    )}
                                      
                </Container>
        </div>
            </Modal>
        </section>
    );
};



export default UpdateClub;
