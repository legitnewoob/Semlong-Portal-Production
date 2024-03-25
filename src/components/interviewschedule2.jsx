import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from 'dayjs';

import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { db } from "../config/firebase-config";

export default function InterviewSchedule2() {
  const [rows, setRows] = useState([]);
  const [venueValues, setVenueValues] = useState([]);
  

  
  useEffect(() => {
    const getFormData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "user-data"));
        const formData = querySnapshot.docs.map((doc, index) => ({
            id: index + 1, // Incremental ID
            uid: doc.id, // Unique ID from Firestore document
            ...doc.data(), // Spread the rest of the document data
          }));
          setRows(formData);
          const initialVenueValues = formData.map((data) => data.interview_venue || "B101");
          setVenueValues(initialVenueValues);
      } catch (err) {
        console.error("Error finding data: ", err);
      }
    };

    getFormData();
  }, []);


  // console.log("rows :",  rows);

  const timeStringToDayjsObject = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    console.log([hours , minutes , seconds]);
    const currentDate = dayjs(); // Get current date
  
    currentDate.set({ hour: hours, minute: minutes, second: seconds });
    console.log("current_date :", currentDate);  
    return currentDate;
  };
  


const newDataArray = rows.map((data, index) => {

    const timeobj = dayjs(data.interview_time , "HH:mm:ss");
    // console.log("time_string" , timeString);
    // const dayjsObject = timeStringToDayjsObject(timeString);
    return {
        id: index + 1,
        uid: data.uid,
        roll_no: data.roll_no,
        name: data.name,
        category: data.category,
        date: data.interview_date,
        time: timeobj,
        venue: data.interview_venue,
    };
});

  console.log("newdata :" , newDataArray);

  const columns = [
    { field: "id", headerName: "Sr No.", width: 50 },
    { field: "roll_no", headerName: "Roll No", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "category", headerName: "Category", width: 180 },
    {
      field: "date",
      headerName: "Date",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ padding: "8px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date"
                value={dayjs(params.value)}
                onChange={(newValue) =>
                  handleDateChange(params.row.id - 1, newValue)
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      ),
    },
    {
      field: "time",
      headerName: "Time",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ padding: "8px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
            <TimePicker
              label="Time"
              value={dayjs(params.value)}
              onChange={(newValue) => handleTimeChange(params.row.id - 1, newValue)}
            />


            </DemoContainer>
          </LocalizationProvider>
        </Box>
      ),
    },
    
    {
      field: "venue",
      headerName: "Venue",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ padding: "8px" }}>
        <TextField
  label="Venue"
  value={venueValues[params.row.id - 1]}
  onChange={(e) => {
    try {
      // Assuming you want to handle the venue change here
      handleVenueChange(params.row.id - 1, e.target.value);
    } catch (error) {
      console.error("Error handling venue change:", error);
    }
  }}
/>

        </Box>
      ),
    },
  ];



  const handleDateChange = (index, newValue) => {
    const updatedRows = [...rows];
    
    console.log("new_value : " , newValue);
    
//     const year = firestoreDate.getFullYear();
//     const month = firestoreDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0-11)
//     const date = firestoreDate.getDate();
// Assuming newValue is a MUI date object

//     const dateString = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;


    updatedRows[index].interview_date = newValue.toLocaleTimeString();
    setRows(updatedRows);
  };

  const handleTimeChange = (index, newValue) => {
    if (newValue && newValue.$H !== undefined && newValue.$m !== undefined && newValue.$s !== undefined) {
      const { $H: hours, $m: minutes, $s: seconds } = newValue;
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      const updatedRows = [...rows];
      updatedRows[index].interview_time = timeString;
      setRows(updatedRows);
    } else {
      console.error("Invalid time value:", newValue);
    }
  };

  const handleVenueChange = (index, newValue) => {
    const updatedVenueValues  = [...venueValues]; // Create a copy of the venueValues array
    updatedVenueValues[index] = newValue; // Update the venue value in the venueValues array
    setVenueValues(updatedVenueValues); // Update the venueValues state with the modified array

    const updatedRows = [...rows];
    updatedRows[index].interview_venue = newValue;
    setRows(updatedRows);

    console.log("venue updated" , rows);
  };

  const handleSubmit = async () => {
    try {
      // Loop through each row and update the corresponding document in the user-data collection
      for (let i = 0; i < rows.length; i++) {
        const userDocRef = doc(db, "user-data", rows[i].uid);
        await updateDoc(userDocRef, {
          interview_date: rows[i].interview_date,
          interview_time: rows[i].interview_time,
          interview_venue: rows[i].venue,
        });
      }
      alert("Interview Details Updated");
      console.log("Data updated successfully.");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <Box>
      <Typography
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        variant="h3"
      >
        Schedule Interviews
      </Typography>

      <Box mt={2} sx={{ padding: "8px" }}>
        <Paper elevation={5} sx={{ height: "85%", padding: "1.5em" }}>
          <DataGrid
            rows={newDataArray}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            rowHeight={100}
          />
        </Paper>
      </Box>

      <Box mt={2} sx={{ padding: "8px" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
