import React, { useState,useEffect,Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Icon,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { getType,getEvent } from './services';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));
let label = [];
let typesOfEvent = [];
let log = 0;
let colorsBack = [];
let total = 0;
function generate500Colors() {
  while (colorsBack.length < 500) {
    do {
        var color = Math.floor((Math.random()*1000000)+1);
    } while (colorsBack.indexOf(color) >= 0);
    colorsBack.push("#" + ("000000" + color.toString(16)).slice(-6));
   }
}


const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  generate500Colors();

  const [type, setType] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [event, setEvent] = React.useState([]);
  getType().then((u)=>setType(u));
  useEffect(()=>{
    getEvent("6071d194d7edbe148cce1eff").then((u)=>setEvent(u));
    log = 1;
    setStatus(true);
  },[]);
  
  useEffect(()=>{
    for (let index = 0; index < type.length; index++) {
      const element = type[index];
      label[index] = element.name;
      typesOfEvent[index] = 0;
    }
    log = 1;
  },[type.length]);
  
  
 if ((type.length > 0 && event.length > 0) && log === 1){
      for (let index = 0; index < event.length; index++) {
      const element = event[index].eventType.name;
      for (let index2 = 0; index2 < type.length; index2++) {
        const typeName = type[index2].name;
        if (element === typeName) {
          typesOfEvent[index2]++;
        }
      }
    }
    //for total ----
    total = 0;
    for (let index = 0; index < typesOfEvent.length; index++) {
      total += typesOfEvent[index];
    }
    //----
    log = 0;
  }
  

  const data = {
    datasets: [
      {
        data: typesOfEvent,
        backgroundColor: colorsBack,
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: label    
  };
  const options = {
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false
  };

  

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Events By Type" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          {(typesOfEvent.length > 0 && log === 0) && (
            <Doughnut
            data={data}
            options={options}
          />
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {typesOfEvent.map((item,index) => (
            <Box
              key={label[index]}
              p={1.2}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                variant="h4"
              >
                {label[index]}
              </Typography>
              <Typography
                variant="h5"
                style={{ color:'#1E8449' }}
              >
                {Math.round((100 / total) * item)}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string
};

export default TrafficByDevice;
