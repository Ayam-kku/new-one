import React,{useState,useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TotalEvent from './TotalEvent';
import TotalMember from './TotalMember';
import TypeByUser from './TypeByEvent';
import TotalBudget from './TotalBudget';
import EventsInMo from './EventsInMo';
import EventsByBudget from './EventsByBudget';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


async function getClub(_id) {
  const res = await axios(`/api/club/?id=${_id}`);
    return  res.data;
}

const Dashboard = () => {
  const classes = useStyles();
  const [club, setClub] = useState({});

  useEffect(() => {
      getClub('6071d194d7edbe148cce1eff').then((u)=>{
          setClub(u);
      })
  },[]);

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      {(club.statusofplan !== "Edit"&&club.statusofplan !== undefined) && 
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
        <Grid
          container
          spacing={3}
          justify="center"
          style={{ margin:"0 auto" }}
        >
         <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <TotalEvent />
          </Grid>  

          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <TotalBudget />
          </Grid>

          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <TotalMember />
          </Grid>
    
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <TypeByUser />
          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            xs={12}
          >
            <EventsInMo />
          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            xs={12}
          >
            <EventsByBudget />
          </Grid>

        </Grid>          
        </Grid>
      </Container>
   }
    </Page>
  );
};

export default Dashboard;
