import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {CircularProgress} from "@mui/material";
import { useState , useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth , db } from "../config/firebase-config";
import { setDoc , doc , getDoc} from "firebase/firestore";

const courseList = [
  "Data Analytics with Python - IITR",
  "GPU Architectures and Programming - IITKGP",
  "Compiler Design - IITKGP",
  "Deep Learning - IIT Ropar",
  "Deep Learning - IITKGP",
  "Introduction to Machine Learning - IITM",
  "Social Networks - IIT Ropar",
  "Reinforcement Learning - IITM",
  "Ethical Hacking - IITKGP",
  "Blockchain and its Applications - IITKGP",
  "Hardware Security - IITKGP",
];

const menuItems = courseList.map((course, index) => (
  <MenuItem key={index} value={course}>
    {course}
  </MenuItem>
));
export default function ChoiceForm() {

  const [userData , setUserData] = useState([]);
  const [loading , setLoading] = useState(true);
  const [dept, setDept] = useState("");
  const [division, setDivision] = useState("");


  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user) {
        const userDocRef = doc(db, "nptel-form-data", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if(userDocSnapshot.exists())
        {
          const formData = userDocSnapshot.data();
          setUserData(formData);

          setDept(formData?.dept || "");
          setDivision(formData?.division || "");
          setChoice1(formData?.choice1 || "");
          setChoice2(formData?.choice2 || "");
          
          
        }
        else{
          console.log("This guy is submitting form for first time.")
        }
      }

      setLoading(false);
      return () => unsubscribe();
    });
  }, []);


  const currentUserUid = auth?.currentUser?.uid;
  const handleChoice1 = (event) => {
    const newChoice = event.target.value;
    if (newChoice === choice2) {
      alert("Choice 1 & 2 need to be distinct");
    } else {
      setChoice1(newChoice);
    }
  };

  const handleChoice2 = (event) => {
    const newChoice = event.target.value;
    if (newChoice === choice1) {
      alert("Choice 1 & 2 need to be distinct");
    } else {
      setChoice2(newChoice);
    }
  };

  const handleDept = (event) => {
    setDept(event.target.value);
  };

  const handleDiv = (event) => {
    setDivision(event.target.value);
  };

  const handleSubmit = async (event, currentUserUid) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get("name"),
      roll_no: data.get("roll_no"),
      dept: dept,
      division: division,
      choice1: choice1,
      choice2: choice2,
      DE26: data.get("DE26"),
      OET26: data.get("OET26"),
      DE37: data.get("DE37"),
      DE47: data.get("DE47"),
      OET37: data.get("OET37"),
      uid: currentUserUid // Add UID of the current user
    };
  
    try {
      const docRef = await setDoc(doc(db, "nptel-form-data", currentUserUid), formData);
      console.log("Form data added successfully!");
      window.alert("Form Submitted Successfully");
    } catch (error) {
      console.error("Error adding form data: ", error);
    }
  };


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3">NPTEL Electives-Choice Form</Typography>

      <Paper
        elevation={9}
        sx={{
          height: "85%",
          padding: "1.5em",
          width: "100%",
          marginTop: "20px",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", margin: "2rem" }}>
            {/* You can customize the loading indicator here */}
            <CircularProgress />
            <Typography variant="h6">Loading user data...</Typography>
          </div>
        ) :
          (
            <>
        <Divider>Personal Details</Divider>

        <Box component="form" onSubmit={(event) => handleSubmit(event, currentUserUid)} noValidate sx={{ mt: 1 }}>
          <Box gutterbottom>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  defaultValue={userData?.name || ""}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="roll_no"
                  label="Roll Number"
                  name="roll_no"
                  autoComplete="roll_no"
                  autoFocus
                  defaultValue={userData?.roll_no || ""}
                />
              </Grid>
              <Grid item xs={12} md={3} mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="department">Dept.</InputLabel>
                  <Select
                    labelId="division"
                    id="division"
                    value={dept}
                    label="Division"
                    onChange={handleDept}
                  >
                    <MenuItem value={"Computer Engineering"}>
                      Computer Engineering
                    </MenuItem>
                    <MenuItem value={"Information Techonology"}>
                      Information Techonology
                    </MenuItem>
                    <MenuItem value={"Electronics and Telecommunications"}>
                      Electronics and Telecommunications
                    </MenuItem>
                    <MenuItem value={"Electronics"}>Electronics</MenuItem>
                    <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="department">Division</InputLabel>
                  <Select
                    labelId="dept"
                    id="dept"
                    value={division}
                    label="dept"
                    onChange={handleDiv}
                  >
                    <MenuItem value={"A"}>A</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"C"}>C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Divider style={{ marginTop: "20px" }}>Make Course Choice</Divider>

          <Box>
            <Grid container>
              <Grid item xs={12} md={6} mt={2} sx={{alignItems : 'center'}}>
                <FormControl fullWidth>
                  <InputLabel id="department">Choice</InputLabel>
                  <Select
                    labelId="dept"
                    id="dept"
                    value={choice1}
                    label="dept"
                    onChange={handleChoice1}
                  >
                    {menuItems}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="department">Choice 2</InputLabel>
                  <Select
                    labelId="choice2"
                    id="choice2"
                    value={choice2}
                    label="choice2"
                    onChange={handleChoice2}
                  >
                    {menuItems}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Divider style={{ marginTop: "20px" }}>
            Previous Electives Information
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="DE26"
                label="Departmental Elective -II taken in Semester VI
                "
                name="DE26"
                autoComplete="elective"
                autoFocus
                defaultValue={userData?.DE26 || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="OET26"
                label="Open Elective Technical- II (OET) taken in Semester VI
                "
                name="OET26"
                autoComplete="elective"
                autoFocus
                defaultValue={userData?.OET26 || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="DE37"
                label="Departmental Elective -III taken in Semester VII"
                name="DE37"
                autoComplete="DE37"
                autoFocus
                defaultValue={userData?.DE37 || ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="DE47"
                label="Departmental Elective -IV taken in Semester VII"
                name="DE47"
                autoComplete="DE47"
                autoFocus
                defaultValue={userData?.DE47 || ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="OET37"
                label="Open Elective Technical - III (OET) taken in Semester VII
                "
                name="OET37"
                autoComplete="OET37"
                autoFocus
                defaultValue={userData?.OET37 || ""}
              />
            </Grid>
          </Grid>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "140px", height: "50px" , fontSize : "25px" }}
              disabled={choice1 === choice2}
           
            >
              SUBMIT
            </Button>
            
          </Box>
        </Box>
        </>
          )}
      </Paper>
    </Box>
  );
}
