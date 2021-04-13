import React, { useState,useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import SchoolIcon from '@material-ui/icons/School';
import { createStore,applyMiddleware,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; 
import closeReducer from './reducers/closepopup';
import statusofSearch from './reducers/statusofSearch';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './connectDB/getdata';
import PageHeader from '../../user/UserListView/component/PageHeader';
import closeReducerUpdate from './reducers/closePopupUpdate';



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
  const [customers,setCollege] = useState([]);

  data().then((u) =>setCollege(u));

  return (
    <Provider store={store}>
    <Page
      className={classes.root}
      title="College"
    >
      <Container maxWidth={false}>
      <PageHeader title='Colleges' subtitle='List of all Colleges' icon={<SchoolIcon fontSize="large" />} />
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
