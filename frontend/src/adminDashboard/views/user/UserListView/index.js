import React, { useState, useEffect } from 'react';
import logger from 'redux-logger';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group'
import Page from 'src/components/Page';
import thunk from 'redux-thunk'; 
import { createStore,applyMiddleware,combineReducers } from 'redux';
import { Provider } from 'react-redux';
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
  const [customers, setusers] = useState([]);

  
    data().then((u) =>setusers(u));

  return (
    <Provider store={store}>
    <Page
      className={classes.root}
      title="Users"
    >
      <Container maxWidth={false}>
        <PageHeader title='Users' subtitle='List of all users' icon={<GroupIcon fontSize="large" />} />
        <Toolbar />
        <Box mt={3}>
         <Results customers={customers} /> 
        </Box>
      </Container>
    </Page>
    </Provider>
  );
};

export default CustomerListView;
