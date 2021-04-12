import React, { useState,useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { createStore,applyMiddleware,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; 
import closeReducer from './reducers/closepopup';
import statusofSearch from './reducers/statusofSearch';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './connectDB/getdata';
import closeReducerUpdate from './reducers/closePopupUpdate';
import PageHeader from '../../user/UserListView/component/PageHeader';

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
  const [customers, setDpartment] = useState([]);

  data().then((u) =>setDpartment(u));
  

  return (
    <Provider store={store}>
    <Page
      className={classes.root}
      title="Dpartment"
    >
      <Container maxWidth={false}>
      <PageHeader title='Departments' subtitle='List of all Departments' icon={<AccountBalanceIcon fontSize="large" />} />
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
