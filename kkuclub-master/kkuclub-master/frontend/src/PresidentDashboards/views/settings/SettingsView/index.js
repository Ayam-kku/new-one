import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import AccountView from 'src/PresidentDashboards/views/account/AccountView';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
     <Container maxWidth="lg">
        <AccountView />
      </Container>
    </Page>
  );
};

export default SettingsView;
