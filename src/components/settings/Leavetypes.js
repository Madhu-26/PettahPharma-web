import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Button,Card,CardContent,CardHeader,Checkbox,Divider,FormControlLabel,Grid,Typography} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, status, quota, frequency) {
  return { name, status, quota, frequency };
}

const rows = [
  createData('Medical Leave', 'Paid', '3', 'Monthly'),
  createData('Personal Leave', 'Unpaid', '3', 'Monthly'),
];

function Leavetypes() {
  
 const classes = useStyles();

  return (
    <div >
      <Card>
        <CardHeader
                action={
                  <Link to={'/app/Add_Leavetype'}>
                  <IconButton aria-label="add">
                    <AddCircleIcon fontSize="large" color="primary" />
                  </IconButton>
                  </Link>
                }
          subheader="Manage the Leave types"
          title="Leaves List"
        />
        <Divider />
        <Box 
      display="flex"
      justifyContent="flex-start"
      m={2}
      >     
    <TableContainer component={Paper}>
      <br />
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Leave Name</b></TableCell>
            <TableCell align="center"><b>Paid/Unpaid</b></TableCell>
            <TableCell align="center"><b>Leave Quota</b></TableCell>
            <TableCell align="center"><b>Quota Frequency</b></TableCell>
            <TableCell colSpan={2} align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.quota}</TableCell>
              <TableCell align="center">{row.frequency}</TableCell>
              <TableCell align="center"><IconButton aria-label="edit"><EditIcon /></IconButton></TableCell>
              <TableCell align="center"><IconButton color='Secondary'aria-label="delete"><DeleteIcon /></IconButton></TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
      </Card>
      </div>
  );
}
export default Leavetypes;
  