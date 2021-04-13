import React, { useState,useEffect,useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { red,green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import PrintIcon from '@material-ui/icons/Print';
import { ComponentToPrint } from 'src/modelsForPrint/infoClubToPrint';
import { ComponentToPrintM } from 'src/modelsForPrint/memberToPrint';
import { ComponentToPrintE } from 'src/modelsForPrint/eventToPrint';
import ToPrint from 'src/modelsForPrint/ToPrint';

const Toolbar = ({ className,value,clubInfo,members, ...rest }) => {

const handleClick = () => {
  };
  //print
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});

  return (
      <Card>
        <CardContent>
          <Grid 
           container
           direction="row"
           justify="flex-end"
           alignItems="center"
          >
          {value === "1" && (
             <div style={{ display:'none' }}>
             <ComponentToPrint clubInfo={clubInfo}  ref={componentRef} /> 
             </div> 
          )} 

        {value === "2" && (
                <div style={{ display:'none' }}>
                <ComponentToPrintM members={members} ref={componentRef} /> 
                </div>  
          )}
        {value === "3" && (
                <div style={{ display:'none' }}>
                <ComponentToPrintE clubInfo={clubInfo} ref={componentRef} /> 
                </div>  
          )}    
          <Button
            style={{ background:"#1E8449", color:'#ffffff'}}
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            >
            Print
          </Button>
          
          </Grid>
        </CardContent>
      </Card>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
