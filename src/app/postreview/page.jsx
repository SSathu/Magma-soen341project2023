"use client";

import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "../main/list";
import { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Rating from "@mui/material/Rating";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/SSathu/Magma-soen341project2023"
      >
        CareerHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("mode",mode=== 'light' ? 'dark' : 'light' );
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            light: "#757ce8",
            main: "#3f50b5",
            dark: "#002884",
            contrastText: "#fff",
          },
          secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
          },
          mode,
        },
      }),
    [mode]
  );

  const [formData, setFormData] = useState({
    companyname: "",
    companyreview: "",
    rating: 0.0,
  
  });

  const [error, setError] = useState("");

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [salary, setSalary] = React.useState("");


  async function handleSubmit(event) {
    event.preventDefault();

    console.log(formData.rating);
    const response = await fetch("/api/AppRatings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CompanyName: formData.companyname,
        CompanyReview: formData.companyreview,
        Rating: formData.rating,
      }),
    });
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
      setError(json.error);
    } else {
      setError("Worked");
    }
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    

    setFormData({
      ...formData,
      [id]: value,
    });

    if(id != 'companyname' || id != 'companyreview'){
      formData.rating = value;
    }

    //console.log(formData.rating);
  }
  const [value, setValue] = React.useState(2);

  React.useEffect(()=>{
    if( localStorage.getItem("mode")){
     setMode(localStorage.getItem("mode"))
      }
 },[]);

  const [options, setOptions] = useState([]);

  // Use the useEffect hook to fetch the select box values from the backend API
  React.useEffect(() => {
    async function fetchSelectBoxValues() {
      const response = await fetch('/api/GetCompanies');
      const values = await response.json();
      setOptions(values);
    }
    fetchSelectBoxValues();
  }, []);

 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                CareerHub
              </Typography>
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>

            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <Grid container justifyContent="center">
                  <Typography component="h1" variant="h5">
                    Post Review
                  </Typography>
                </Grid>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                        Choose a Company:
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <label
                          htmlFor="company"
                          style={{ marginRight: "0.5rem" }}
                        >
                          <b>Company:</b>
                        </label>
                        <select
                          name="companyname"
                          id="companyname"
                          required
                          onChange={handleInputChange}
                          style={{ flex: 1 }}
                        >
                         {options.map((option) => (
    <option key={option.CompanyName} value={option.CompanyName}>
      {option.CompanyName}
    </option>
  ))}
                        </select>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="companyreview"
                        name="companyreview"
                        label="Company Review"
                        fullWidth
                        autoComplete="company-review"
                        variant="standard"
                        multiline
                        minRows={1}
                        maxRows={10}
                        onChange={handleInputChange}
                        inputProps={{
                          style: {
                            minHeight: "120px",
                          },
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} color="custom">
                      <Rating
                        id = "rating"
                        name="rating"
                        onChange={(event, newValue) => {
                          setFormData({
                            ...formData,
                            rating: newValue,
                          });
                        }}
                        defaultValue={2.5}
                        precision={1.0}
                      />
                    </Grid>
                  </Grid>
                  <Typography color="error" align="center">
                    {error}
                  </Typography>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Post Review
                  </Button>
                  <Grid container justifyContent="flex-end"></Grid>
                </Box>
              </Box>

              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
