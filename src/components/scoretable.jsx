import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid  , GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Paper, Box } from '@mui/material';
import { auth, db } from '../config/firebase-config';
import { getDocs, getDoc, doc, collection, updateDoc } from 'firebase/firestore';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Co2Sharp } from '@mui/icons-material';
import {Switch} from '@mui/material';
import {CircularProgress} from '@mui/material';
const getAvgFromArray = (myArray) => {
    let sum = 0;
    myArray.forEach((element) => sum = sum + parseInt(element))
    return (sum * 1.0 / myArray.length)
}




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const questions = [
    "Weeks of internship done",
    "Online Courses Completed till Date",
    "Participation in co-curricular activity",
    "CGPI till VI Sem",
    "Industry Profile",
    "Nature of work",
    "Nature of Internship Offered",
    "Overall Impressions",
    "Department specific recommendation"
]

function CustomToolbar() {
  
    return (
      <GridToolbarContainer>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    );
  }

export default function ScoresTable() {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const [allEvals , setAllEvals] = useState([])
    const [totalEvals, setTotalEvals] = useState(0);
    // const [selectedKids, setSelectedKids] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [isLoading , setIsLoading] = useState(false);

    const [toHide , setToHide] = useState({});
    const [toShow , setToShow] = useState({});


    //field: {oneDoc.uid} Scores` ,
    useEffect(() => {
        let allScores = {};
        allEvals.forEach((e) => {
            console.log("Event data" , e);
            allScores[`${e.uid} Scores`] = false;
            
        })

        console.log(allScores);
        setToHide(allScores);



    }, [columns , allEvals])

    
    console.log(rows);
    // [
    //     2,
    //     1
    // ]


   

    // console.log("Selected-Kids" , selectedKids);
    // console.log(selectedKids);

    // console.log("rows" , rows);
    // console.log("columns" , columns);


    const [clickedScores, setClickedScores] = useState([])

    const [saareUser, setSaareUser] = useState([])
    const [saareScores, setSaareScores] = useState({})


    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const updateShortlistedStatus = async (uid, newValue) => {
        try {
            const userDocRef = doc(db, 'user-data', uid);
            await updateDoc(userDocRef, {
                shortlisted: newValue
            });
            console.log(`Shortlisted status updated for UID: ${uid}`);
        } catch (error) {
            console.error('Error updating shortlisted status:', error);
        }
    };

    const handleUpdateShortlisted = async () => {
        // Iterate through each row
        for (const row of rows) {
            // Extract UID and shortlisted status from the row
            const { uid, shortlisted } = row;
            // Update shortlisted status for the UID
            await updateShortlistedStatus(uid, shortlisted);
        }
        console.log('Shortlisted status updated for all rows');
        window.alert("Shortlisted Students are updated")
    };

    const handleSwitchToggle = (rowId, newValue) => {
        setRows(prevRows => {
            // Map over previous rows to update the row with the matching ID
            return prevRows.map(row => {
                if (row.id === rowId) {
                    // Return a new row object with updated 'shortlisted' value
                    return { ...row, shortlisted: newValue };
                }
                // For other rows, return them as is
                return row;
            });
        });
    };
    // const handleUpdate = async () => {
    //     try {
    //         // Extract UIDs from selectedKids
    //         const selectedUIDs = selectedKids.map(item => item.uid);

    //         // Update 'shortlisted' field to true for selected UIDs
    //         for (const uid of selectedUIDs) {
    //             const userDocRef = doc(db, 'user-data', uid);
    //             await updateDoc(userDocRef, {
    //                 shortlisted: true,

    //                 final_verdict : false
    //             });
    //             console.log(`Final verdict updated for UID: ${uid}`);
    //         }

    //         // Fetch all documents in user-data collection
    //         const querySnapshot = await getDocs(collection(db, 'user-data'));

    //         // Update 'shortlisted' field to false for documents not in selectedKids
    //         querySnapshot.forEach(docSnap => {
    //             const uid = docSnap.id;
    //             if (!selectedUIDs.includes(uid)) {
    //                 const userDocRef = doc(db, 'user-data', uid);
    //                 updateDoc(userDocRef, {
    //                     shortlisted: false,
    //                     final_verdict : false
    //                 });
    //                 console.log(`shortlisted field set to false for UID: ${uid}`);
    //             }
    //         });

    //         window.alert("All updates performed successfully");
    //     } catch (error) {
    //         console.error('Error updating final verdict:', error);
    //     }
    // };

    const handleIndividualScores = async (studentUid, EvalUid) => {
        // console.log(studentUid, EvalUid)
        handleClickOpen()

        const scoresDocRef = await getDocs(collection(db, "scores"));

        let scoresFromDb = {};

        scoresDocRef.forEach((doc) => {
            scoresFromDb[doc.id] = doc.data()
        });


        let studentScore = scoresFromDb[studentUid];
        let indArr = []
        if (!studentScore || !studentScore[EvalUid]) {
            questions.map(() => indArr.push(0))
        }
        else {

            let evalScores = studentScore[EvalUid];
            let onlyScores = [];
            evalScores.forEach((oneQuestionObj) => {
                Object.keys(oneQuestionObj).forEach(function (key) {
                    onlyScores.push(oneQuestionObj[key])
                })
            })
            questions.map((_, index) => indArr.push(onlyScores[index]))
        }
        setClickedScores(indArr)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const CustomCellRenderer2 = (params) => {
        return (
            <Typography variant="body1" component="div" fontWeight={"700"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }}>
                {params.value}
            </Typography>
        );
    };

    const populateTable = async () => {

        let ro = []
        let col =
            [
                { field: 'id', headerName: "Sr No.", width: 90 },
                {
                    field : 'roll_no',
                    headerName : 'Roll No.',
                    width : 250,
                    headerAlign : "center",
                    align : 'center',
                    valueGetter: (params) => {

                        // <Typography variant="body1" component="div" fontWeight={"700"} sx= {{display : "flex" , justifyContent : "center" , alignItems : "center" , margin : "auto"}}>
                        return params.row.roll_no;
                        // </Typography>
        
                    }
                },
                {
                    field: 'name',
                    headerName: 'Full Name',
                    width: 250,
                    headerAlign: "center",
                    renderCell: CustomCellRenderer2,
                },
               
            ];

        let meraArray = []

        const querySnapshot = await getDocs(collection(db, "user-data"));
        querySnapshot.forEach((doc) => {
            meraArray.push(doc.data())
        });

        // console.log("meramera", meraArray)
        setSaareUser(meraArray);

        const onlyStud = meraArray.filter((oneDoc) => oneDoc.user_type == 'Student')
        const onlyEvals = meraArray.filter((oneDoc) => oneDoc.user_type == 'Evaluator')

        setAllEvals(onlyEvals);
        setTotalEvals(onlyEvals.length);

        onlyStud.forEach((oneDoc) => {
            ro.push({
                id: ro.length + 1,
                name: oneDoc.name,
                uid: oneDoc.uid,
                shortlisted : oneDoc.shortlisted,
                roll_no : oneDoc.roll_no,
            })
        });

        // console.log(ro)

        setRows(ro)

        // console.log("rows", rows);
        // const scoresDocRef = doc(db, "scores", params.row.uid);
        const scoresDocRef = await getDocs(collection(db, "scores"));

        let scoresFromDb = {};

        scoresDocRef.forEach((doc) => {
            scoresFromDb[doc.id] = doc.data()
        });

        console.log(scoresFromDb);
        setSaareScores(scoresFromDb);

        const CustomCellRenderer = (params) => {

            // <Typography variant="body1" component="div" fontWeight={"700"} sx= {{display : "flex" , justifyContent : "center" , alignItems : "center" , margin : "auto"}}>
            teraRaj(params)
            {/* </Typography> */ }

        };



        const meraRaj = (params, oneDoc , avg = true) => {

            let studentScore = scoresFromDb[params.row.uid];

            if (!studentScore) return 0;


            const stuUid = oneDoc.uid;

            if (!studentScore[stuUid]) return 0;
            let evalScores = studentScore[stuUid];
            let onlyScores = [];
            if (!evalScores) return 0;
            evalScores.forEach((oneQuestionObj) => {
                Object.keys(oneQuestionObj).forEach(function (key) {
                    onlyScores.push(oneQuestionObj[key])
                })
            })
            // console.log(onlyScores);
            if(avg) return getAvgFromArray(onlyScores).toFixed(2);

            let finalStr = "[";
            

                    onlyScores.forEach((e) => {
                        finalStr += `${e} , `;
                    })

                    finalStr += "]";    

            return finalStr;
        }

     
        const teraRaj = (params) => {

            let studentScore = scoresFromDb[params.row.uid];
            if (!studentScore) {
                return 0;
            }
            else {

                let totalSum = 0;

                Object.keys(studentScore).forEach(function (key) {
                    const oneTeacherForStudent = studentScore[key];
                    // console.log(oneTeacherForStudent)
                    oneTeacherForStudent.forEach((oneQuestion) => {
                        Object.keys(oneQuestion).forEach(function (key) {
                            totalSum += oneQuestion[key];
                        })
                    })

                })
                const res = totalSum / (questions.length * onlyEvals.length);
                return res.toFixed(2);
            }

        }

        onlyEvals.forEach((oneDoc) => {
            col.push({
                field: oneDoc.uid,
                headerName: oneDoc.name,
                headerAlign: "center",
                align : "center",
                // disableExport: true,
                width: 250,

                valueGetter: (params) => (
                    // <Button
                    //     variant="contained"
                    //     onClick={() => handleIndividualScores(params.row.uid, oneDoc.uid)} // Add user ID as a query parameter
                    //     target="_blank"
                    //     sx={{ display: "flex", justifyContent: "center", alignItems: "center", minWidth: "8em", margin: "auto" }} // Center horizontally and vertically

                    // >
                        // <Typography variant='h6' fontWeight={'600'}>

                           meraRaj(params, oneDoc)
                            // </Typography>
                        // </Button>
                ),

            })

            col.push({
                field: `${oneDoc.uid} Scores` ,
                headerName: `${oneDoc.name}'s Score`,
                headerAlign: "center",
                align : 'center',
                width: "250",
                valueGetter: (params) => {

                    return meraRaj(params, oneDoc , false)
                    
            },

            })
        })

        col.push({
            field: 'totalScore',
            headerName: 'FINAL SCORE',
            width: 150,
            headerAlign: "center",
            align: 'center',
            valueGetter: (params) => {

                // <Typography variant="body1" component="div" fontWeight={"700"} sx= {{display : "flex" , justifyContent : "center" , alignItems : "center" , margin : "auto"}}>
                return teraRaj(params)
                // </Typography>

            }
        })

        col.push({
            field: 'shortlisted',
            headerName: 'Shortlisted',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Switch
                    checked={params.row.shortlisted}
                    onChange={(e) => handleSwitchToggle(params.row.id, e.target.checked)}
                />
            )
        })

        console.log(col);
        

        setColumns(col)
    }

    useEffect(() => {
        populateTable();

        setIsLoading(false);
    }, [])



    return (
        <Box>
            <Paper elevation={5} sx={{ height: "85%", padding: "1.5em" }}>
            
            {isLoading ? (
    <div style={{ textAlign: "center", margin: "2rem" }}>
            {/* You can customize the loading indicator here */}
            <CircularProgress />
            <Typography variant="h6">Loading user data...</Typography>
          </div>
  ):(
                <DataGrid
                    rows={rows}
                    columns={columns}
                    slots={{
                        toolbar : CustomToolbar,
                      }}

                    //   slotProps={{ toolbar: { csvOptions: { allColumns: true } } }}
                    slotProps={{ toolbar: { csvOptions: { allColumns: true } } }}
                    // slotProps={{
                    //     toolbar: {
                    //       csvOptions: {
                    //         fields: [
                    //           'id',
                    //           'roll_no',
                    //           'name',
                    //           'totalScores',
                    //           'shortlisted',
                    //           ...(allEvals ? allEvals.map((e) => `${e.uid} Scores`) : []), 
                    //         ],
                    //       },
                    //     },
                    //   }}
            //         slotProps={{ toolbar: { csvOptions: 
                      
            //             { fields: ['id', 'roll_no' , 'name' , 'totalScores', 'shortlisted' , 
                      
            //         ...allEvals.map((e) => {
            //             return `${e.uid} Scores`
            //         })


            //     ]
            //  } 

            // } }}

            // initialState={{
                // columns: {
                //     columnVisibilityModel : {
                //         // Hide columns status and traderName, the other columns will remain visible
                //         toShow,
                //         // toHide
                //         },
                // },
            //   }}

            // columnVisibilityModel={toHide}
            
                    disableRowSelectionOnClick
                />

  )}

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Modal title
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers >
                        {clickedScores.map((oneScore, index) =>
                            <Typography gutterBottom>
                                {`${index + 1}.  ${questions[index]} : ${oneScore}`}
                            </Typography>


                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Save changes
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </Paper>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    margin: 'auto', 
                }}
            >
                <Button
                    variant="contained"
                    sx= {{
                        mt: "3em",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "10rem",
                        height: "10vh",
                    }}

                    onClick={handleUpdateShortlisted}
                >
                    Update Status
                </Button>
            </Box>
        </Box>
    )
}
