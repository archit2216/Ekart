import react, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUserAuth} from '../Context/userAuthContext';
import GoogleButton from 'react-google-button'

// import {auth} from './Config/config';

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const {login,googleLogin}=useUserAuth();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  // console.log(email," ",password);
  const handleGoogleSignIn=async(e) => {
    e.preventDefault();
    setError("");
    try {
      await googleLogin();
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email,password);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          {
            error.length>0 && <p style={{color:"red"}}>{error}</p>
          }
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <GoogleButton onClick={handleGoogleSignIn} fullWidth type='dark'/>
            <Grid>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}