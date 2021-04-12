import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { getDataUsers } from './connectDB/getdata';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  getDataUsers().then((u) =>setUsers(u));

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Latest Users" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
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
                 Email
                </TableCell>
                
                <TableCell>
                 Active
                </TableCell>

                <TableCell>
                 Type
                </TableCell>

                <TableCell>
                 Phone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* هنا عدل  */}
              {users.map((order,index) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {order.name}
                  </TableCell>
                  <TableCell>
                    {order.email}
                  </TableCell>
                  <TableCell>
                    {order.status === 'false' ? (
                        <Chip
                        style={{ background:'#C43F3F',color:'white' }}
                        label={order.status}
                        size="small"
                      />
                    ) : (
                      <Chip
                      style={{ background:'#1E8449',color:'white' }}
                      label={order.status}
                      size="small"
                    />
                      
                    )}
                  
                  </TableCell>

                  <TableCell>
                    {order.usertype}
                  </TableCell>

                  <TableCell>
                    {order.phone}
                  </TableCell>
                </TableRow>
                
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          style={{ color: '#1E8449' }}
          onClick={()=>{ navigate('/app/admin/users', { replace: true }); }}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
