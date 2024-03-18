import React, { useState , useEffect} from "react";
import dayjs from "dayjs";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import ExcelDownloadButton from "./downloadExcel";
import { CSVLink, CSVDownload } from "react-csv";
// import { useState , useEffect } from "react";
import {auth , googleProvider} from "../config/firebase-config";
import {db} from "../config/firebase-config"
import { getDocs , collection} from "firebase/firestore";


// const rows = [
//   {
//     id: 1,
//     category: "Category A",
//     roll_no: "12345",
//     name: "John Doe",
//     organization: "Org A",
//     date: "",
//     time: "",
//     venue: "Venue 1",
//   },
//   {
//     id: 2,
//     category: "Category B",
//     roll_no: "54321",
//     name: "Jane Smith",
//     organization: "Org B",
//     date: "",
//     time: "",
//     venue: "Venue 2",
//   },
//   {
//     id: 3,
//     category: "Category C",
//     roll_no: "98765",
//     name: "Alice Johnson",
//     organization: "Org C",
//     date: "",
//     time: "",
//     venue: "Venue 3",
//   },
//   {
//     id: 4,
//     category: "Category D",
//     roll_no: "24680",
//     name: "Bob Wilson",
//     organization: "Org D",
//     date: "",
//     time: "",
//     venue: "Venue 4",
//   },
//   {
//     id: 5,
//     category: "Category E",
//     roll_no: "13579",
//     name: "Eve Brown",
//     organization: "Org E",
//     date: "",
//     time: "",
//     venue: "Venue 5",
//   },
// ];



// const csvLink = {
//   filename: "schedule.csv",
//   headers: headers,
//   data: rows,
// };

export default function InterviewSchedule() {


  const [rows , setRows] = useState([
    {
      id: 1,
      category: "Category A",
      roll_no: "12345",
      name: "John Doe",
      organization: "Org A",
      date: "",
      time: "",
      venue: "Venue 1",
    },
    {
      id: 2,
      category: "Category B",
      roll_no: "54321",
      name: "Jane Smith",
      organization: "Org B",
      date: "",
      time: "",
      venue: "Venue 2",
    },
    {
      id: 3,
      category: "Category C",
      roll_no: "98765",
      name: "Alice Johnson",
      organization: "Org C",
      date: "",
      time: "",
      venue: "Venue 3",
    },
    {
      id: 4,
      category: "Category D",
      roll_no: "24680",
      name: "Bob Wilson",
      organization: "Org D",
      date: "",
      time: "",
      venue: "Venue 4",
    },
    {
      id: 5,
      category: "Category E",
      roll_no: "13579",
      name: "Eve Brown",
      organization: "Org E",
      date: "",
      time: "",
      venue: "Venue 5",
    },
  ]);



  const headers = [
    { label: "Sr No.", key: "id" },
    { label: "Category", key: "category" },
    { label: "Roll Number", key: "roll_no" },
    { label: "Student Name", key: "name" },
    { label: "Organization Name", key: "organization" },
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
    { label: "Venue", key: "venue" },
  ];

  const csvLink = {
    filename: "schedule.csv",
    headers: headers,
    data: rows,
  };

  const n = rows.length;
  const currentDate = new Date();

  const [venues , setVenues] = useState(new Array(n).fill(""));
  
  const handleVenueChange = (value, index) => {
    const newVenues = [...venues];
    newVenues[index] = value;
    setVenues(newVenues); 
  };
  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getUTCDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  let curr_Date = new Date();
  const [dateValues, setDateValues] = useState(
    new Array(n).fill(dayjs(formattedDate))
  );

  const [timeValues, setTimeValues] = useState(
    new Array(n).fill(dayjs(new Date()))
  );
  


  const handleDateChange = (index, newValue) => {
    console.log(newValue);
    console.log(dateValues[index]);
    dateValues[index] = newValue;
    
    console.log(dateValues);
  };

  const handleTimeChange = (index, newValue) => {
    console.log(timeValues);
    timeValues[index] = newValue;
    console.log(timeValues);
  };

  const handleSubmit = () => {
    const updatedRows = rows.map((row, index) => ({
      ...row,
      date: dateValues[index],
      time: timeValues[index],
      venue : venues[index],
    }));
    setRows(updatedRows);
    console.log(rows);
  };

  const [rowss , setRowss] = useState([]);

  const allForms = collection(db , "form-data");
  
  useEffect(() => {
    const getFormData = async() => {
      try {
        const querySnapshot = await getDocs(allForms);
        const formData2 = querySnapshot.docs.map((doc) => doc.data());
        setRowss(formData2);

        // console.log(rowss);
      }
      catch(err)
      {
        console.error(err);
      }
    };

    getFormData();
} , []);

// useEffect(() => {
//   console.log(rowss);
// }, [rows]);

const newDataArray = rowss.map((data, index) => ({
  id: index + 1,
  serial_no: index + 1,
  category : data.case_no,
  roll_no: data.roll_no,
  name: data.name,
  organization : data.organization,
  date : "",
  time : "",
  venue : ""
  
}));

console.log(newDataArray);
  return (
    <Box>
      <Typography
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        variant="h3"
      >
        Interview Scheduler
      </Typography>

      <Box mt={2}>
        <Paper elevation={5} sx={{ height: "85%", padding: "1.5em" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Organization Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Venue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newDataArray.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.roll_no}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.organization}</TableCell>
                    <TableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Controlled picker"
                          value={dateValues[index]}
                          onChange={(newValue) =>
                            handleDateChange(index, newValue)
                          }
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="Controlled picker"
                          value={timeValues[index]}
                          onChange={(newValue) =>
                            handleTimeChange(index, newValue)
                          }
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="venue"
                        label="Venue"
                        name="venue"
                        autoComplete="venue"
                        autoFocus
                        onChange={(event) => handleVenueChange(event.target.value, index)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            mt={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ marginRight: "5px" }}
            >
              Submit
            </Button>
            <Button>
              <CSVLink {...csvLink}>Export</CSVLink>
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
