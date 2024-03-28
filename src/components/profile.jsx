import * as React from "react";
import { useState , useEffect } from "react";
import { Box, Paper, Typography , Grid , TextField} from "@mui/material";
import { auth  , db} from "../config/firebase-config";
import {doc , getDoc} from "firebase/firestore";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



console.log(auth?.currentUser?.photoUrl);
export default function Profile() {
  //Catch the user-data for the current uid 
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      // Check if user data already exists in the collection
      if (currentUser) { // Ensure currentUser is not null or undefined
        const userDocRef = doc(db, 'user-data', currentUser.uid);
        try {
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserData(userData); // Set the user data state
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);


  // Get the current user's display name
  const displayName = auth?.currentUser?.displayName;

  console.log(userData);

  return (
    <Box>
  <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: "85%", padding: "3.5em", alignItems: "center", justifyContent: "center" , mt : "3rem" }}>
  <Typography variant="h4" sx={{mt : "-1.5rem", fontWeight: "bold", mb: "0.1rem" }}>User Details</Typography>
    
  <Grid container spacing={2}>
    <Grid item xs={12} md={2} sx={{  width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={2} sx={{border: '1px solid black', borderRadius: '8px', padding: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'row' , maxWidth: '15rem', maxHeight: '15em', margin : "2em" , marginBottom : "3em" }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar
            alt="Profile Picture"
            src={auth?.currentUser?.photoURL}
            sx={{ width: 128, height: 128, mb: '1rem' , mr : "1em"}}
          />
          {/* <Typography variant="body1" align="center" sx = {{mr : "1em"}}>User Info</Typography> */}
        </Grid>
        <Grid item xs={12} sx={{  padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {auth?.currentUser?.displayName}
        </Grid>
      </Grid>
        </Grid>
        <Grid item xs={12} md={10} sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
  {/* Hello 2 */}
  <Grid container spacing={2} sx={{ display: "flex", justifyContent: "space-around", padding: '1rem', gap: '1rem' }}>
  {/* First Row */}
  <Grid item xs={12} sm={12} sx={{ border: '1px solid black', borderRadius: '8px', padding: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
    <Grid item xs={12} sm={4} sx={{ flex: 1 }}>
      <Typography variant="h7" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Name:</Typography>
      <Typography variant="body1" style={{ fontWeight: '900' }}>{userData?.name}</Typography>
    </Grid>
    <Grid item xs={12} sm={4} sx={{ flex: 1 }}>
      <Typography variant="h7" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Roll Number:</Typography>
      <Typography variant="body1" style={{ fontWeight: '900' }}>{userData?.roll_no}</Typography>
    </Grid>
    <Grid item xs={12} sm={4} sx={{ flex: 1 }}>
      <Typography variant="h7" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Department:</Typography>
      <Typography variant="body1" style={{ fontWeight: '900' }}>{userData?.dept}</Typography>
    </Grid>
  </Grid>
  {/* Second Row */}
  <Grid item xs={12} sm={12} container justifyContent="center" alignItems="center" sx={{ border: '1px solid black', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
  {/* Email */}
  <Grid item xs={12} sm={6}>
    <Typography variant="h7" style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Email:</Typography>
    <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{userData?.email}</Typography>
  </Grid>
  {/* Phone Number */}
  <Grid item xs={12} sm={6}>
    <Typography variant="h7" style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Phone Number:</Typography>
    <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{userData?.phone_no}</Typography>
  </Grid>
</Grid>


</Grid>





</Grid>
        <Grid item xs={12} md={4} sx={{ border: '1px solid black' }}>
          Form Status : Submitted
        </Grid>
        <Grid item xs={12} md={4} sx={{ border: '1px solid black' }}>
          Interview Status : {userData?.interview_date} , {userData?.interview_time} , {userData?.interview_venue}
        </Grid>
        <Grid item xs={12} md={4} sx={{ border: '1px solid black' }}>
          {/* Shortlisted : {userData?.shortlisted ? "True" : "False"} */}
        </Grid>
      </Grid>
        </Paper>
      </Box>

  );
}
