import React, { useState,useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Grid,
  Paper
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddIcon from '@material-ui/icons/Add';
import Listinfo from './list';
import Popup from '../../controls/Popup';
import Controls from '../../controls/Controls';
import Sleeper from './sleeper'
import PrintIcon from '@material-ui/icons/Print';
import PublishIcon from '@material-ui/icons/Publish';
import { ComponentToPrint } from '../../../../../modelsForPrint/infoClubToPrint';
import ToPrint from '../../../../../modelsForPrint/ToPrint';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  secondary: {
    backgroundColor: theme.palette.success.light,

    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

const Toolbar = ({ className, ...rest }) => {

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
}

//print
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
        <div style={{ display:'none' }}>
              <ComponentToPrint ref={componentRef} /> 
              </div>  
      <Grid  container direction="row"justify="flex-end" alignItems="center" >
                    
              <Controls.Button
                        text="Print"
                        startIcon={<PrintIcon />}
                        style={{ backgroundColor:"#1e8449" }} 
                        className={classes.secondary}
                        onClick={handlePrint}

                    />
            </Grid>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
