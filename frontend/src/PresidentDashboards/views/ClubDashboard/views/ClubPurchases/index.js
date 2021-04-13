import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import PurchasesTable from './PurchasesTable';
import PageHeader from '../../controls/PageHeader';
import { getPurchases } from './PurchasesService';

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

  const [members, setMembers] = useState([]);
    getPurchases().then((u) =>setMembers(u));
  
  return (
    <Page
      className={classes.root}
      title="Club Information"
      >
        <Container maxWidth={false}>
        <PageHeader title='Club Purchases' subTitle='All Club Purchases' icon={<MonetizationOnIcon fontSize="large" />} />
        <Toolbar />
        <PurchasesTable members={members}/>
        </Container>
        
    </Page>
  );
};

export default BasicInformation;
