import React, { useState } from 'react';
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

const Toolbar = ({ className, ...rest }) => {

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
}
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
              justify="space-between"
              alignItems="center">
              <Grid item xs={5}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search for member"
                variant="outlined"
              />
              </Grid>
              </Grid>
          </CardContent>
        </Card>
        <Popup
          title="ADD NEW MEMBER TO THE CLUB"
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
