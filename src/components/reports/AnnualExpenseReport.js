import React, { useEffect, useState } from "react";
import generatePDF from "src/pages/ExpenseReportGeneration";
import AnnualExpenseReportTable from "src/components/reports/AnnualExpenseReportTable";
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

const Expenses = () => { 
  
  const [expenses, setExpenses] = useState([]);
  

  useEffect(() => {
    try {    
      axios.get("http://localhost:3001/viewexpensesummary",{
      }).then((response)=>{
        setExpenses(response.data);
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
    <Box m={2} >
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
        <h3>Annual Expense Report</h3>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <Button
              variant="contained" 
              color="primary"
              onClick={() => generatePDF(expenses)}
              startIcon={<NoteAddIcon />}
            >
              Generate Report
            </Button>
          </Box>
        </div>
      </div>
      <Box mt={2}>
      <AnnualExpenseReportTable expenses={expenses} />
      </Box>      
      </Box>
      </Grid>

      
    </div>
  );
};

export default Expenses;