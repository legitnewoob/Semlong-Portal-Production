import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { auth , db } from '../config/firebase-config';
import { getDocs, getDoc, doc, collection} from 'firebase/firestore';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';

const getAvgFromArray = (myArray) => {
    let sum = 0;
    myArray.forEach((element) => sum = sum + parseInt(element))
    return (sum*1.0/myArray.length)
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

export default function() {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const [clickedScores, setClickedScores] = useState([4, 5, 2, 9])

    const [saareUser, setSaareUser] = useState([])
    const [saareScores, setSaareScores] = useState({})


    const [open, setOpen] = React.useState(false);

    const [totalEvals, setTotalEvals] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleIndividualScores = async (studentUid, EvalUid) => {
        console.log(studentUid, EvalUid)
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
            Object.keys(oneQuestionObj).forEach(function(key) {
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

    const populateTable = async () => {

        let ro = []
        let col = 
        [
            {field : 'id' , headerName : "Sr No." , width : "90"},
            {field: 'name', headerName: 'Full Name', width: 150}
        ];

        let meraArray = []
        
        const querySnapshot = await getDocs(collection(db, "user-data"));
        querySnapshot.forEach((doc) => {
            meraArray.push(doc.data())
        });

        console.log("meramera", meraArray)
        setSaareUser(meraArray);

        const onlyStud = meraArray.filter((oneDoc) => oneDoc.user_type=='Student')
        const onlyEvals = meraArray.filter((oneDoc) => oneDoc.user_type=='Evaluator')

        setTotalEvals(onlyEvals.length);

        onlyStud.forEach((oneDoc) => {
            ro.push({
                id : ro.length + 1 ,
                name : oneDoc.name,
                uid : oneDoc.uid,
            })
        });

        console.log(ro)

        setRows(ro)

        // const scoresDocRef = doc(db, "scores", params.row.uid);
        const scoresDocRef = await getDocs(collection(db, "scores"));

        let scoresFromDb = {};

        scoresDocRef.forEach((doc) => {
            scoresFromDb[doc.id] = doc.data()
        });

        console.log(scoresFromDb);
        setSaareScores(scoresFromDb);

        const meraRaj = (params, oneDoc) => {

                let studentScore = scoresFromDb[params.row.uid];

                if (!studentScore) return 0;
                
                const stuUid = oneDoc.uid;

                if (!studentScore[stuUid]) return 0;
                let evalScores = studentScore[stuUid];
                let onlyScores = [];
                if (!evalScores) return 0;
                evalScores.forEach((oneQuestionObj) => {
                    Object.keys(oneQuestionObj).forEach(function(key) {
                        onlyScores.push(oneQuestionObj[key])
                      })
                })
                return getAvgFromArray(onlyScores).toFixed(2);
            }
        
        const teraRaj = (params) => {

            let studentScore = scoresFromDb[params.row.uid];
            if (!studentScore) {
                return 0;
            }
            else {

            let totalSum = 0;

            Object.keys(studentScore).forEach(function(key) {
                const oneTeacherForStudent = studentScore[key];
                console.log(oneTeacherForStudent)
                oneTeacherForStudent.forEach((oneQuestion) => {
                    Object.keys(oneQuestion).forEach(function(key) {
                        totalSum += oneQuestion[key];
                        })
                })
                
                })
            const res = totalSum/(questions.length * onlyEvals.length);
            return res.toFixed(2);
            }

        }

        onlyEvals.forEach((oneDoc) => {
            col.push({
                field: oneDoc.uid,
                headerName: oneDoc.name,
                width : 250,
                
                renderCell: (params) => (
                    <Button
                      variant="contained"
                      onClick={() => handleIndividualScores(params.row.uid, oneDoc.uid)} // Add user ID as a query parameter
                      target="_blank"
                      sx={{ display: "flex", justifyContent: "center", alignItems: "center" , minWidth : "8em" , margin : "auto"}} // Center horizontally and vertically

                    >
                     <Typography variant='h6' fontWeight={'600'}> {
                        meraRaj(params, oneDoc)
                        }
                        </Typography>
                    </Button>
                  ),
            
            })
        })

        col.push({
            field: 'totalScore', 
            headerName: 'FINAL SCORE', 
            width: 150,
            valueGetter: (params) => {
                console.log(params);
                return teraRaj(params);
            }
        })

        setColumns(col)

    }

    useEffect(() => {
        populateTable();
    }, [])


    return (
        <Paper elevation={5} sx={{ height: "85%", padding: "1.5em" }}>
              <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
        
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
          {clickedScores.map((oneScore , index) => 
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
    )
}