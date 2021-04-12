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
  Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddIcon from '@material-ui/icons/Add';
import ClubForm from './ClubForm';
import Popup from '../../controls/Popup';
import PrintIcon from '@material-ui/icons/Print';
import PublishIcon from '@material-ui/icons/Publish';
import Sleeper from './sleeper'
import Controls from '../../controls/Controls';
import { ComponentToPrintM } from '../../../../../modelsForPrint/memberToPrint';
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
}));

const Toolbar = ({ className,members, ...rest }) => {

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
        <Card>
          <CardContent>
            <Grid  
              container
              direction="row"
              justify="flex-end"
              alignItems="center">
              <Grid container item xs={2} justify="flex-end" alignItems="center">
              <Controls.Button
                        text="Add"
                        style={{ backgroundColor:"#1e8449" }} 
                        startIcon={<AddIcon />}
                        className={classes.secondary}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
              {members.length > 0 && (
                <div style={{ display:'none' }}>
                <ComponentToPrintM members={members} ref={componentRef} /> 
                </div>
              )}
              <Controls.Button
                 text="Print"
                 startIcon={<PrintIcon />}
                 style={{ backgroundColor:"#1e8449" }} 
                 className={classes.secondary}
                                        onClick={handlePrint}

             />      
              </Grid>
              </Grid>
          </CardContent>
        </Card>
        <Popup
          title="Add new member to the club"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
      >
          <ClubForm />
        </Popup>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
