import * as React from "react";
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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {auth , googleProvider} from "../config/firebase-config";
import {signInWithPopup  , signOut} from "firebase/auth";
import { Button } from "@mui/material";
import Introduction from "./introduction";
import Error404 from "./error";

import { useMediaQuery } from '@mui/material';



const listIcons = [
  <Person2Icon />,
  <InsertDriveFileIcon />,
  <ViewAgendaIcon />,
  <IndeterminateCheckBoxIcon />,
  <CalendarMonthIcon />,
  <AssessmentIcon />,
  <CheckIcon />,
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

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    console.log("click");
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
  }
};



export default function PersistentDrawerLeft() {

  const isMobile = useMediaQuery('(max-width: 960px)');
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  
  

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

  console.log(auth?.currentUser?.displayName);

  const [user, setUser] = useState(null);

  // Function to handle authentication state changes
  const handleAuthStateChanged = (user) => {
    setUser(user);
  };

  // console.log(user);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);


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
         

          <Typography 
  variant="h6" 
  noWrap 
  component="div" 
  sx={{
    fontSize: "110%",
    flex: 1, // Allow the Typography to grow and occupy all available space
    minWidth: 0, // Ensure the Typography can shrink if needed
    overflow: 'hidden', // Prevent text overflow
    textOverflow: 'ellipsis', // Show ellipsis (...) for overflow text
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
      backgroundColor: "#e4edec",
      color: "#000000",
      minWidth: "10%", // Set a minimum width for the button
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
          width: isMobile? '100%' : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile? '100%' : drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={isMobile? "temporary" : "persistent"}
        anchor={isMobile? "top" : "left"}
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Home",
            "Profile",
            "Form",
            "NPTEL",
            // "Status",
            "Interview",
            "Evaluate",
            // "Result",
          ].map((text, index) => (
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
        <Route path="/form" element={<Form />} />
        <Route path="/evaluate" element={<Evaluate />} />
        <Route path="/assessment" element={<Assessment />}>
          <Route path=":userId" element={<Assessment />} />
        </Route>
        <Route path="/nptel" element={<ChoiceForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/responseform" element={<ResponseForm />}>
          <Route path=":userId" element={<Assessment />} />
        </Route>
        <Route path="/interview" element={<InterviewSchedule />} />
        {/* Add a route for undefined paths */}
        <Route path="/*" element={<Error404/>} />
  </Routes>
      </Main>
    </Box>
  );
}