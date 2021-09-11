import React, { useEffect, useState } from "react";
import generatePDF from "src/pages/VisitReportGeneration";
import AnnualVisitReportTable from "src/components/reports/AnnualVisitReportTable";
import axios from "axios";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {
    Button,
    Card,
    CardContent,
    Grid,
    Box,
    Typography
  } from '@material-ui/core';

const Visits = () => { 
  
  const [visits, setVisits] = useState([]);
  

  useEffect(() => {
    try {    
      axios.get("http://localhost:3001/viewvisitsummary",{
      }).then((response)=>{
        setVisits(response.data);
          });
    } catch (e){
      console.log("error");
      console.log(e);
    }
  }, []);

// const reportVisits = visits.filter(visit => visit.date === "");
  
  return (
    <div>
    <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
>
    <Box mt={2} ml={2} mr={3}>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
        <Box ml={6} >
        <h3>Annual Visit Report</h3>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mr: 6
          }}>
            <Button
              variant="contained" 
              color="primary"
              onClick={() => generatePDF(visits)}
              startIcon={<NoteAddIcon />}
            >
              Generate Report
            </Button>
          </Box>
        </div>
      </div>
      <Box mt={2} ml={4} mr={3}>
      <AnnualVisitReportTable visits={visits} />
      </Box>      
      </Box>
      </Grid>

      
    </div>
  );
};

export default Visits;