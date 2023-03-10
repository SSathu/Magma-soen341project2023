"use client";
// import { React, useState } from "react";
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
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./list";
import { Button } from "@mui/material";
import JobCard from "../Components/JobCard";
// import SearchBar from "../Components/SearchBar";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import filteredItems from "../Components/filteredItems";
// import TextField from "@mui/material/TextField";
// import searchbar from "../components/searchbar.css"
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
// import filteredItems from "./filteredItems";



const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#2bbcc2",
      dark: "#FFFFFF",
      contrastText: "#FFFFFF",
    },
    custom: {
      light: "#FFFFFF",
      main: "#2bbcc2",
      dark: "#FFFFFF",
      contrastText: "#FFFFFF",
    },
  },
});

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
  const [open, setOpen] = React.useState(true);
  const [postings, setPostings] = React.useState(null);

  const [filteredData, setfilteredData] = useState([]);

  const inputHandler = (event) => {

    const searchedWord = event.target.value
    const newFilter = postings.filter((value) => {
      return value.jobTitle.toLowerCase().includes(searchedWord.toLowerCase());


    });
    setfilteredData(newFilter)
  }

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
    Filter = <input type="text" />

  }


  React.useEffect(() => {
    getPostings();
  }, []);



  return (
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

            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
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

          {
            filteredData.length != 0 && (

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            < Container sx={{ py: 5 }} maxWidth="md">
              <Grid container spacing={4}>
                {filteredData && filteredData.map((jobPosting) => (
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
                      <Button size="small">Apply</Button>
                    </CardActions>
                  </Grid>

                ))}
              </Grid>
            </Container>
          </Container>
                )}
        </Box>
      </Box>
    </ThemeProvider >
  );
}


export default function Dashboard() {
  return <DashboardContent />;
}
