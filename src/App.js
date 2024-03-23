import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PersistentDrawerLeft from "./components/drawer";
import ReactTyped from "react-typed";


const darkTheme = createTheme({
  palette: {
    mode: 'light',
  }
});


function App() {
  return(

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <PersistentDrawerLeft/>
    </ThemeProvider>
  )
}

export default App;
