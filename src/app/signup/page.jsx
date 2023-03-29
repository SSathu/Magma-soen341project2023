"use client";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Prisma, PrismaClient } from '@prisma/client'
import { Schema } from '@mui/icons-material';
//import { createUser } from './users';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/SSathu/Magma-soen341project2023">
        CareerHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({

  palette: {
    primary:{
      main: '#2bbcc2',
    },
    custom: {
      light: '#FFFFFF',
      main: '#2bbcc2',
      dark: '#FFFFFF',
      contrastText: '#FFFFFF',
    }
  },
  
});



export default function SignInSide() {

  const [formData, setFormData] = useState({
    firstname:'', 
    lastname:'',
    email:'',
    password:'',
    occupation:''
  });
  const [error, setError] = useState('');

  

  async function handleSubmit(event) {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email is Not Valid');
      return;
    }
    // if(formData.firstname == '' || formData.lastname == ''|| formdata.email == '' || formData.password =='' ){
    //   setError('No Fields Can Be Empty');
    //   return;
    // }
    const response = await fetch('/api/AppUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        firstname: formData.firstname, 
        lastname: formData.lastname, 
        email: formData.email, 
        password: formData.password 
      })
    });
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
      setError(json.error);
    } else {
      window.location.href = '/logIn'
    }
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    setFormData({
      ...formData,
      [id]: value
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }} >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.ibb.co/31xLL26/photo-1517245386807-bb43f82c33c4.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          
            <Avatar src={'https://i.imgur.com/szyjkHA.png'} alt = 'logo'> Hello </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

            <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                value={formData.firstname}
                onChange={handleInputChange}
              />
                 <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                autoFocus
                value={formData.lastname}
                onChange={handleInputChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Grid item xs={12}>
              <div>
                  <label htmlFor="Occupation">Occupation:</label>
                 <select name="Occupation" id="Occupation" 
                   value={formData.occupation}
                  onChange={handleInputChange}
                 >
                  <option value="student">Student</option>
                     <option value="employer">Employer</option>
               </select>
              </div>
              </Grid>
             
              <Typography color='error' align='center'>
              {error}
            </Typography>

              <Button
                color = "custom"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <p>Sign up</p>
              </Button>
              
              <Grid container>
               
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account?"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}