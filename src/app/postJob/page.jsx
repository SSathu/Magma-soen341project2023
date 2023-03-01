
"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [salary, setSalary] = React.useState('');

  const handleSalaryChange = (event) => {
    const value = event.target.value;
    if (/^[0-9]*$/.test(value)) {
      setSalary(value);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                 required
                  id="companyName"
                  name="companyName"
                  label="Company Name"
                  fullWidth
                  autoComplete="company-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                   required
                  id="jobTitle"
                  name="jobTitle"
                  label="Job Title"
                  fullWidth
                  autoComplete="job-title"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="salary"
                  name="salary"
                  label="Salary"
                  fullWidth
                  autoComplete="salary"
                  variant="standard"
                  value={salary}
                  onChange={handleSalaryChange}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 id="jobDescription"
                  name="jobDescription"
                  label="Job Description"
                  fullWidth
                  autoComplete="job-description"
                  variant="standard"
                  multiline
                  minRows={1}
                  maxRows={10}
                  inputProps={{
                    style: {
                      minHeight: '120px',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <div>
                  <label htmlFor="location">Location:</label>
                 <select name="location" id="location" required>
                  <option value="inperson">In Person</option>
                     <option value="remote">Remote</option>
                     <option value="hybrid">Hybrid</option>
               </select>
              </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post Job
            </Button>
            <Grid container justifyContent="flex-end">
             
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}