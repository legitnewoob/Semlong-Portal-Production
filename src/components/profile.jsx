import { Box, Paper, Typography } from "@mui/material";
import { auth } from "../config/firebase-config";

export default function Profile() {
  // Get the current user's display name
  const displayName = auth?.currentUser?.displayName;

  return (
    <Box>
      <Typography
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        variant="h4"
      >
        Profile Page
      </Typography>
      <Box mt={2}>
        <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', height: "85%", padding: "1.5em", alignItems: "center", justifyContent: "center" }}>
          {/* Greet the user with their display name */}
          <Typography variant="body1">Hello, {displayName}</Typography>
          <Typography variant="body1">This is your portal for Semlong Internship Application</Typography>
        </Paper>
      </Box>
    </Box>
  );
}
