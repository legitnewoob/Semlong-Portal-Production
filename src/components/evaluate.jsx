import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {auth , googleProvider} from "../config/firebase-config";
import {db} from "../config/firebase-config"
import { getDocs , collection} from "firebase/firestore";
import { useState , useEffect } from "react";

console.log(auth?.currentUser?.uid);



const columns = [
  {
    field: "id",
    headerName: "Sr No.",
    width: 100,
    sortable: false,
    flex: 0.25,
  },
  {
    field: "roll_no",
    headerName: "Roll Number",
    width: 250,
    sortable: false,
    flex: 1,
  },
  {
    field: "name",
    headerName: "Student Name",
    width: 250,
    sortable: false,
    flex: 1,
  },

  {
    field: "email",
    headerName: "Email-ID",
    type: "email",
    width: 250,
    sortable: false,
    flex: 1,
  },
  {
    field: "department",
    headerName: "Department name",

    sortable: false,
    width: 250,
    flex: 1,
  },
  {
    field: "evaluate",
    headerName: "Evaluate",
    sortable: false,
    width: 250,
    flex: 1,
    renderCell: (params) => (
      <Button
        variant="contained"
        href={`/assessment/${params.row.uid}`} // Add user ID as a query parameter
        target="_blank"
      >
        Evaluate / Edit
      </Button>
    ),
    
    
  },
];

export default function Evaluate() {


  const [rowss , setRows] = useState([]);

  const allForms = collection(db , "form-data");
  
  useEffect(() => {
    const getFormData = async() => {
      try {
        const querySnapshot = await getDocs(allForms);
        const formData2 = querySnapshot.docs.map((doc) => doc.data());
        setRows(formData2);

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
// }, [rowss]);

const newDataArray = rowss.map((data, index) => ({
  uid : data.uid,
  id: index + 1,
  serial_no: index + 1,
  roll_no: data.roll_no,
  name: data.name,
  email: data.email, // Corrected property name
  department: data.dept, // Corrected property name
}));

console.log(newDataArray);


  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center !important",
          alignItems: "center !important",
          marginBottom: "15px",
        }}
      >
        <Typography variant="h4">Form assessment page</Typography>
      </Box>

      <Paper elevation={4} sx={{ height: "85vh", mt: "2" }}>
        <DataGrid
          rows={newDataArray} getRowId={(row) => row.id} 
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Paper>
   </Box>
  );
}
