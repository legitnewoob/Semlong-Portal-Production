import React, { useState } from "react";
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
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const details = {
  name: "Raj Agrawal",
  roll_no: "16010121003",
  dept: "Computer Engineering",
  email: "rajmineshagrawal@gmail.com",
  phone_no: "+917726877146",
  case_no: "Through_College",
  read_policy: "yes",
  organization: "Google",
  details_organzation: "SDE Intern",
  offer: "yes",
  full_time: "yes",
  company_name: "Google",
  stipend: "2,00,000",
  drive_link: "totallylegitlink.com",
};
export default function ResponseForm() {
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
      <Typography variant="h4" gutterBottom sx={{ marginInlineStart: "25px" }}>
        Semlong Internship Application Form
      </Typography>
      <Box sx={{ width: "95%" }}>
        <Paper
          elevation={6}
          sx={{ height: "85%", width: "100%", padding: "2rem" }}
          variant="outlined"
        >
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Divider>Personal Details</Divider>
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={12} md={4}>
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Full Name :{" "}
                  </Typography>
                  {details.name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Roll Number :{" "}
                  </Typography>
                  {details.roll_no}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} mt={1}>
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Department :{" "}
                  </Typography>
                  {details.dept}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} mt={1}>
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Email Id :{" "}
                  </Typography>
                  {details.email}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} mt={1}>
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Phone No. :{" "}
                  </Typography>
                  {details.phone_no}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} mt={2}>
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Case Type :{" "}
                  </Typography>
                  {details.case_no}
                </Typography>
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
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Organization Name :{" "}
                  </Typography>
                  {details.organization}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Organization Details :{" "}
                  </Typography>
                  {details.details_organzation}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} mt={1}>
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Offer Received :{" "}
                  </Typography>
                  {details.offer}
                </Typography>
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
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Full Time Received :{" "}
                  </Typography>
                  {details.full_time}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4} mt={1}>
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Company Name :{" "}
                  </Typography>
                  {details.company_name}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4} mt={1}>
                <Typography variant="h5" component={"h6"} fontWeight={300}>
                  <Typography
                    component={"span"}
                    variant={"span"}
                    fontWeight={500}
                  >
                    Stipend :{" "}
                  </Typography>
                  ₹{details.stipend}
                </Typography>
              </Grid>
            </Grid>

            <Divider variant="middle" sx={{ marginTop: "1.5rem" }}>
              G-drive link
            </Divider>

            <Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                mt={2}
              >
                <Typography variant="h5" fontWeight={300} component="span">
                  <Typography component="span" variant="span" fontWeight={500}>
                    Drive Link : 
                  </Typography>
                  <a
                    href={details.drive_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {details.drive_link}
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
