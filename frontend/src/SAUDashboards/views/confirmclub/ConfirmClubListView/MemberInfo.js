import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Divider } from '@material-ui/core';
import { red,green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';



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

const RedRadio = withStyles({
  root: {
    color: red[600],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);



const SignUp = ({ members }) =>{
  const classes = useStyles();

  const [value, setValue] = React.useState('Acceptance');


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
    <Divider style={{ marginBottom:"15px" }} />
    <Container component="main" maxWidth="ms">
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

            <Grid item xs={12} sm={6}>
            <Typography variant="h6">
            Level:
            </Typography>
            <Typography variant="h5">
            {members.memberInfo.level}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography variant="h6">
            Major:
            </Typography>
            <Typography variant="h5">
            {members.memberInfo.major}
            </Typography>
            </Grid>


            <Grid item xs={12} sm={6}>
            <Typography variant="h6">
            University ID:
            </Typography>
            <Typography variant="h5">
            {members.memberInfo.uniID}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography variant="h6">
            Type:
            </Typography>
            <Typography variant="h5">
            {members.memberInfo.usertype}
            </Typography>
            </Grid>


            <Grid item xs={12} sm={4}>
            <Typography variant="h6">
            Occupation:
            </Typography>
            <Typography variant="h5">
            {members.occupation}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography variant="h6">
            Committee:
            </Typography>
            <Typography variant="h5">
            {members.committee.name}
            </Typography>
            </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6">
            Committee Description:
            </Typography>
            <Typography variant="h5">
            {members.committee.description}
            </Typography>
            </Grid>
          </Grid>
      </div>
    </Container>
    <Divider style={{ marginTop:"15px" }} />
    </div>
  );
}

export default SignUp;