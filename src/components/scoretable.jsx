import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { auth , db } from '../config/firebase-config';
import { getDocs, getDoc, doc, collection} from 'firebase/firestore';

const getAvgFromArray = (myArray) => {
    let sum = 0;
    myArray.forEach((element) => sum = sum + parseInt(element))
    return (sum*1.0/myArray.length)
}

export default function() {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

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

        const onlyStud = meraArray.filter((oneDoc) => oneDoc.user_type=='Student')
        const onlyEvals = meraArray.filter((oneDoc) => oneDoc.user_type=='Evaluator')

        onlyStud.forEach((oneDoc) => {
            ro.push({
                id : ro.length + 1 ,
                name : oneDoc.name,
                uid : oneDoc.uid
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

        const meraRaj = (params, oneDoc) => {
            console.log(params.row.uid, oneDoc.uid)

                let studentScore = scoresFromDb[params.row.uid];

                if (!studentScore) return 0;
                
                const stuUid = oneDoc.uid;
                console.log(studentScore[stuUid])

                if (!studentScore[stuUid]) return 0;
                let evalScores = studentScore[stuUid];
                let onlyScores = [];
                if (!evalScores) return 0;
                evalScores.forEach((oneQuestionObj) => {
                    Object.keys(oneQuestionObj).forEach(function(key) {
                        onlyScores.push(oneQuestionObj[key])
                        console.log(oneQuestionObj[key])
                      })
                })
                return getAvgFromArray(onlyScores).toFixed(2);
            }

        onlyEvals.forEach((oneDoc) => {
            col.push({
                field: oneDoc.uid,
                headerName: oneDoc.name,
                valueGetter: (params) => {
                    const val = meraRaj(params, oneDoc);
                    console.log(val);
                    return val;
                }
            })
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
        disableRowSelectionOnClick
      />
           
            </Paper>
    )
}