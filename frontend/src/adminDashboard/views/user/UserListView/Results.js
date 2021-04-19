import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Chip,
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
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import EmailIcon from '@material-ui/icons/Email';
import axios from "axios";


import { useDispatch, useSelector } from 'react-redux';
import { changeStatusOfStateToStartUpdate } from './actions/index';
import UpdateUser from './component/updateUser';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  
  const status = useSelector((state) => state.stateUpdate);
  const statusForSearch = useSelector((state) => state.searchBar);
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
 
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const [user, setUser] = useState();

  function deleteDataFromDB(id) {
    axios({
        method: 'delete',
        url: `/api/users/${id}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
        .then((response) =>{
          alert('data deleted');
        })
        .catch((error) =>{
            alert(`Error : + ${error.response.data.message}`);
        });
}

  useEffect(() => {
    if (page !== 0 && statusForSearch !== "") {
      console.log('yesss');
      setPage(0);
    }
  });

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >   
    {status === true && (<UpdateUser user={user} />)}
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                
              <TableCell>
                 التسلسل
              </TableCell>

                <TableCell>
                  الاسم
                </TableCell>
                
                <TableCell>
                  الصنف
                </TableCell>

                <TableCell>
                 المنصب
                </TableCell>

                <TableCell>
                 الحالة
                </TableCell>

                <TableCell>
                  البريدالإلكتروني
                </TableCell>
                
                <TableCell>
                  الجوال
                </TableCell>

                <TableCell style={{ paddingLeft:"65px" }}>
                  الأحداث
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>
              {customers.filter((users)=>{
                 if (statusForSearch === "") {
                   return true;
                 }  
                 else {
                   return users.name.includes(statusForSearch);
                 } }).slice(page * limit, page * limit + limit).map((customer,index) => (
                <TableRow
                  hover
                  key={customer._id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell>
                    {index + 1}
                  </TableCell>

                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                    <Avatar alt="User" src={`http://localhost:5000/${customer.Userimg}`} />
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {customer.usertype}
                  </TableCell>

                  <TableCell>
                    {customer.postion.typePos}
                  </TableCell>

                  <TableCell>
                  {customer.status === 'InActive' ? (
                        <Chip
                        style={{ background:'#C43F3F',color:'white' }}
                        label={customer.status}
                        size="small"
                      />
                    ) : (
                      <Chip
                      style={{ background:'#1E8449',color:'white' }}
                      label={customer.status}
                      size="small"
                    />
                      
                    )}
                  </TableCell>

                  <TableCell>
                    {customer.email}
                  </TableCell>
                  
                  <TableCell>
                    {customer.phone}
                  </TableCell>

                  <TableCell>

                  <IconButton 
                  onClick={() => {
                  setUser(customer);
                  dispatch(changeStatusOfStateToStartUpdate());
                  }}
                  style={{ color:"#1E8449" }} 
                  className={classes.button} 
                  aria-label="Update">
                      <UpdateIcon />
                    </IconButton>

                    <IconButton 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this information?')) {
                        deleteDataFromDB(customer._id);
                      }
                    }} 
                    color="secondary" 
                    style={{ color:"#C43F3F" }} 
                    className={classes.button} 
                    aria-label="Delete">
                      <DeleteIcon />
                    </IconButton> 

                    <IconButton 
                    onClick={()=>{ 
                        window.open(`mailto:${customer.email}?subject=Subject&body=Email:${customer.email}%0D%0APassword:${customer.password}%0D%0AURL: http://localhost:3000/login `);
                     }} 
                     style={{ color:"#1E8449" }} 
                     className={classes.button} 
                     aria-label="send">
                      <EmailIcon />
                    </IconButton>


                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
