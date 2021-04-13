import React, {useState} from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider, Grid } from '@material-ui/core';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import Controls from '../../controls/Controls';
import { postClubInfo } from "./clubService";
import { useForm, Form } from '../../controls/useForm';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  
  secondary: {
      
      backgroundColor: theme.palette.success.dark,
      '& .MuiButton-label': {
          color: '#fff',
      }
  },  
  heading: {
    fontSize: theme.typography.pxToRem(25),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  pageIcon:{
    display:'inline-block',
    color:"#1e8449"
    }
}));
/*#############################################*/
let infoObjectives = []

let infoValue = []

const initialFValues = {
    vision: '',
    message: '',
    objectives: infoObjectives,
    value: infoValue,
    createDate: new Date(),   
}

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  /*###############################*/
    const validate = (fieldValues = values) => {
      let temp = { ...errors }
      if ('vision' in fieldValues)
          temp.vision = fieldValues.vision ? "" : "This field is required."
      if ('message' in fieldValues)
          temp.message = fieldValues.message ? "" : "This field is required."
      setErrors({
          ...temp
      })

      if (fieldValues == values)
          return Object.values(temp).every(x => x == "")
  }

  const {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = e => {
      e.preventDefault()
      console.log(values);

      if (validate()) {
          window.alert("it's Working... :)")
          let payload = {
            clubInfo: values
            };
            postClubInfo(payload)
          resetForm()
          infoObjectives =  ["", "", "", "", ""]
          infoValue = ["", "", "", "", ""]
      }
      
      
  }
  const handelInfoObjectives = v =>{
    console.log(v.target.value)
    infoObjectives[parseInt(v.target.name)] = v.target.value
    
  }
  const handeInfolValues = v =>{
      console.log(v.target.value)
      infoValue[parseInt(v.target.name)] = v.target.value
      
  }
  //const [etystate, setEmtystate] = useState([])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(infoObjectives[0]);
  return (
    <Form onSubmit={handleSubmit}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Vision</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
        <Controls.Input
          label="Vision"
          multiline
          rows={4}
          name={"vision"}
          value={values.vision}
          onChange={handleInputChange}
          placeholder="write your club Vision here..."
          variant="outlined"
          className={classes.root}
        />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Message</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
        <Controls.Input
          label="Message"
          multiline
          rows={4}
          name={"message"}
          value={values.message}
          onChange={handleInputChange}
          placeholder="write your club Message here..."
          variant="outlined"
          className={classes.root}
        />
        </AccordionDetails>

      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Objectives</Typography>
          <Typography className={classes.secondaryHeading}>
          (The main goals that the club aims to achieve during the semester)
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
        <Grid container  >
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <LooksOneIcon className={classes.pageIcon} />
          </Grid>
          <Grid item xs={11}>
          <Controls.Input
          className={classes.root}
          name="0"
          value={infoObjectives[0]}
          onChange={handelInfoObjectives}
          placeholder="Write your club first Objective here..." 
        />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <LooksTwoIcon className={classes.pageIcon}/>
          </Grid>
          <Grid item  xs={11}>
          <Controls.Input
          className={classes.root}
          name="1"
          value={infoObjectives[1]}
          onChange={handelInfoObjectives}
          placeholder="Write your club second Objective here..." 
        />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <Looks3Icon className={classes.pageIcon} />
          </Grid>
          <Grid item xs={11}>
          <Controls.Input
          className={classes.root}
          name="2"
          value={infoObjectives[2]}
          onChange={handelInfoObjectives}
          placeholder="Write your club third Objective here..." 
        />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <Looks4Icon className={classes.pageIcon} />
          </Grid>
          <Grid item xs={11}>
          <Controls.Input
          className={classes.root}
          name="3"
          value={infoObjectives[3]}
          onChange={handelInfoObjectives}
          placeholder="Write your club fourth Objective here..." 
        />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end" justify="flex-start">
          <Grid item>
            <Looks5Icon className={classes.pageIcon} />
          </Grid>
          <Grid item xs={11}>
          <Controls.Input
          className={classes.root}
          name="4"
          value={infoObjectives[4]}
          onChange={handelInfoObjectives}
          placeholder="Write your club fifth Objective here..." 
        />
          </Grid>
        </Grid>
        </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
           <Typography className={classes.heading}>Value</Typography>
        <Typography className={classes.secondaryHeading}>
            (The values that the club strives to achieve during the semester)
            </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
        <Grid container  >
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <LooksOneIcon className={classes.pageIcon} />
          </Grid>
          <Grid item xs={11}>
          <Controls.Input
          className={classes.root}
          name="0"
          value={infoValue[0]}
          onChange={handeInfolValues}
          placeholder="Write your club first value here..." 
        />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <LooksTwoIcon className={classes.pageIcon}/>
          </Grid>
          <Grid item  xs={11}>
          <Controls.Input
          className={classes.root}
          name="1"
          value={infoValue[1]}
          onChange={handeInfolValues}
          placeholder="Write your club second value here..." 
        />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <Looks3Icon className={classes.pageIcon} />
          </Grid>
          <Grid item xs={11}>
          <Controls.Input
          className={classes.root}
          name="2"
          value={infoValue[2]}
          onChange={handeInfolValues}
          placeholder="Write your club third value here..." 
        />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <Looks4Icon className={classes.pageIcon} />
          </Grid>
          <Grid item xs={11}>
          <Controls.Input
          className={classes.root}
          name="3"
          value={infoValue[3]}
          onChange={handeInfolValues}
          placeholder="Write your club fourth value here..." 
        />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end" justify="flex-start">
          <Grid item>
            <Looks5Icon className={classes.pageIcon} />
          </Grid>
          <Grid item xs={11}>
          <Controls.Input
          className={classes.root}
          name="4"
          value={infoValue[4]}
          onChange={handeInfolValues}
          placeholder="Write your club fifth value here..." 
        />
          </Grid>
        </Grid>
        </Grid>
        </AccordionDetails>
      </Accordion>
      <div style={{  marginTop: 15 }}>
        <ThemeProvider theme={theme}>
          <Controls.Button
              color="primary"
              type="submit"
              text="Submit" />
          </ThemeProvider>
          <Controls.Button
              text="Reset"
              color="default"
              onClick={resetForm} />
      </div>
      </Form>
  );
}