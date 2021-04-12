import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { getTotal } from './connectDB/getdata';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [admin, setAdmin] = React.useState(0);
  const [SAU, setSAU] = React.useState(0);
  const [dean, setDean] = React.useState(0);
  const [student, setStudent] = React.useState(0);
  const [staff, setStaff] = React.useState(0);
  const [total, setTotal] = React.useState(0);


  getTotal().then((u) =>{ 
    setAdmin(u[0]);
    setDean(u[1]);
    setSAU(u[2]);
    setStudent(u[3]);
    setStaff(u[4]);
    setTotal(u[5]);
  });

   
  const data = {
    datasets: [
      {
        data: [student,admin, SAU,dean,staff],
        backgroundColor: [
          '#00529B',
          '#FDBB2F',
          '#377B2B',
          '#007CC3',
          '#F47A1F',

        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Student','Admin', 'Student Activity Unit','dean', 'Staff']
  };

  const options = {
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false
  };

  const users = [
    {
      title: 'Admin',
      value: Math.round((100 / total) * admin),
      icon: PersonIcon,
      color: '#FDBB2F'
    },
    {
      title: 'SAU',
      value: Math.round((100 / total) * SAU),
      icon: PersonIcon,
      color: '#377B2B'
    },
    {
      title: 'Dean',
      value: Math.round(((100 / total) * dean)),
      icon: PersonIcon,
      color: '#007CC3'
    },
    {
      title: 'Staff',
      value: Math.round((100 / total) * staff),
      icon: PersonIcon,
      color: '#F47A1F'
    },
    {
      title: 'Student',
      value: Math.round((100 / total) * student),
      icon: PersonIcon,
      color: '#00529B'
    }
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Users By Type" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {users.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1.2}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value == NaN ? 0 : value}
                %
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
