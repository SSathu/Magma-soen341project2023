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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "../main/list";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


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
function createData(companyname, jobtitle, status, empemail, interviewstatus) {
  return { companyname, jobtitle, status, empemail, interviewstatus };
}

function DashboardContent() {

  const [applications, setApplications] = React.useState(null);


  async function getApplications() {
    let result = await fetch("/api/Applications");
    let body = await result.json();
    //console.log("INSIDE GET POSTINGS" + body);
    setApplications(body);
    // console.log(postings);
  }


  React.useEffect(() => {
    getApplications();
  }, []);


  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("mode", mode === 'light' ? 'dark' : 'light');
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
  const [users, setUsers] = React.useState(null);

  async function getUsers() {
    let result = await fetch("/api/readUsers");
    let body = await result.json();

    setUsers(body);
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("mode")) {
      setMode(localStorage.getItem("mode"))
    }
  }, []);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [formData, setFormData] = useState({
    CompanyName: '',
    JobPosition: '',
    Status: '',
    EmployerEmail: ''
  });

  const [error, setError] = useState('');

  async function sendInfo() {

    const response = await fetch('/api/DeleteApplication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        CompanyName: formData.CompanyName,
        JobPosition: formData.JobPosition,
        Status: formData.Status,
        EmployerEmail: formData.EmployerEmail
      })
    });
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
    } else {
      window.location.href = '/applications'
    }
  }

  const handleDelete = (row) => {
    formData.CompanyName = row.companyname;
    formData.JobPosition = row.jobtitle;
    formData.Status = row.status;
    formData.EmployerEmail = row.empemail;

    sendInfo();



  };

  const rows = applications?.map((app) => createData(app.CompanyName, app.JobTitle, app.Status ? 'Viewed' : 'Not Viewed', app.EmployerEmail, app.StudentEmail)) || [];

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

            {users &&
              users
                .filter((user) => user.LoggedIn === true)
                // .map((user) => ({
                //   ...user,
                //   password: user.password.replace(/./g, '*'),
                // }))
                .map((user) => (
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
                        My Applications
                      </Typography>

                      <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                      >
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 850 }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Company Name</StyledTableCell>
                                <StyledTableCell align="left">
                                  Job Position
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Status
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Employer Email
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Selection Status
                                </StyledTableCell>

                                <StyledTableCell align="right"></StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows
                                .map((row) => (
                                  <StyledTableRow key={row.companyname}>
                                    <StyledTableCell component="th" scope="row">
                                      {row.companyname}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                      {row.jobtitle}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                      {row.status}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                      {row.empemail}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                      {row.interviewstatus}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      <Button onClick={() => handleDelete(row)}>
                                        <DeleteIcon />
                                      </Button>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <Grid item xs={12}>
                          <Button>
                            <Link href="/profileedit" passHref>
                              Edit Application
                            </Link>
                          </Button>
                        </Grid>

                        <Grid container justifyContent="flex-end"></Grid>
                      </Box>
                    </Box>

                    <Copyright sx={{ pt: 4 }} />
                  </Container>
                ))}
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

