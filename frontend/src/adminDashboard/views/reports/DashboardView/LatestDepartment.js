import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Avatar,
  TableRow,
  Tooltip,
  Typography,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getDataDepartment } from './connectDB/getdata'
const useStyles = makeStyles(() => ({
  root: {}
}));

const Department = ({ className, ...rest }) => {
  const classes = useStyles();
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDataDepartment().then((u) =>setDepartments(u));
  });

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Latest Departments" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  No.	
                </TableCell>
                <TableCell>
                  name
                </TableCell>
                <TableCell sortDirection="desc">  
                  Building
                </TableCell>
                <TableCell>
                  College
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* هنا عدل  */}
              {departments.map((department,index) => (
                <TableRow
                  hover
                  key={department._id}
                >
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {department.name}
                  </TableCell>
                  <TableCell>
                    {department.building}
                  </TableCell>
                  <TableCell>
                    {department.college}
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
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          style={{ color: '#1E8449' }}
          onClick={()=>{ navigate('/app/admin/department', { replace: true }); }}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

Department.propTypes = {
  className: PropTypes.string
};

export default Department;
