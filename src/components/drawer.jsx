import * as React from "react";
import { isMobile } from 'react-device-detect';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useEffect, useState } from 'react';
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckIcon from "@mui/icons-material/Check";
import Person2Icon from "@mui/icons-material/Person2";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Form from "./form";
import Evaluate from "./evaluate";
import Assessment from "./assessment";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import ChoiceForm from "./nptelchoiceform";
import Profile from "./profile";
import ResponseForm from "./responseform";
import InterviewSchedule from "./interviewschedule";
import InterviewSchedule2 from "./interviewschedule2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Auth } from "firebase/auth";
import {auth , googleProvider} from "../config/firebase-config";
import {signInWithPopup  , signOut} from "firebase/auth";
import { Button } from "@mui/material";
import Introduction from "./introduction";
import Error404 from "./error";
import TextField from "@mui/material";
import Dialog from "@mui/material";
import { Navigate } from 'react-router-dom';
import IsAuthenticated from '../context/isAuth';
import Protected from "../context/protect_me";
import { onAuthStateChanged } from "firebase/auth";
import KeepKids from "../context/keep_kids"
// import { useAuthState } from 'react-firebase-hooks/auth';

import { useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {db} from "../config/firebase-config"
// import { signInWithPopup, auth } from 'firebase/auth';
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'; 
// import IsAuthenticated from "../context/isAuth";
import { useNavigate } from "react-router-dom";

// console.log(useAuthState(auth));

console.log("Mobile" , isMobile);
const listIcons = [
  <HomeIcon sx={{color: '#153857'}}/>,
  <Person2Icon sx={{color: '#153857'}}/>,
  <ViewAgendaIcon sx={{color: '#153857'}}/>,
  <IndeterminateCheckBoxIcon sx={{color: '#153857'}}/>,
  <CalendarMonthIcon sx={{color: '#153857'}}/>,
  <AssessmentIcon sx={{color: '#153857'}}/>,
  <CheckIcon sx={{color: '#153857'}}/>,
];
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));







export default function PersistentDrawerLeft() {

  // console.log(auth?.currentUser?.photoURL); 

  const [userData2, setUserData2] = useState(null);


  // const userData = collection(db , "user-data");

  const isMobilee = useMediaQuery('(max-width: 960px)');
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const currentUser = auth.currentUser;
  
      // Check if user data already exists in the collection
      if (currentUser) { // Ensure currentUser is not null or undefined
        const userDocRef = doc(db, 'user-data', currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
  
        // If user data doesn't exist, add it to the collection
        if (!userDocSnapshot.exists()) {
  
  
          // Define the user data
          const userData = {
  
            // User General Data
            uid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            roll_no: null,
            dept: null,
            phone_no : null,
            user_type : "Student",
  
            // User Application Data
            form_submitted: 0,
            nptel_form_submitted: 0,
            interview_time : null,
            interview_date : null, 
            interview_venue: "",
            semlong_approved: false,
            shortlisted : false,
            final_verdict : false,
            category : null,
            
            // meta-data
  
            photoURL : auth?.currentUser?.photoURL,
  
          };
  
          // Add user data to the collection
          setUserData2(userData);
          await setDoc(userDocRef, userData);
        }
       
      }
    console.log("User signed in successfully.");
  
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };
// To make profile section accessible only if you are logged in
// const ProfileRoute = () => {

//   if (!IsAuthenticated()) {
//     // If the user is not authenticated, show an alert and navigate to login page
//     alert("Please log in to access the profile.");
//     // return <Navigate to="/" replace />;
//   }

//   // If the user is authenticated, render the profile component
//   return <Profile />;
// };
  
  

  const logout = async () => {
    try {
      await signOut(auth);

   
      setTimeout(() => {
        alert("You have logged out.");
        window.location.reload();
      }, 100); // Adjust the delay time as needed
    } catch (err) {
      console.error(err);
    }
  };

  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser) {
  //       try {
  //         const userDocRef = doc(db, 'user-data', currentUser.uid);
  //         const userDocSnapshot = await getDoc(userDocRef);

  //         if (userDocSnapshot.exists()) {
  //           setUser(userDocSnapshot.data());
  //           console.log("USER DATA:" , user);
  //         } else {
  //           // Handle the case when user data doesn't exist
  //           console.log("User data doesn't exist in the collection.");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error.message);
  //       }
  //     } else {
  //       setUser(null); // Reset user state if currentUser is null (user is not logged in)
  //     }
  //   });

  //   return () => unsubscribe(); // Unsubscribe from the auth state listener when component unmounts
  // }, []);

  console.log(user);

  // Function to handle authentication state changes
  const handleAuthStateChanged = (user) => {
    setUser(user);
  };

  // console.log(user);
  useEffect(() => {

  // console.log(user);
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);
    

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    // Perform the authentication check here
    // Once authentication status is determined, update the state
    // For example, using Firebase Authentication
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth Check");
      console.log("user" , user);
      if(user) 
      {
         setIsLoggedIn(true);
         setIsLoading(false);
         setUserData2(user);

         const userDocRef = doc(db, "user-data", user?.uid);
         const userDocSnapshot = await getDoc(userDocRef);

         if(userDocSnapshot.exists())
         {
           const datahere = userDocSnapshot.data();
           console.log("datahere" , datahere);
           setUserData2(datahere);

           if(datahere.user_type == "Evaluator")
           {
            setList([
              "Home",
              "Profile",
              "Form",
              "NPTEL",
              "Evaluate",
              "Interview",
            ])
           }
           
         }

         

         console.log("else wala" , userDocSnapshot);
      }
      // setIsLoggedIn(!!user); // Update isLoggedIn based on user existence
      // Set isLoading to false once authentication check is complete
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);


    const [list , setList] = useState([
      "Home",
      "Profile",
      "Form",
      "NPTEL",
    ]);
  return (
    <Box marginLeft={'16.4rem'}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex" , alignItems : "center" , justifyContent : "space-between", backgroundColor : '#b7202e'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          {/* <img src="" alt="Logo" style={{ width: '40px' }} /> */}
          <div style={{ backgroundColor: 'white', margin: '5px', padding: "5px", borderRadius: '100%', display: 'inline-block', width: '4em', height: '4em' }}>
  <img src="https://president.somaiya.edu.in/assets/oop/img/Homepage/Somaiya-logo-01.svg"  alt=""/>
</div>
          <Typography 
  variant="h6" 
  noWrap 
  component="div" 
  sx={{
    fontSize: "110%",
    flex: 1, // Allow the Typography to grow and occupy all available space
    minWidth: 0, // Ensure the Typography can shrink if needed
    textAlign : 'center',
    overflow: 'hidden', // Prevent text overflow
    textOverflow: 'ellipsis', // Show ellipsis (...) for overflow text
    marginLeft : "6rem",
    alignItems : 'center',
    fontSize : "2rem",
    fontFamily : "Open Sans"
  }}
>
 
  Semester Long Internship
</Typography>
          {/* <Button 
    onClick={signInWithGoogle}
    style={{
        backgroundColor: "#e4edec",
        color : "#000000",
        // padding: "18px 36px",
        // fontSize: "18px"
        marginLeft : "70em"
    }}
    variant="contained"
>

</Button> */}

<Button
    onClick={user ? logout : signInWithGoogle}
    style={{
      backgroundColor: "white",
      // color: "",
      minWidth: "10%", // Set a minimum width for the button
      color : "black",
      ...(user ? { width: "auto" } : { width: "fit-content" }), // Conditionally set width based on user login status
    }}
    variant="contained"
  >
      {user ? `Logout (${user?.displayName})` : "Login"}
    </Button>

        </Toolbar>

       
      </AppBar>

      <Drawer
        sx={{
          width: isMobilee? '100%' : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobilee? '100%' : drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={isMobilee? "temporary" : "persistent"}
        anchor={isMobilee? "top" : "left"}
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
      >
        <DrawerHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}> {/* Apply margin-right to a wrapping div */}
        <div style={{ marginRight: auth.currentUser ? '3rem' : '6rem' }}> {/* Apply margin-right to a wrapping div */}
          <Typography sx={{ color: "black", display: 'flex', justifyContent: "left" , fontWeight : "500"}}>
            Hello, {auth.currentUser ? auth.currentUser.displayName : 'User'}
          </Typography>
        </div>
        </div>
               

          <IconButton onClick={handleDrawerClose}>
           
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>

         
        </DrawerHeader>
        <Divider/>
        <List>
          {list.map((text, index) => (
            <ListItem
            key={text}
            component="a"
            disablePadding
            href={text === "Home" ? "/" : "/" + text.toLowerCase()}
            sx={{ color: "black" }}
          >
              <ListItemButton>
                <ListItemIcon>{listIcons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      <Main open={open}>
        <DrawerHeader />
        <Routes>
        <Route path="/" element={<Introduction/>} />
        <Route path="/form" element={
        <Protected isLoggedIn={isLoggedIn} isLoading={isLoading}>
        <Form/>
        </Protected>} />
        <Route path="/evaluate" element={ 
           <KeepKids isLoggedIn={isLoggedIn} isLoading={isLoading} userData={userData2}>
     
                  <Evaluate/>
             </KeepKids>} />
        <Route path="/assessment" element={<Assessment />}>
          <Route path=":userId" element={<Assessment />} />
        </Route>
        <Route path="/nptel" element={<Protected isLoggedIn={isLoggedIn} isLoading={isLoading}>
          <ChoiceForm/>
          </Protected>} />
        <Route path='/profile'
         element={
          <Protected isLoggedIn={isLoggedIn} isLoading={isLoading}>
          <Profile/>
          </Protected>
         }
       />
        <Route path="/responseform" element={<ResponseForm />}>
          <Route path=":userId" element={<Assessment />} />
        </Route>
       
      <Route
  path="/interview"
  element={
    <KeepKids isLoggedIn={isLoggedIn} isLoading={isLoading} userData={userData2}>
     
      <InterviewSchedule/>
      </KeepKids>

  }
/>  

          
     
        <Route path="/*" 
        element={<Error404/>} 
        />
  </Routes>
      </Main>
    </Box>
  );
}
