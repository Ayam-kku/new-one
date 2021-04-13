import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = ({ members }) =>{
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Typography variant="h6">
            Email:
            </Typography>
            <Typography variant="h5">
            {members.memberInfo.email}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography variant="h6">
            phone:
            </Typography>
            <Typography variant="h5">
            {members.memberInfo.phone}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h5">
            Cntact information
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h5">
            Cntact information
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h5">
            Cntact information
            </Typography>
            </Grid>
          </Grid>
      </div>
    </Container>
  );
}

export default SignUp;