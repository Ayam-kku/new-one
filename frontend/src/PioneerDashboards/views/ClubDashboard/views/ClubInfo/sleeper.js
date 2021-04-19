import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { Grid, Icon } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import Popup from '../../controls/Popup';
import Alert from './displayAlert';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    direction: 'rtl',
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


function getSteps() {
  return [ 'Edit', 'Uploaded', 'Under review', 'Approved'];
}



export default function HorizontalLabelPositionBelowStepper(props) {

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  for (let index = 0; index < steps.length; index++) {
    if(steps[index] === props.status) {
      if (index !== activeStep) {
      setActiveStep(index);
      }
    }
  }
  const [openPopup, setOpenPopup] = useState(false)
  const openInPopup = item => {
    setOpenPopup(true)
}
  return (
    <StylesProvider jss={jss}>
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label,index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
         
           {props.club.notefromstu !== "" && index === 1 && props.club.notefromstu !== undefined && (
            <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
            <WarningIcon color="error" />  
            <Typography
            style={{ marginLeft:2 }}
            variant="caption" 
            onClick ={(()=>{
              setOpenPopup(true);
            })}
            color="error">
              Alert message from STU
              </Typography>
            </Grid>
           )}
            
          </Step>
        ))}
      </Stepper>
      <Popup
          title="Notes"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
      >
          <Alert club={props.club}/>
        </Popup>
    </div>
    </StylesProvider>
  );
}