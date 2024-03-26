import { Typography } from "@mui/material";
import * as React from "react";
import {Link} from "@mui/material";


export default function Error404() {
    return(
        <>
        <Typography sx={{ fontWeight: "700" , display : "flex" , justifyContent : "center" }} variant="h1">Error 404</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh'}}>
       
        <Typography sx={{ fontWeight: "700" }} variant="h1">You seem lost</Typography>
        <Typography sx={{ fontWeight: "700" }} variant="h3">  
        <Link href="/">Click here</Link> to go back to homepage</Typography>
   
        </div>
    </>
      )
}