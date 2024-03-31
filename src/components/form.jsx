import React, { useState, useEffect , useRef} from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/material/styles';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { auth, googleProvider } from "../config/firebase-config";
import { db } from "../config/firebase-config"
import { getDoc, getDocs, collection, addDoc, setDoc } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import { increment } from "firebase/firestore";


console.log(auth?.currentUser?.uid);


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function Form() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  const [offer, setOffer] = useState("");
  const [read, setRead] = useState('no');
  const [dept , setDept] = useState("");
  const [caseno, setCaseNo] = useState('');
  const [fulltime, setFullTime] = useState('');

  let department_name = userData?.dept;
  console.log(department_name);


  const userDataRef = useRef(null); // Ref to store userData


 // State for loading in



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user) {
        const userDocRef = doc(db, "form-data", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if(userDocSnapshot.exists())
        {
          const formData = userDocSnapshot.data();
          setUserData(formData);

          setDept(formData?.dept || ""); // Set dept with default if empty
          setCaseNo(formData?.case_no || "");
          setRead(formData?.read_policy || "no");
          setOffer(formData?.offer || "");
          setFullTime(formData?.full_time || "");
          
        }
        else{
          console.log("This guy is submitting form for first time.")
        }
      }

      // Clean up the observer when the component unmounts
      setIsLoading(false);

      return () => unsubscribe();
    });
  }, []);

  const defaultUserName = userDataRef.current ? userDataRef.current.name : "";



  const handleChange = (event) => {
    setDept(event.target.value);
  };

  const handleCase = (event) => {
    setCaseNo(event.target.value);
  };

  const handleRead = (event) => {
    setRead(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = ['name', 'roll_no', 'email', 'phone_no', 'organization', 'details_organization', 'company', 'stipend', 'drivelink'];
    const emptyFields = requiredFields.filter(field => !event.target[field].value.trim());

    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }
    // Check if the user is logged in
    if (!auth.currentUser) {
      alert("You are not logged in");
      return;
    }

    // Extract form data
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get("name"),
      roll_no: data.get("roll_no"),
      dept: dept,
      email: data.get("email"),
      phone_no: data.get("phone_no"),
      case_no: caseno,
      read_policy: read,
      organization: data.get("organization"),
      details_organization: data.get("details_organization"),
      offer: offer,
      full_time: fulltime,
      company_name: data.get("company"),
      stipend: data.get("stipend"),
      drive_link: data.get("drivelink"),
      uid: auth.currentUser.uid, // Add UID here
    };

    console.log(formData);

    try {
      // Add the document to the collection
      const customId = auth?.currentUser?.uid;
      const docRef = await setDoc(doc(db, "form-data", customId), formData); // Use setDoc instead of addDoc

      // console.log("Document written with ID: ", docRef.id);
      const userDocRef = doc(db, "user-data", formData.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      // Step 3: Check if the user document exists
      if (userDocSnapshot.exists()) {
        // Step 4: Update the document in the 'user-data' collection
        await updateDoc(userDocRef, {
          dept: formData.dept,
          email: formData.email,
          final_verdict: false,
          form_submitted: increment(1),
          interview_details: null,
          interview_venue: null,
          name: formData.name,
          nptel_form_submitted: 0,
          phone_no: formData.phone_no || null,
          roll_no: formData.roll_no || null,
          semlong_approved: false,
          user_type: "Student",
          category: caseno,
        });
      }
      window.alert("Form Submitted Successfully");

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };


  const openNewPage = () => {
    window.open("https://mag.wcoomd.org/uploads/2018/05/blank.pdf", "_blank"); // Opens the link in a new tab or window
  };

  const handleOffer = (event) => {
    setOffer(event.target.value);
  };

  const handleFullTime = (event) => {
    setFullTime(event.target.value);
  };

  const handleDisable = () => {
    return read === "yes" ? false : true;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "10vh",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginInlineStart: "25px", fontWeight: "600" }}>
        Application Form
      </Typography>
      <Box sx={{ width: "95%" }}>
        <Paper
          elevation={6}
          sx={{ height: "85%", width: "100%", padding: "2rem" }}
          // variant="outlined"
        >
          {isLoading ? (
          <div style={{ textAlign: "center", margin: "2rem" }}>
            {/* You can customize the loading indicator here */}
            <CircularProgress />
            <Typography variant="h6">Loading user data...</Typography>
          </div>
        ) :
          ( <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Divider>Personal Details</Divider>
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={12} md={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  defaultValue={userData ? userData.name : ""} 
                  
                  
                />
                
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="roll_no"
                  label="Roll Number"
                  name="roll_no"
                  autoComplete="roll_no"
                  autoFocus
                  defaultValue={userData ? userData.roll_no : ""} 
                />
              </Grid>
              <Grid item xs={12} md={4} mt={1}>
              {isLoading ? (
  <Typography variant="h6" component="p">
    Loading user data...
  </Typography>
) : (
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>Department</InputLabel>
                <Select
                  labelId="demo-simple-select-label" // Match the id with InputLabel
                  id="Department"
                  value={dept}
                  label="Department" // This prop is not needed for custom labels
                  onChange={handleChange}
                  defaultValue={userData?.dept}
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
)}
              </Grid>
              <Grid item xs={12} md={4} mt={1}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  defaultValue={userData ? userData.email : ""} 
                />
              </Grid>
              <Grid item xs={12} md={4} mt={1}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone_no"
                  label="Phone Number"
                  name="phone_no"
                  autoComplete="Phone Number"
                  autoFocus
                  defaultValue={userData ? userData.phone_no : ""} 
                />
              </Grid>
              <Grid item xs={12} md={4} mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="department" required>Case</InputLabel>
                  <Select
                    labelId="department"
                    id="case"
                    value={caseno}
                    label="Case"
                    onChange={handleCase}
                    onClick={(e) => console.log(e.target.value)}
                  >

                    <MenuItem value={"Through College"}>
                      Case 1 : Through College
                    </MenuItem>
                    <MenuItem value={"Through Self"}>
                      Case 2 : Through Self
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider variant="middle" sx={{ marginTop: "1.5rem" }}>
              Policy Document
            </Divider>

            <Grid
              container
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
              mt={2}
            >
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h6"
                  component={"h6"}
                  align="center"
                  fontWeight={500}
                >
                  Have you read the policy document?
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={read}
                    onChange={handleRead}
                    padding={10}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                      sx={{ marginRight: "120px" }}
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <Typography
                  variant="h6"
                  component={"p"}
                  paddingRight={"25px"}
                  fontWeight={300}
                  color={"black"}
                >
                  Read the policy document!
                </Typography>
                <Button variant="outlined" onClick={openNewPage}>
                  {" "}
                  Policy Document
                </Button>
              </Grid>
            </Grid>
            <Divider variant="middle" sx={{ marginTop: "1.5rem" }}>
              Organization Details
            </Divider>
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
              mt={2}
            >
              <Grid item xs={12} md={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="organization"
                  label="Name of offering organization"
                  name="organization"
                  autoComplete="organization"
                  autoFocus
                  defaultValue={userData?.organization}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="details_organization"
                  label="Details of offering organization"
                  name="details_organization"
                  autoComplete="details_organization"
                  autoFocus
                  defaultValue={userData?.details_organization}
                />
              </Grid>
              <Grid item xs={12} md={4} mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="department" required>Offer Received</InputLabel>
                  <Select
                    labelId="offer_received"
                    id="offer_received"
                    value={offer}
                    label="offer_received"
                    onChange={handleOffer}
                  >
                    <MenuItem value={"yes"}>Yes</MenuItem>
                    <MenuItem value={"no"}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider variant="middle" sx={{ marginTop: "1.5rem" }}>
              Internship Details
            </Divider>

            <Grid
              container
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
              mt={2}
            >
              <Grid item xs={12} md={4} mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="department" required>Full time received</InputLabel>
                  <Select
                    labelId="fulltime"
                    id="fulltime"
                    value={fulltime}
                    label="offer_received"
                    onChange={handleFullTime}
                  >
                    <MenuItem value={"yes"}>Yes</MenuItem>
                    <MenuItem value={"no"}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4} mt={1}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="company"
                  label="Name of company"
                  name="company"
                  autoComplete="company"
                  autoFocus
                  defaultValue={userData?.company_name}
                />
              </Grid>

              <Grid item xs={12} md={4} mt={1}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="stipend"
                  label="Stipend in ₹"
                  name="stipend"
                  autoComplete="stipend"
                  autoFocus
                  defaultValue={userData?.stipend}
                />
              </Grid>
            </Grid>

            <Divider variant="middle" sx={{ marginTop: "1.5rem" }}>
              Attach Files
            </Divider>

            <Grid
              container
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
              mt={2}
            >
              <Grid item xs={12} md={6} mt={1}>
                <Typography variant="h6">
                  Make a Google Drive folder with following folders and
                  respective files
                </Typography>
                <List
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ListItem sx={{ alignSelf: "center" }} disablePadding>
                    <ListItemText primary="1. Application Form" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="2. CV" />
                  </ListItem>{" "}
                  <ListItem disablePadding>
                    <ListItemText primary="3. Marksheets (Sem I to VI)" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="4. Internship Offer Letter" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="5. Internship Certificate" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="6. Co-Curricular Activities" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="7. Online Courses" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="drivelink"
                  label="Google Drive Link"
                  name="drivelink"
                  autoComplete="drivelink"
                  autoFocus
                  defaultValue={userData?.drive_link}
                />
              </Grid>

              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    // sx = {{backgroundColor : "#ed1c24"}}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      fontSize: "1.5rem",
                      borderRadius: "30px",
                      width: "25vh",
                      backgroundColor: "#ed1c24",
                      "&:hover": {
                        backgroundColor: "#b7202e", // Same color on hover
                      },
                    }}
                    onClick={() => {
                      window.alert("Please Wait...");
                    }}
                    disabled={handleDisable()}
                  >
                    SUBMIT
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
  )}
        </Paper>
      </Box>
    </div>
  );
}
