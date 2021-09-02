import jsPDF from "jspdf";
// import "jspdf-autotable";
import autoTable from 'jspdf-autotable'
// Date Fns is used to format the dates we receive
// from our API call
// import jsPDF from 'jspdf/dist/jspdf.node.debug'
// import { applyPlugin } from 'jspdf-autotable'
// applyPlugin(jsPDF)
import { format } from "date-fns";

const generatePDF = tasks => {
    // initialize jsPDF
    const doc = new jsPDF();
  
    // define the columns we want and their titles
    const tableColumn3 = ["Task ID", "Title", "Location", "Session", "Date", "Description", "Task Type", "Rep Note", "Manager ID", "Rep ID"] ;
    // define an empty array of rows
    const tableRows3 = [];
  
    // for each visit pass all its data into an array
    tasks.forEach(task => {
      const dt = new Date(task.date);
      const year = dt.getFullYear() + '/';
      const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
      const day = ('0' + dt.getDate()).slice(-2);
      const taskData = [
        task.task_id,
        task.title,
        task.location,
        task.session,
        year+month+day,
        task.description,
        task.type,
        task.rep_note,
        task.manager_ID,
        task.rep_ID
  
        // called date-fns to format the date on the visit
        // format(new Date(visit.date), "yyyy-MM-dd","")
      ];
      // push each visit's info into a row
      tableRows3.push(taskData);
    });
  
    // startY is basically margin-top
    doc.autoTable(tableColumn3, tableRows3, { startY: 20 });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // title and margin-top + margin-left
    doc.text("Annual Task Report", 14, 15);
    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
  };

export default generatePDF;