import React, { useState, useEffect } from 'react';
import logger from 'redux-logger';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Page from 'src/components/Page';
import thunk from 'redux-thunk'; 
import { createStore,applyMiddleware,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import EventNoteIcon from '@material-ui/icons/EventNote';
import closeReducer from './reducers/closepopup';
import closeReducerUpdate from './reducers/closePopupUpdate';
import statusofSearch from './reducers/statusofSearch';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './connectDB/getdata';
import PageHeader from './component/PageHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


//now here we create store to change the status of popup
const allreducer = combineReducers({
    state: closeReducer,
    stateUpdate:closeReducerUpdate,
    searchBar: statusofSearch 
});


const store = createStore(allreducer,applyMiddleware(thunk));

const CustomerListView = () => {
  const classes = useStyles();
  const [event, setEvent] = useState([]);

    data().then((u) =>setEvent(u));

  return (
    <Provider store={store}>
    <Page
      className={classes.root}
      title="Types of events"
    >
      <Container maxWidth={false}>
        <PageHeader title='Types of events' subtitle='List of all type of events' icon={<EventNoteIcon fontSize="large" />} />
        <Toolbar />
        <Box mt={3}>
         <Results customers={event} /> 
        </Box>
      </Container>
    </Page>
    </Provider>
  );
};

export default CustomerListView;
