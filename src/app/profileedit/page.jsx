"use client";

import * as React from "react";
import { useState } from "react";
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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "../main/list";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useUsers } from "../Components/userApi";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import { handleFileUpload } from "./../../pages/api/upload.js";
// import fs from "fs";

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

  // const [users, setUsers] = React.useState(null);

  // async function getUsers() {
  //   let result = await fetch("/api/readUsers");
  //   let body = await result.json();

  //   setUsers(body);
  // }

  // React.useEffect(() => {
  //   getUsers();
  // }, []);

  const users = useUsers();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [salary, setSalary] = React.useState("");

  const handleSalaryChange = (event) => {
    const value = event.target.value;
    if (/^[0-9]*$/.test(value)) {
      setSalary(value);
    }
  };
  const handleSubmit = async () => {
    const loggedInJobPosting = users.find((user) => user.LoggedIn === true);

    const loggedInJobPostingId = loggedInJobPosting.id;

    if (loggedInJobPosting) {
      console.log(
        `The ID of the logged in job posting is: ${loggedInJobPostingId}`
      );
    } else {
      console.log("No job posting found where loggedIn is true.");
    }

    try {
      const response = await fetch("/api/editProfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loggedInJobPostingId,
          firstname,
          lastname,
          email,
          country,
          postalCode,
          bio,
          city,
          phone,
          password,
        }),
      });

      const data = await response.json();
      console.log("this is the json");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadDocument = () => {
    const documentUrl = "/my-document.pdf";
    window.location.href = documentUrl;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openNotif = Boolean(anchorEl);
  const handleClickNotif = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseNotif = () => {
    setAnchorEl(null);
  };
  
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
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Edit Profile
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        autoComplete="first-Name"
                        variant="standard"
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        autoComplete="last-Name"
                        variant="standard"
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="emal"
                        name="email"
                        label="Email address"
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        fullWidth
                        autoComplete="password"
                        variant="standard"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        required
                        id="number"
                        name="number"
                        label="Phone number"
                        fullWidth
                        autoComplete="number"
                        variant="standard"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="city"
                        variant="standard"
                        onChange={(event) => setCity(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="country"
                        variant="standard"
                        onChange={(event) => setCountry(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        required
                        id="postalCode"
                        name="postalCode"
                        label="Postal Code"
                        fullWidth
                        autoComplete="postalCode"
                        variant="standard"
                        onChange={(event) => setPostalCode(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="bio"
                        name="bio"
                        label="Biography"
                        fullWidth
                        autoComplete="bio"
                        variant="standard"
                        multiline
                        minRows={1}
                        maxRows={10}
                        inputProps={{
                          style: {
                            minHeight: "60px",
                          },
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(event) => setBio(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <input type="file"  />
                      <button>Upload File</button>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {/* <Link href="/profile" passHref>
                    Save Changes
                  </Link> */}
                    Save Changes
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
