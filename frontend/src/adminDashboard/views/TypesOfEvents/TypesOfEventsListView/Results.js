import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux';
import { changeStatusOfStateToStartUpdate } from './actions/index';
import UpdateUser from './component/updateEventType';

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
  
  const [eventType, setEvent] = useState();

  function deleteDataFromDB(id) {
    axios({
        method: 'delete',
        url: `/api/Event-Type/${id}`,
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
    {status === true && (<UpdateUser committee={eventType} />)}
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
                  Description
                </TableCell>

                <TableCell align="center">
                  Action
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody align="center">
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
                    {customer.name}
                  </TableCell>

                  <TableCell>
                    {customer.description}
                  </TableCell>

                  <TableCell align="center">
                  <IconButton 
                  onClick={() => {
                  setEvent(customer);
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
