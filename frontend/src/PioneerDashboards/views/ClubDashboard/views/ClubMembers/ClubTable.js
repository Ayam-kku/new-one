import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import Popup from '../../controls/Popup';
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import MemberInfo from './member serv/MemberInfo'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    direction: 'rtl',
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const ClubTable = ({ className, members: members, ...rest }) => {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  const [openPopup, setOpenPopup] = useState(false)
  const openInPopup = item => {
    setOpenPopup(true)
}
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [indexNow, setIndex] = useState(-1);
  const [page, setPage] = useState(0);

  
  

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  
   console.log(openPopup);
  
  return (
    <StylesProvider jss={jss}>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color :"#1e8449" }} >
                  No.
                </TableCell>
                <TableCell style={{ color :"#1e8449" }}>
                  Name
                </TableCell>
                <TableCell style={{ color :"#1e8449" }}>
                  Occupation
                </TableCell>
                <TableCell style={{  color :"#1e8449" }}>
                Committee
                </TableCell>
                <TableCell style={{ color :"#1e8449" }}>
                  Phone
                </TableCell>
                {/* <TableCell style={{  color :"#1e8449" }}>
                  Email
                </TableCell> */}
                <TableCell style={{  paddingLeft: "80px", color :"#1e8449"}}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.length > 0 && members.slice(page * limit, page * limit + limit).map((item,index) => {return (
                
                
                <TableRow
                  hover
                  key={item.id}
                  selected={selectedCustomerIds.indexOf(item.id) !== -1}

                >
                  {(openPopup === true && index === indexNow) && (
                    <Popup
                    title={item.memberInfo.name}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <MemberInfo members={item} />
                  </Popup>
                  )}
                  
                  <TableCell >
                    {index + 1}
                  </TableCell>
        
                  <TableCell >
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={item.avatarUrl}
                      >
                        {getInitials(item.memberInfo.name)}
                      </Avatar>
                      
                      <Typography
                        size='small'
                        color="textPrimary"
                        variant="body1"
                      >
                        {item.memberInfo.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell >
                    {item.occupation}
                  </TableCell>
                  <TableCell >
                    {item.committee.name}
                  </TableCell>
                  <TableCell >
                  {item.memberInfo.phone}
                  </TableCell>
                  
                  <TableCell>
                  <IconButton
                   onClick={() => { setOpenPopup(true); setIndex(index); }}
                   style={{ color:"#1E8449",marginLeft:"60px" }}
                   className={classes.button} 
                   aria-label="Update">
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </TableCell>
                  
                </TableRow>
                
              )
            }
          )
        }
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={members.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      
        
    </Card>
    </StylesProvider>
  );
};

ClubTable.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default ClubTable;
