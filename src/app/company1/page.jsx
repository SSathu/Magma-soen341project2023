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
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from "@mui/icons-material/Delete";

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
    jobtitle: "",
    jobdescription: "",
    salary: "",
    location: "",
  });

  const [error, setError] = useState("");

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
  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/AppPostings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyname: formData.companyname,
        jobtitle: formData.jobtitle,
        jobdescription: formData.jobdescription,
        salary: salary,
        location: formData.location,
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
  }
  const [value, setValue] = React.useState(2);
  const [hovered, setHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  React.useEffect(()=>{
    if( localStorage.getItem("mode")){
     setMode(localStorage.getItem("mode"))
      }
 },[]);

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
              <IconButton
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                onClick={handleClickNotif}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openNotif}
                onClose={handleCloseNotif}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleCloseNotif}>
                  Notification 1
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </MenuItem>
                <MenuItem onClick={handleCloseNotif}>Notification 2
                <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </MenuItem>
                <MenuItem onClick={handleCloseNotif}>Notification 3
                <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton></MenuItem>
              </Menu>
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
                <Typography
                  component="h1"
                  variant="h5"
                  style={{
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Company 1
                </Typography>

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid container>
                      {/* TEST 1 */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            border: "1px solid black",
                            padding: "1rem",
                            marginTop: "1rem",
                          }}
                        >
                          <Avatar
                            sx={{ marginRight: "1rem" }}
                            src="/your-image-url.jpg"
                            alt="Company 1 Logo"
                          />
                          <Box>
                            <div>
                              <Typography
                                variant="h6"
                                sx={{ marginBottom: "0.5rem" }}
                              >
                                Random Name
                              </Typography>
                              <Typography sx={{ marginBottom: "0.5rem" }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Rating name="read-only" value={4.5} readOnly />
                              </div>
                            </div>
                          </Box>
                        </Box>
                      </Grid>

                      {/* TEST 2 */}

                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            border: "1px solid black",
                            padding: "1rem",
                            marginTop: "1rem",
                          }}
                        >
                          <Avatar
                            sx={{ marginRight: "1rem" }}
                            src="/your-image-url.jpg"
                            alt="Company 1 Logo"
                          />
                          <Box>
                            <div>
                              <Typography
                                variant="h6"
                                sx={{ marginBottom: "0.5rem" }}
                              >
                                Random Name
                              </Typography>
                              <Typography sx={{ marginBottom: "0.5rem" }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Rating name="read-only" value={4.5} readOnly />
                              </div>
                            </div>
                          </Box>
                        </Box>
                      </Grid>

                      {/* TEST 3 */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            border: "1px solid black",
                            padding: "1rem",
                            marginTop: "1rem",
                          }}
                        >
                          <Avatar
                            sx={{ marginRight: "1rem" }}
                            src="/your-image-url.jpg"
                            alt="Company 1 Logo"
                          />
                          <Box>
                            <div>
                              <Typography
                                variant="h6"
                                sx={{ marginBottom: "0.5rem" }}
                              >
                                Random Name
                              </Typography>
                              <Typography sx={{ marginBottom: "0.5rem" }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Rating name="read-only" value={4.5} readOnly />
                              </div>
                            </div>
                          </Box>
                        </Box>
                      </Grid>

                      {/* TEST 4 */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            border: "1px solid black",
                            padding: "1rem",
                            marginTop: "1rem",
                          }}
                        >
                          <Avatar
                            sx={{ marginRight: "1rem" }}
                            src="/your-image-url.jpg"
                            alt="Company 1 Logo"
                          />
                          <Box>
                            <div>
                              <Typography
                                variant="h6"
                                sx={{ marginBottom: "0.5rem" }}
                              >
                                Random Name
                              </Typography>
                              <Typography sx={{ marginBottom: "0.5rem" }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Rating name="read-only" value={4.5} readOnly />
                              </div>
                            </div>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Typography color="error" align="center">
                    {error}
                  </Typography>

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
