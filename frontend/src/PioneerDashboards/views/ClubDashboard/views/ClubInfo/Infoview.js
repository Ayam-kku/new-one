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
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
  root: {},
  paper: {
    direction: 'rtl',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export function ViewInfo (props) {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    const classes = useStyles();

    const _id = props._id !== undefined ? props._id:'6071d194d7edbe148cce1eff'; 
 
    const [info, setInfo] = useState([]);
    getClubInfo(_id).then((u) =>setInfo(u));

    useEffect(() => {
      Aos.init({duration:1000});
    },[]);

  return (
    <StylesProvider jss={jss}>
        <Paper className= {classes.paper} style={{  marginTop: 15 }}>
            <Typography  data-aos="fade-left" component="div">
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
                                    {index + 1+"."} {item.objective}
                            </Box>
                        ))}
                     <Divider variant="middle"  light />
                        <Box color ="#1e8449" textAlign="left" m={1} fontWeight="fontWeightBold" fontSize={18}>
                            The club value:
                        </Box>
                        
                        {info.value !== undefined &&info.value.map((item,index) => (
                            <Box fontStyle='italic'  textAlign="justify" m={1} key={item.id} style={{  marginLeft: 20 }}>
                                {index + 1+"."}  {item.value} 
                            </Box>
                            
                        ))}
                     
                    
                </Typography>
        </Paper>    
        </StylesProvider>
  );
};

ViewInfo.propTypes = {
  className: PropTypes.string
};

export default ViewInfo;
