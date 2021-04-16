import React, { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { getDataCollege } from './connectDB/getdata';
import getInitials from '../../../../utils/getInitials';
 

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [colleges,setColleges] = useState([]);
  const navigate = useNavigate();

  getDataCollege().then((u) =>setColleges(u));

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${colleges.length} in total`}
        title="الكليات المضافة حديثا"
      />
      <Divider />
      <List>
        {colleges.map((college, i) => (
          <ListItem
            divider={i < colleges.length - 1}
            key={college._id}
          >
             <Avatar
            className={classes.avatar}
            src={college.avatarUrl}
            >
            {getInitials(college.name)}
            </Avatar>
            <ListItemText
              style={{ "padding-left":"8px" }} 
              primary={college.name}
              secondary={college.building}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          style={{ color: '#1E8449' }}
          onClick={()=>{ navigate('/app/admin/college', { replace: true }); }}
        >
          مشاهدة الكل
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
