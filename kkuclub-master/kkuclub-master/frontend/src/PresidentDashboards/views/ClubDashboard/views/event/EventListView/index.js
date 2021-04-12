import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import { Pagination } from '@material-ui/lab';
import thunk from 'redux-thunk'; 
import { createStore,applyMiddleware,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Page from 'src/components/Page';
import axios from "axios";
import qs from 'qs';
import Toolbar from './Toolbar';
import informationCollege from './reducers/clubInfoCollege';
import informationUsers from './reducers/clubInfoUsers';
import closeReducer from './reducers/closepopup';
import closeReducerUpdate from './reducers/closePopupUpdate';
import closeReducerInfo from './reducers/closepopupInfoUser';
import positionEvent from './reducers/clubposition';
import closePopup from './reducers/closepopupDelete';
import clubInfo from "./reducers/clubInfoUpdate";
import dataNeedUpdate from "./reducers/updateYourData";
import statusOfClickUser from "./reducers/statusWhenHeClick";
import ClubCard from './views/EventCards';
// import PageHeader from '../../../../adminDashboard/views/user/UserListView/component/PageHeader';
import PageHeader from '../../../../../../adminDashboard/views/user/UserListView/component/PageHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  clubCard: {
    height: '100%'
  }
}));

//now here we create store to change the status of popup
const allreducer = combineReducers({
  stateInfo: informationCollege,
  stateUsers: informationUsers,
  closepopup:closeReducer,
  stateUpdate:closeReducerUpdate,
  stateClub:clubInfo,
  stateInfoUser:closeReducerInfo,
  statusOfClick:statusOfClickUser,
  positionEvent:positionEvent,
  closePopup:closePopup,
  dataNeedUpdate:dataNeedUpdate
});
const store = createStore(allreducer,applyMiddleware(thunk));

const getDataClub = async () => {
  const res = await axios('/api/club?id=6071d194d7edbe148cce1eff');
  return res.data;
}


const ClubList = () => {
  const classes = useStyles();

  //here for club
  let [clubs,setClub] = React.useState([]);
  const [clubInfo, setInfo] = React.useState({});

useEffect(() => {
  getDataClub().then((u) =>{ setInfo(u); });
  console.log('yes');
},[]);

  //FOR UPDATE EVENT IF WE ADD 
  if (clubInfo.event !== undefined && clubInfo.event.length !== clubs.length) {
    clubInfo.event = clubs;
    console.log('YES');
  }
  if (store.getState().dataNeedUpdate === true) {
    getDataClub().then((u) =>{ setInfo(u); });
    console.log('YES2');
    store.getState().dataNeedUpdate = false;
  }

  getDataClub().then((u) =>{ setClub(u.event); });


  const [page, setPage] = React.useState(1);
  const handleChange = (event,value) => {
    setPage(value);
  };

  return (
    <Provider store={store}>
    <Page
      className={classes.root}
      title="Events"
    >
      <Container maxWidth={false}>
        <PageHeader title='Events' subtitle='List of all events' icon={<BubbleChartIcon fontSize="large" />} />
        <Toolbar clubInfo={clubInfo} />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
             {clubs.slice((page - 1) * 8,page * 8).map((club,index) => (
              <Grid
                item
                lg={3}
                md={6}
                xs={12}
                key={club._id}
              >
                 <ClubCard
                  className={classes.clubCard}
                  club={club}
                  clubInfo={clubInfo} 
                />
              </Grid>
            ))} 
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            count={Math.ceil(clubs.length / 8)}
            color="primary"
            onChange={handleChange}
          />
        </Box>
      </Container>
    </Page>
    </Provider>
  );
};

export default ClubList;
