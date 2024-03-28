import * as React from 'react';
import { Auth } from "firebase/auth"
import { auth } from "../config/firebase-config"
import { Paper } from "@mui/material"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Typewriter from "./typewriting/typewriter";
import { Typed } from "react-typed"; 
import { TypeAnimation } from 'react-type-animation';
// import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';
// import { signInWithGoogle } from './drawer';

// import { Auth } from 'firebase/auth';
// import {auth , googleProvider} from "../config/firebase-config";
// import Typography from '@mui/material/Typography';

console.log(auth?.currentUser?.displayName);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
export default function Introduction() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return(
        <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', height: "85%",mt : "3em" ,padding: "5.5em", alignItems: "center", justifyContent: "center" }}>
           <Box sx={{ mt: '-2.5em', width: '100%', maxWidth: '500px', marginBottom: '1em', display: 'flex', justifyContent: 'center' }}>
          <img draggable = "false" src = "https://www.somaiya.edu.in/assets/default_asset/img/somiaya-vidyavihar-logo.svg" alt="" style={{ width: "500px", marginBottom: "1em" }} />
      
          </Box>
        <Typography mt = "1.5rem" variant="h2" fontWeight={700} fontFamily={"Open Sans"} gutterBottom>
        Welcome here{' '}
        <TypeAnimation
        sequence={[
            // Same substring at the start will only be typed once, initially
            'Semester Long Internship Portal',
            1000,
            
        ]}
        speed={50}
        repeat={Infinity}
        />
        </Typography>

        <React.Fragment>
      <Button variant="contained"
          sx={{
            mt : "1.5rem",
            backgroundColor: "#ed1c24",
            width: "200px", // Adjust the width as needed
            height: "50px", // Adjust the height as needed
            '&:hover': {
                backgroundColor: "#b7202e", // Change to the desired color on hover
              },
          }}
      onClick={handleClickOpen}>
        <Typography fontSize={20} fontWeight={500}>
            Get Started
        </Typography>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Welcome {auth?.currentUser ? auth?.currentUser?.displayName : "User"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: "#ed1c24",
          }}
        >
          <CloseIcon sx={{ color: '#000000' }} />
        </IconButton>
        <DialogContent dividers>
      <Typography style={{ display: 'flex', justifyContent: 'center', fontWeight: 500, fontSize: '1.5rem' }} gutterBottom>
        Follow these instructions to get your application submitted:
      </Typography>
      <Typography variant="body1" fontWeight={600} gutterBottom>
        1. If you are not logged in , click on login button in top right corner.
      </Typography>
      <Typography variant="body1" fontWeight={600} gutterBottom>
        2. Click <Link href="./form">click here</Link> to fill application form.
      </Typography>
      <Typography variant="body1" mb={"1.4em"} fontWeight={600} gutterBottom>
        3. Click <Link href="./nptel">click here</Link> to fill nptel choice form.
        
      </Typography>
      <Typography variant="h6" fontWeight={600} textAlign="center" gutterBottom>
      Please fill all the forms carefully as you can only edit your form once after submission.
    </Typography>
      {/* Add more instructions as needed */}
    </DialogContent>
        <DialogActions>
          <Button style = {{
            backgroundColor : "#1B5477",
            color : "#ffff"
          }}autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
        {/* Greet the user with their display name */}
        {/* <Typography variant="body1">Hello, {displayName}</Typography> */}
        {/* <Typography variant="body1">This is your portal for Semlong Internship Application</Typography> */}
      </Paper>
    )
        }

