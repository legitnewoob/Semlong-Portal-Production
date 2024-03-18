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
import { useState } from "react";

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
  const [dept, setDept] = useState("");
  const [division, setDivision] = useState("");

  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
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
    });
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
        <Divider>Personal Details</Divider>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              {/* <Grid item xs={12} md={6} mt={2}>
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
              </Grid> */}
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
      </Paper>
    </Box>
  );
}
