import * as React from 'react';
import { useState, useEffect } from 'react';
import {Paper} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import { db } from '../config/firebase-config';
import { doc , updateDoc , getDocs , collection } from 'firebase/firestore';
export default function UserRoles() {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    
    const CustomCellRenderer2 = (params) => {
        return (
            <Typography variant="body1" component="div" fontWeight={"700"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }}>
                {params.value}
            </Typography>
        );
    };

    const updateUserData = async (uid, newUserType) => {
        try {
            const userDocRef = doc(db, 'user-data', uid);
            await updateDoc(userDocRef, {
                user_type: newUserType
            });
            console.log(`User type updated for UID: ${uid}`);
        } catch (error) {
            console.error('Error updating user type:', error);
        }
    };

    const handleSwitchToggle = (params, newValue) => {
        setRows(prevRows => {
            // Map over previous rows to update the row with the matching ID
            return prevRows.map(row => {
                if (row.id === params.row.id) {
                    // Determine the new user_type based on the value of newValue
                    const updatedUserType = newValue ? "Evaluator" : "Student";
                    // Update Firestore document with the new user_type
                    updateUserData(params.row.uid, updatedUserType);
                    // Return a new row object with updated 'shortlisted' and 'user_type' values
                    return { ...row, shortlisted: newValue, user_type: updatedUserType };
                }
                // For other rows, return them as is
                return row;
            });
        });
    };

  

    const populateTable = async () => {
        let ro = []
        let col = 
        [
            {field : 'id' , headerName : "Sr No." , width : 90},
            {
                field : 'name',
                headerName : 'Full Name',
                width : 400,
                headerAlign : "center",
                renderCell : CustomCellRenderer2
            },
            {
                field: 'email',
                headerName: 'Email ID',
                width: 400,
                headerAlign: "center",
                align : "center",
                valueGetter: (params) => params.row.email
            },
            {
                field : 'role',
                headerName : 'Evaluator',
                width : 400,
                headerAlign : "center",
                align : "center",
                renderCell: (params) => (
                    <Switch
                    checked={params.row.user_type === "Evaluator" ? true : false}
                    onChange={(e) => handleSwitchToggle(params, e.target.checked)}
                    />
                )
            }
        ]
        
        let meraArray = []

        const querySnapshot = await getDocs(collection(db, "user-data"));
        querySnapshot.forEach((doc) => {
            meraArray.push(doc.data())
        });

        meraArray.forEach((oneDoc) => {
            ro.push({
                id : ro.length + 1,
                name : oneDoc.name,
                uid: oneDoc.uid,
                user_type : oneDoc.user_type,
                email : oneDoc.email,
            })
        })

        setRows(ro);
        setColumns(col);
    }



    useEffect(() => {
        populateTable();
        // populateSelection();
    }, [])

    return (
        <Paper elevation={5} sx={{ height: "85%", padding: "1.5em" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    // initialState={{
                    //     pagination: {
                    //         paginationModel: {
                    //             pageSize: 5,
                    //         },
                    //     },
                    // }}
                    // pageSizeOptions={[5]}
                    // keepNonExistentRowsSelected
                    // checkboxSelection
                    // selectionModel={rowSelectionModel}
                    // onRowSelectionModelChange={(newRowSelectionModel , ids) => {
                    //     setRowSelectionModel(newRowSelectionModel.selectionModel);
                    //     // const selectedIDs = new Set(ids);
                    //     // const selectedRowData = rows.filter((row) =>
                    //     //     selectedIDs.has(row.id)
                    //     // );
                    //     // console.log(selectedRowData);

                    //     // setSelectedKids(selectedRowData);
                    // }}
                    disableRowSelectionOnClick
                />
                </Paper>
    )
}