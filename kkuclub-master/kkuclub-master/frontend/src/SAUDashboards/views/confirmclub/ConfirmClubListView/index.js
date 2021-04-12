import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Card,
  Typography,
  Avatar,
  CardContent,
  Divider,
  makeStyles
} from '@material-ui/core';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import { Pagination } from '@material-ui/lab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Bar from './bar';
import PageHeader from '../../../../adminDashboard/views/user/UserListView/component/PageHeader';
import axios from "axios";
import MemberInfo from './MemberInfo'
import Popup from '../../../../PresidentDashboards/views/ClubDashboard/controls/Popup';
import Infoview from '../../../../PresidentDashboards/views/ClubDashboard/views/ClubInfo/Infoview';
import ClubCard from './EventCards';
import Report from '../../../../PresidentDashboards/views/reports/DashboardView/index';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));


const ClubList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const [indexNow, setIndex] = useState(-1);
  const [openPopup, setOpenPopup] = useState(false)
  const openInPopup = item => {
    setOpenPopup(true)
}
  async function getMemberArray() {
    const res = await axios(`/api/club/?id=${state._id}`);
            return res.data.member;
  }


  const { clubName } = state; // Read values passed on state

  const [value, setValue] = React.useState('0');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [page, setPage] = React.useState(1);
  const handleChangePage = (event,value) => {
    setPage(value);
  };
  return (
    <Page
      className={classes.root}
      title="Clubs"
    >
      <Container maxWidth={false}>
        <PageHeader title={clubName} subtitle='Confirm the information of the club' />
        <Toolbar club={state} />
        {(state.statusofplan === "Under review" || state.statusofplan === "Approved") ? (
        <TabContext value={value}>
            <AppBar position="static" color="default">
              <TabList onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Summary" value="0" />
                <Tab label="Basic information" value="1" />
                <Tab label="Member" value="2" />
                <Tab label="Events" value="3" />
              </TabList>
            </AppBar>
            <TabPanel value="0">
             <Report />
            </TabPanel>
            <TabPanel value="1">
            <Bar value={value} clubInfo={state.clubInfo} />
             <Infoview _id={state._id} />
            </TabPanel>
            <TabPanel value="2">
            <Bar value={value} members={state.member} />
            <Card style={{ marginTop:"15px" }}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  No.
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                occupation
                </TableCell>
                <TableCell>
                committee
                </TableCell>
                <TableCell style={{ paddingLeft:"35px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.member !== undefined && state.member.map((member,index)=> {return (
                <TableRow
                  hover
                >
                   {(openPopup === true && index === indexNow) && (
                    <Popup
                    title={member.memberInfo.name}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <MemberInfo members={member} />
                  </Popup>
                  )}
                  <TableCell>
                    {index+1}
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    > 
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {member.memberInfo.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {member.occupation}
                  </TableCell>
              
                  <TableCell>
                    {member.committee.name !== undefined && member.committee.name}
                  </TableCell>

                  <TableCell>
                  <IconButton
                   onClick={() => { setOpenPopup(true); setIndex(index); }}
                   style={{ color:"#1E8449" }}
                   className={classes.button} 
                   aria-label="Update">
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </TableCell>
                
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
            </TabPanel>
            <TabPanel value="3">
            <Bar value={value} clubInfo={state.event} /> 
            <Box mt={3}>
            <Grid
            container
            spacing={3}
          >
             {state.event !== undefined && state.event.slice((page - 1) * 8,page * 8).map((club,index) => (
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
            count={state.event !== undefined ? Math.ceil(state.event.length / 8) : 1}
            color="primary"
            onChange={handleChangePage}
          />
        </Box>
            </TabPanel> 
          </TabContext>  
          ):(
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ marginTop:"80px" }}
            >
              <Typography
              align="center"
              color="primary"
              gutterBottom
              variant="h4"
            >
            No plan has been uploaded
        </Typography>
            </Grid>
          )}        
      </Container>
    </Page>
  );
};

export default ClubList;
