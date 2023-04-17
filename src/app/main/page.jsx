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
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useUsers } from "../Components/userApi";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from '@mui/icons-material/Delete';
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function DashboardContent() {
  const users = useUsers();
  const [open1, setOpen1] = React.useState(false);
  const [openJobPostingId, setOpenJobPostingId] = React.useState(null);

  const handleClickOpen = (jobPostingId) => {
    setOpen1(true);
    setOpenJobPostingId(jobPostingId);
  };

  const handleClose = () => {
    setOpen1(false);
    setOpenJobPostingId(null);
  };

  const [mode, setMode] = React.useState("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("mode", mode === "light" ? "dark" : "light");
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

  React.useEffect(() => {
    if (localStorage.getItem("mode")) {
      setMode(localStorage.getItem("mode"));
    }
  }, []);

  async function applyToJob(jobPosting) {
    const loggedInJobPosting = users.find((user) => user.LoggedIn === true);

    const loggedInJobPostingEmail = loggedInJobPosting.Email;

    const requestBody = {
      studentEmail: loggedInJobPostingEmail,
      jobid: jobPosting.id,
      Viewed: false,
      Accepted: false,
      EmployerEmail: jobPosting.Email,
      firstname: loggedInJobPosting.FirstName,
      lastname: loggedInJobPosting.LastName,
      jobtitle: jobPosting.jobTitle,
      companyName: jobPosting.CompanyName,
    };
    try {
      const response = await fetch("/api/Apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log(data);
      // If the application was submitted successfully, update the button text to "Applied"
      if (data.message === "Application submitted successfully") {
        const button = document.getElementById(`apply-button-${jobPosting.id}`);
        if (button) {
          button.textContent = "Applied";
          button.disabled = true;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

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
              <div className="main">
                <div className="search">
                  <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                    color="secondary"
                  />
                </div>
              </div>

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

            <Container maxWidth="lg" sx={{ mt: 2, mb: 2, ml: 2 }}>
              <label htmlFor="filters">
                <b>Filters:</b>
              </label>
              <select name="filters" id="filters" sx={{ mt: 30, mb: 20 }}>
                <option value="inperson">All Offers</option>
                <option value="remote">Most Relevant</option>
                <option value="hybrid">Recommended</option>
                <option value="hybrid">Most Recent</option>
              </select>
            </Container>

            <Container maxWidth="lg" sx={{ mt: 2, mb: 2, ml: 2 }}>
              <label htmlFor="location">
                <b>Location:</b>
              </label>
              <select name="location" id="location" sx={{ mt: 30, mb: 20 }}>
                <option value="inperson">In Person</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </Container>

            {filteredData.length !== 0 ? (
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
                          </CardContent>
                          <CardActions>
                            <Button
                              id={`apply-button-${jobPosting.id}`}
                              size="small"
                              onClick={() => handleClickOpen(jobPosting.id)}
                            >
                              View
                            </Button>
                            <div>
                              <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={
                                  open1 && openJobPostingId === jobPosting.id
                                } // only open the dialog if openJobPostingId matches the current jobPosting ID
                              >
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleClose}
                                >
                                  {jobPosting.companyName}
                                </BootstrapDialogTitle>
                                <DialogContent dividers>
                                  <Typography variant="h6" gutterBottom>
                                    Job Description:
                                  </Typography>
                                  <Typography gutterBottom>
                                    {jobPosting.jobDescription}
                                  </Typography>

                                  <Typography variant="h6" gutterBottom>
                                    Location:
                                  </Typography>
                                  <Typography gutterBottom>
                                    {jobPosting.Location}
                                  </Typography>

                                  <Typography variant="h6" gutterBottom>
                                    Salary:
                                  </Typography>
                                  <Typography gutterBottom>
                                    {jobPosting.Salary}$/Hour
                                  </Typography>
                                </DialogContent>
                              </BootstrapDialog>
                            </div>

                            <Button
                              size="small"
                              id={`apply-button-${jobPosting.id}`}
                              onClick={() => applyToJob(jobPosting)}
                            >
                              Apply
                            </Button>
                          </CardActions>
                        </Grid>
                      ))}
                  </Grid>
                </Container>
              </Container>
            ) : (
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Container sx={{ py: 5 }} maxWidth="md">
                  <Grid container spacing={4}>
                    {postings &&
                      postings.map((jobPosting) => (
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
                          </CardContent>
                          <CardActions>
                            <Button
                              id={`apply-button-${jobPosting.id}`}
                              size="small"
                              onClick={() => handleClickOpen(jobPosting.id)}
                            >
                              View
                            </Button>
                            <div>
                              <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={
                                  open1 && openJobPostingId === jobPosting.id
                                } // only open the dialog if openJobPostingId matches the current jobPosting ID
                              >
                                <BootstrapDialogTitle
                                  id="customized-dialog-title"
                                  onClose={handleClose}
                                >
                                  {jobPosting.companyName}
                                </BootstrapDialogTitle>
                                <DialogContent dividers>
                                  <Typography variant="h6" gutterBottom>
                                    Job Description:
                                  </Typography>
                                  <Typography gutterBottom>
                                    {jobPosting.jobDescription}
                                  </Typography>

                                  <Typography variant="h6" gutterBottom>
                                    Location:
                                  </Typography>
                                  <Typography gutterBottom>
                                    {jobPosting.Location}
                                  </Typography>

                                  <Typography variant="h6" gutterBottom>
                                    Salary:
                                  </Typography>
                                  <Typography gutterBottom>
                                    {jobPosting.Salary}$/Hour
                                  </Typography>
                                </DialogContent>
                              </BootstrapDialog>
                            </div>

                            <Button
                              size="small"
                              id={`apply-button-${jobPosting.id}`}
                              onClick={() => applyToJob(jobPosting)}
                            >
                              Apply
                            </Button>
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
