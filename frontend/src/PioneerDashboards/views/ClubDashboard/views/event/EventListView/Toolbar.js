import React, { useState,useEffect,useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import { useSelector, useDispatch } from 'react-redux';
import { Search as SearchIcon } from 'react-feather';
import MoreInfoUser from "./views/moreInfoUser";
import { ComponentToPrintE } from '../../../../../../modelsForPrint/eventToPrint';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className,clubInfo, ...rest }) => {
  const classes = useStyles();

  const status3 = useSelector((state) => state.stateInfoUser);

  const [screen, setScreen] = useState(window.matchMedia("(min-width: 800px)").matches);
  useEffect(() => {
    const handler = (e) => { return setScreen(e.matches); };
    window.matchMedia("(min-width: 800px)").addListener(handler);
  });


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
                         
  {(status3 === true) && (<MoreInfoUser />)}

    <Box mt={3}>
      <Card>
        <CardContent style={{ position:'relative' }}>
          <Box 
          display="flex"
          justifyContent="space-between"
          flex-direction="column"
          >
             <Grid 
           container
           direction="row"
           justify="flex-end"
           alignItems="center"
          >                      
                        {clubInfo !== undefined && clubInfo.length > 0 && (     
                        <div style={{ display:'none' }}>
                        <ComponentToPrintE clubInfo={clubInfo} ref={componentRef} /> 
                        </div>     
                        )}
                        <Button
                          style={{ background:"#1E8449", color:'#ffffff' }}
                          variant="contained"
                          startIcon={<PrintIcon />}
                          onClick={handlePrint}

                        >
                          Print
                        </Button>
        </Grid>

      </Box>
        </CardContent>
      </Card>
    </Box>
  </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
