import React,{ useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
  makeStyles
} from '@material-ui/core';
import axios from "axios";
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { openPopupDelete,changeStatusOfStateToStartUpdate,addInfoCollege,addInfoUsers,addInfoClub,changeStatusOfStateToStartInfo,presidState,pioState } from '../actions/clubs';
import Delete from './deleteEvent';
import ReportEvent from './repoortEvent';
import ExpensesEvent from './ExpensesEvent';
import Popup from './Popup';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  }
}));

function uploadDataToDB(info) {
  axios({
      method: 'put',
      url: `/api/club/6071d194d7edbe148cce1eff`,
      data: qs.stringify(info),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
      .then((response) =>{
      })
      .catch((error) =>{
          alert(`Error : + ${error.response.data.message}`);
      });
}

const ClubCard = ({ className, club: club,clubInfo, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

const status = useSelector((state) => state.closePopup);
const [openPopup, setOpenPopup] = useState(false);
const openInPopup = (item) => { setOpenPopup(true); }

if (status === false && openPopup === true) {
  setOpenPopup(false);
}

const [state, setState] = React.useState({
  checkedA: club.eventDisply === "true" ? true : false,  
});


const handleChangeForSwitche = (event) => {
  setState({ ...state, [event.target.name]: event.target.checked });
  for (let index = 0; index < clubInfo.event.length; index++) {
         if (club.eventName === clubInfo.event[index].eventName && 
          club.eventDesc === clubInfo.event[index].eventDesc) {
            clubInfo.event[index].eventDisply = event.target.checked;
            console.log('yes');
          }   
  }  
  uploadDataToDB(clubInfo);
};

const [anchorEl, setAnchorEl] = React.useState(null);
const handleClick = (event) => {
  console.log(event.currentTarget);
  setAnchorEl(event.currentTarget);
};



const [openPopupReport, setOpenPopupReport] = useState(false);
const openInPopupReport = (item) => { setOpenPopupReport(true); }


const [openPopupExp, setOpenPopupExp] = useState(false);
const openInPopupExp = (item) => { setOpenPopupExp(true); }

const handleClose = (event) => {
  setAnchorEl(null);
};
const handleOpen = (event) => {
  console.log(anchorEl);
  const val = new Date();
  const val2 = new Date(parseInt(club.evenTime));
  console.log(val.getTime()>val2.getTime());
  if (event.target.value == 0 && val.getTime()>val2.getTime() === false) {
          alert("You cannot write the report now");
          setAnchorEl(null);
  }
  else if(event.target.value == 1) {
    setOpenPopupExp(true);
  }
  else {
    setOpenPopupReport(true);
    setAnchorEl(null);
  }
};

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      >
       <FormControlLabel
        control={<Switch checked={state.checkedA} onChange={handleChangeForSwitche} name="checkedA" />}
        label="Active"
      />

      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpen} value={0}>Report</MenuItem>
        <MenuItem onClick={handleOpen} value={1}>View Report</MenuItem>
      </Menu>
      </Grid>
    <Divider />        
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={1}
        >
          <Avatar
            alt="club"
            src={`http://localhost:5000/uploads\\image.jpeg`}
            className={classes.large}
          />
        </Box>
        <Typography
          align="center"
          color="primary"
          gutterBottom
          variant="h4"
        >
          {club.eventName}
        </Typography>

        <Typography
          align="center"
          gutterBottom
          style={{ wordBreak:'break-word' }}
          variant="body1"
        >
          {club.eventDesc}
        </Typography>

        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          Presenter: <button 
          style={{ color:'#1E8449',background:'none',border:'none',outlineWidth:0 }} 
          >{club.eventPresenter}</button>
        </Typography>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          Coordinator: <button 
          style={{ color:'#1E8449',background:'none',border:'none',outlineWidth:0 }} 
          >{club.eventCoordinator}</button>
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              display="inline"
              variant="body2"
            >
              Type: <span style={{ color:'#1E8449' }}>{club.eventType.name}</span>
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
        <Popup
          title="Delete event"
          maxWidth="md"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
      >
          <Delete club={club} />
       </Popup>
          <IconButton 
                    onClick={() => {
                         setOpenPopup(true);
                         dispatch(openPopupDelete());
                        }} 
                    style={{ color:"#C43F3F" }} 
                    aria-label="Delete" 
                    align="center">
                      <DeleteIcon />
         </IconButton>

        
         <Popup
          title="Edit report"
          maxWidth="md"
          openPopup={openPopupReport}
          setOpenPopup={setOpenPopupReport}
      >
        <ReportEvent club={club}/>
       </Popup>

     
       <Popup
          title="View Report"
          maxWidth="md"
          openPopup={openPopupExp}
          setOpenPopup={setOpenPopupExp}
      >
        <ExpensesEvent />
       </Popup>

         <IconButton 
                    onClick={() => {
                      dispatch(changeStatusOfStateToStartUpdate());
                      dispatch(addInfoClub(club));
                    }} 
                    style={{ color:"#1E8449" }} 
                    aria-label="Update">
                      <CreateIcon />
         </IconButton>


          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ClubCard.propTypes = {
  className: PropTypes.string,
  club: PropTypes.object.isRequired
};

export default ClubCard;
