import React, { useState,useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import getInitials from 'src/utils/getInitials';
import IconButton from '@material-ui/core/IconButton';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import { changeStatusOfStateToStartUpdate } from './actions/index';
import UpdateDepartment from './component/updateDepartment';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const status = useSelector((state) => state.stateUpdate);
  const statusForSearch = useSelector((state) => state.searchBar);
  const dispatch = useDispatch();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const [department, setDepartment] = useState();

  function deleteDataFromDB(id) {
    axios({
        method: 'delete',
        url: `/api/department/${id}`,
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
          {status === true && (<UpdateDepartment department={department} />)}
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
                  Building
                </TableCell>

                <TableCell>
                  College
                </TableCell>

                <TableCell>
                  Link
                </TableCell>
                
                <TableCell style={{ paddingLeft:"35px" }}>
                  Action
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {customers.filter((users)=>{
                 console.log(statusForSearch);
                 if (statusForSearch === "") {
                   return true;
                 }  
                 else {
                   return users.name.includes(statusForSearch);
                 } }).slice(page * limit, page * limit + limit).map((customer,index) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell>
                      {index + 1}
                  </TableCell>
                  
                  <TableCell>
                    {customer.name}
                  </TableCell>

                  <TableCell>
                    {customer.building}
                  </TableCell>

                  <TableCell>
                    {customer.college}
                  </TableCell>

                  <TableCell>
                    
                    {customer.link === undefined ? (undefined) : (<a href={customer.link} style={{ color:"#1E8449" }}>Department Link</a>)}
                  
                  </TableCell>
                  
                  <TableCell>
                  <IconButton 
                  onClick={()=>{
                  setDepartment(customer);
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
