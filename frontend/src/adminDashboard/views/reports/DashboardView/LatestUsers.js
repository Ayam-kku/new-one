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
  makeStyles,
  MuiThemeProvider
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { getDataUsers } from './connectDB/getdata';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  direction: 'rtl',
  actions: {
    justifyContent: 'flex-end'
  }
}));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  getDataUsers().then((u) =>setUsers(u));

  return (
    <StylesProvider jss={jss}>
    <Card
      className={clsx(classes.direction, className)}
      {...rest}
    >
      <CardHeader title="المستخدمين المضافين حديثا" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead >
              <TableRow>
                
                <TableCell>
                  التسلسل
                </TableCell>
                
                <TableCell >
                  الاسم
                </TableCell>

                <TableCell>
                 البريد الاكتروني
                </TableCell>
                
                <TableCell>
                 الحالة
                </TableCell>

                <TableCell>
                 التصنيف
                </TableCell>

                <TableCell>
                 الجوال
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
        رؤية الكل
        </Button>
      </Box>
    </Card>
    </StylesProvider>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
