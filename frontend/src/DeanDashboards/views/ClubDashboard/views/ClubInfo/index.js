import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';

import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import { ViewInfo } from './Infoview';
import PageHeader from '../../controls/PageHeader';
import SchoolIcon from '@material-ui/icons/School';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const BasicInformation = () => {
  const classes = useStyles();
  
  return (
    <Page
      className={classes.root}
      title="Customers"
      >
        <Container maxWidth={false}>
        <PageHeader title='Club Information' subTitle='Basic Information Club' icon={<SchoolIcon fontSize="large" />} />
        <Toolbar />
        <ViewInfo />
        </Container>
        
    </Page>
  );
};

export default BasicInformation;
