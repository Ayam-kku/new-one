import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
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
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EmailIcon from '@material-ui/icons/Email';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteDataFromDB } from './PurchasesService'


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const PurchasesTable = ({ className, members: members, ...rest }) => {
  
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

  
  return (
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
                  Event Name
                </TableCell>
                <TableCell style={{ color :"#1e8449" }}>
                  Product
                </TableCell>
                <TableCell style={{  color :"#1e8449" }}>
                  Price
                </TableCell>
                <TableCell style={{ color :"#1e8449" }}>
                  Invoice
                </TableCell>
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
                  <TableCell >
                    {index + 1}
                  </TableCell>
        
                  <TableCell >
                    {item.eventName}
                  </TableCell>

                  <TableCell >
                    {item.product}
                  </TableCell>
                  <TableCell >
                    {item.price}
                  </TableCell>
                  <TableCell >
                  <Avatar alt="Pill" src={`http://localhost:5000/${item.Userimg}`} />
                  </TableCell>
                  
                  <TableCell>
                  <IconButton
                   href={`http://localhost:5000/${item.Userimg}`}
                   style={{ color:"#1E8449" }}
                   className={classes.button} 
                   aria-label="Update">
                      <RemoveRedEyeIcon />
                    </IconButton>
                    <IconButton
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this information?')) {
                        deleteDataFromDB(item._id);
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
        count={0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      
        
    </Card>
  );
};

PurchasesTable.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default PurchasesTable;
