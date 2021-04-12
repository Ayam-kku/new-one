import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    "justify-content":"center",
    "align-items":"center"
    
  }
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
        <div className={classes.contentContainer}>
            <Outlet />
          </div>
  );
};

export default MainLayout;
