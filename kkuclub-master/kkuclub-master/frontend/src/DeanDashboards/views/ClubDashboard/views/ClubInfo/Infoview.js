import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
    Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import Aos from "aos";
import "aos/dist/aos.css";
import { makeStyles } from '@material-ui/styles';
import { getClubInfo } from "./clubService";
import purple from '@material-ui/core/colors/purple';

const useStyles = makeStyles((theme)=>({
  root: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export function ViewInfo (props) {
 
    const classes = useStyles();

    const _id = props._id !== undefined ? props._id:'605f552fed4be02b1c531cf8'; 
 
    const [info, setInfo] = useState([]);
    getClubInfo(_id).then((u) =>setInfo(u));

    useEffect(() => {
      Aos.init({duration:1000});
    },[]);

  return (
     
        <Paper className= {classes.paper} style={{  marginTop: 15 }}>
            <Typography  data-aos="fade-right" component="div">
                    <Box  color ="#1e8449" textAlign="left" m={1} fontWeight="fontWeightBold" fontSize={18}>
                        The club vision:
                        </Box>
                    <Box fontStyle='italic'  textAlign="justify"  m={1}   style={{  marginLeft: 20 }}>
                            {info.vision}
                        </Box>
                        <Divider variant="middle"  light />
                    <Box color ="#1e8449"  textAlign="left" m={1} fontWeight="fontWeightBold" fontSize={18}>
                            The club message:
                        </Box>
                    <Box fontStyle='italic'   textAlign="justify" m={1} style={{  marginLeft: 20 }}>
                            {info.message}
                        </Box>
                        <Divider variant="middle"  light />
                    <Box  color ="#1e8449" textAlign="left" m={1} fontWeight="fontWeightBold" fontSize={18}>
                            The club objectives:
                        </Box>
                        {info.objectives !== undefined &&info.objectives.map((item,index) => (
                            <Box   fontStyle='italic'  textAlign="justify" m={1} key={item.id} style={{  marginLeft: 20 }}>
                                    {index + 1+"."} {item}
                            </Box>
                        ))}
                     <Divider variant="middle"  light />
                        <Box color ="#1e8449" textAlign="left" m={1} fontWeight="fontWeightBold" fontSize={18}>
                            The club value:
                        </Box>
                        
                        {info.value !== undefined &&info.value.map((item,index) => (
                            <Box fontStyle='italic'  textAlign="justify" m={1} key={item.id} style={{  marginLeft: 20 }}>
                                {index + 1+"."}  {item} 
                            </Box>
                            
                        ))}
                     
                    
                </Typography>
        </Paper>    
  );
};

ViewInfo.propTypes = {
  className: PropTypes.string
};

export default ViewInfo;
