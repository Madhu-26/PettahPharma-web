import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  Container,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import getInitials from 'src/utils/getInitials';
import { Link, Route } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';

const MedicalRepList = ({ rest,props} ) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',

    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: 'black',
    },
    formbox: {
      backgroundColor: 'gray',
      width: '60%',
      marginTop: '40px',
      marginLeft: '200px',
      height: 'full',
      boxShadow: "2px 2px 5px  2px #9E9E9E",
      padding: "2vh",
      borderRadius: "5px",
      align: 'center',
    },
    textfield: {
      backgroundColor: 'white',
      width: '100%',
      marginTop: '0px',
      marginLeft: '100px',
      height: '100%',
      // boxShadow: "2px 2px 5px  2px #9E9E9E",
      padding: "2vh",
      borderRadius: "5px",
    },
  }));


  const classes = useStyles();

  const [selectedRowIds, setSelectedRowIds] = useState([])

  // let admin_ID = localStorage.getItem('admin_ID');
  // admin_ID = JSON.parse(admin_ID)
  // console.log(admin_ID);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/viewmedicalreplist', {
        // params: {
        //   admin_ID: admin_ID,
        // }
      });
      setSelectedRowIds(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const deleteMedicalrep = (rep_ID) => {
    axios.get("http://localhost:3001/deletemedicalrep", {
      params: {
        rep_ID: rep_ID,
      }
    }).then((response) => {
      window.location.reload();
    })
  };

  const [searchTerm, setSearchTerm] = useState("");
  

  return (
    <>
    <Helmet>
      <title>Medical Representatives</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
    <>
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            // justifyContent: 'flex-end',
            mt: 3,
            flex: 3
          }}
        >
          <h1 style={{flex:3, flexWrap: 'wrap'}} >Medical Representatives</h1>
          <Link to={'/app/Add_Medicalrep'}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<PersonAddIcon />}
            >
              Add Medical Rep
            </Button>
          </Link>

        </Box>
        <Box sx={{ mt: 3 }}
        >
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 1050 }}>
                <TextField
                  // fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search"
                  variant="outlined"
                  onChange={(e) => { setSearchTerm(e.target.value); }}
                  // alignItems="center"
                  className={classes.textfield}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <br />
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell align="center"><b>ID</b></TableCell>  
                {/* <TableCell align="center"><b>Photo</b></TableCell> */}
                <TableCell align="center"><b>Name</b></TableCell>
                <TableCell align="center"><b>Email</b></TableCell>
                <TableCell align="center"><b>Phone No</b></TableCell>
                <TableCell align="center"><b>Working Area</b></TableCell>
                <TableCell align="center"><b>Rating</b></TableCell>
                <TableCell align="center"><b>Salesmanager ID</b></TableCell>
                <TableCell colSpan={2} align="center"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {selectedRowIds.slice(0, limit).map((Row) => ( */}
                {selectedRowIds.slice(0, limit).filter(val => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                  }
                }).map((Row) => {
                  return (
                    <TableRow
                      hover
                      key={Row.rep_ID}
                    >
                    <TableCell align="center">{Row.rep_ID}</TableCell> 
                    {/* <TableCell align="center">{Row.display_photo}</TableCell> */}
                    <TableCell align="center">{Row.name}</TableCell>
                    <TableCell align="center">{Row.email}</TableCell>
                    <TableCell align="center">{Row.phone_no}</TableCell>
                    <TableCell align="center">{Row.area}</TableCell>
                    <TableCell align="center">{Row.rating}</TableCell>
                    <TableCell align="center">{Row.manager_ID}</TableCell>
                       <TableCell align="center">
                        <Link to={`/app/Edit_Medicalrep/${Row.rep_ID}`}  >
                          <Button
                            color="primary"
                            variant="contained"
                            startIcon={<EditIcon />}>
                            Edit
                          </Button>
                        </Link>
                        </TableCell>
                        <TableCell align="center">
                        <Button onClick={() => { deleteMedicalrep(Row.rep_ID) }} 
                          color="exit"
                          variant="contained"
                          className={classes.button}
                          startIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
                }
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={10}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleLimitChange}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
    </Container>
    </Box>
  </>
  ); 
};

export default MedicalRepList;