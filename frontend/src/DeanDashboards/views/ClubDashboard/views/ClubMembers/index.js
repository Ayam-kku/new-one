import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ClubTable from './ClubTable';
import PageHeader from '../../controls/PageHeader';
import SchoolIcon from '@material-ui/icons/School';
import {getMemberArray} from './clubService'





const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ClubMembers = () => {

  
  const classes = useStyles();

  const [members, setMembers] = useState([]);
    getMemberArray().then((u) =>setMembers(u));

  return (
    <Page
      className={classes.root}
      title="Products"
    >
       <Container maxWidth={false}>
       <PageHeader title='Club Member' subTitle='List of all Member in the club' icon={<SchoolIcon fontSize="large" />} />
        <Toolbar />
        <ClubTable members={members} />
      </Container>
    </Page>
  );
};

export default ClubMembers;
