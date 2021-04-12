import React, {useState} from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider, Grid, IconButton } from '@material-ui/core';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import Controls from '../../controls/Controls';
import { postClubInfo } from "./clubService";
import { useForm, Form } from '../../controls/useForm';
import { green } from '@material-ui/core/colors';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { BorderOuterRounded } from '@material-ui/icons';

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


const initialFValues = {
    vision: '',
    message: '',
    objectives: [],
    value: [],
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
  //here we start to edit

  const [inputList, setInputList] = useState([{ objective: "" }]);

  //handle input change
  const handleInputChangeList = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    console.log(list);
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { objective: "" }]);
  };

  // here the value edit
  const [inputListValue, setInputListValue] = useState([{ value: "" }]);

  //handle input change
  const handleInputChangeListValue = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListValue];
    list[index][name] = value;
    console.log(list);
    setInputListValue(list);
  };

  // handle click event of the Remove button
  const handleRemoveClickValue = index => {
    const list = [...inputListValue];
    list.splice(index, 1);
    setInputListValue(list);
  };

  // handle click event of the Add button
  const handleAddClickValue = () => {
    setInputListValue([...inputListValue, { value: "" }]);
  };

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
      if (validate()) {
          window.alert("data added... :)")
          const finalValues = {
            vision: values.vision,
            message: values.message,
            objectives: inputList,
            value: inputListValue,
            createDate: new Date(),   
        }
          let payload = {
            clubInfo: finalValues
            };
            postClubInfo(payload)
          resetForm()
          setInputList([{ objective: "" }])
          setInputListValue([{ value: "" }])

      }
      
      
  }
  
  

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
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
        <div>                  
                      {inputList.map((x, i) => {
                        return (
                          <div >
                            <Controls.Input                              
                              name="objective"
                              placeholder="Add objective"
                              value={x.objective}
                              onChange={e => handleInputChangeList(e, i)}
                            />                            
                              {inputList.length !== 1 && <IconButton 
                              color="primary"         
                                onClick={() => handleRemoveClick(i)}>
                                  {<HighlightOffOutlinedIcon style={{color:"red"}}/>}
                                  </IconButton>}
                              {inputList.length - 1 === i && <IconButton                                
                                onClick={handleAddClick}>
                                  {<AddOutlinedIcon style={{color:"green"}}/>}                                 
                                  </IconButton>}
                            </div>                         
                        );
                      })}
                    </div>
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
        <div>                  
                      {inputListValue.map((x, i) => {
                        return (
                          <div >
                            <Controls.Input                              
                              name="value"
                              placeholder="Add value"
                              value={x.value}
                              onChange={e => handleInputChangeListValue(e, i)}
                            />                            
                              {inputListValue.length !== 1 && <IconButton                                
                                onClick={() => handleRemoveClickValue(i)}>
                                  {<HighlightOffOutlinedIcon style={{color:"red"}}/>}
                                  </IconButton>}
                              {inputListValue.length - 1 === i && <IconButton                                 
                                onClick={handleAddClickValue}>
                                  {<AddOutlinedIcon style={{color:"green"}}/>}                                 
                                  </IconButton>}
                            </div>                         
                        );
                      })}
                    </div>
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