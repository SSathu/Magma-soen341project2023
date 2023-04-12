"use client";

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
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./list";
import { Button } from "@mui/material";
import JobCard from "../Components/JobCard";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useUsers } from '../Components/userApi';


const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        CareerHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

  const users = useUsers();


  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
          mode,
        },
      }),
    [mode],
  );


  const [open, setOpen] = React.useState(true);
  const [postings, setPostings] = React.useState(null);

  const [filteredData, setfilteredData] = useState([]);

  const inputHandler = (event) => {
    const searchedWord = event.target.value;
    const newFilter = postings.filter((value) => {
      return value.jobTitle.toLowerCase().includes(searchedWord.toLowerCase());
    });
    setfilteredData(newFilter);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  async function getPostings() {
    let result = await fetch("/api/Postings");
    let body = await result.json();
    //console.log("INSIDE GET POSTINGS" + body);
    setPostings(body);
    // console.log(postings);
  }

  async function getFilteredJobs() {
    Filter = <input type="text" />;
  }

  React.useEffect(() => {
    getPostings();
  }, []);

  


  async function applyToJob(jobPosting) {
    
    const loggedInJobPosting = users.find((user) => user.LoggedIn === true);

    const loggedInJobPostingEmail = loggedInJobPosting.Email;
    
    const requestBody = {email: loggedInJobPostingEmail, jobid: jobPosting.id, Viewed: false, Accepted: false };
    try {
      const response = await fetch('/api/Apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log(data);
      // If the application was submitted successfully, update the button text to "Applied"
      if (data.message === 'Application submitted successfully') {
        const button = document.getElementById(`apply-button-${jobPosting.id}`);
        if (button) {
          button.textContent = 'Applied';
          button.disabled = true;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

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
              <div className="main">
                <div className="search">
                  <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                  />
                </div>
              </div>

              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
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

            {filteredData.length != 0 && (
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Container sx={{ py: 5 }} maxWidth="md">
                  <Grid container spacing={4}>
                    {filteredData &&
                      filteredData.map((jobPosting) => (
                        <Grid item key={jobPosting.id} xs={12} sm={6} md={4}>
                          <CardContent sx={{ flexGrow: 4 }}>
                            <JobCard
                              sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                              }}
                              posting={jobPosting}
                              key={jobPosting.id}
                            />
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              style={{ color: "black" }}
                            >
                              {jobPosting.jobTitle}
                            </Typography>
                            <Typography style={{ color: "black" }}>
                              {jobPosting.jobDescription}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small">View</Button>
                            <Button size="small" id = {`apply-button-${jobPosting.id}`} onClick={() => applyToJob(jobPosting)}
                            >Apply</Button>
                          </CardActions>
                        </Grid>
                      ))}
                  </Grid>
                </Container>
              </Container>
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
