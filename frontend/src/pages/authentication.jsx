import React, { useState, useContext } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Typography,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Container
} from "@mui/material";
import {
  LockOutlined as LockOutlinedIcon,
  VideoCall as VideoCallIcon
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext.jsx";
import "./Authentication.css"; // We'll create this CSS file

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        TeamConnect
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#FF9839',
    },
    secondary: {
      main: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { handleRegister, handleLogin } = useContext(AuthContext);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError("");
    setUsername("");
    setPassword("");
    setName("");
  };

  const handleAuth = async () => {
    try {
      if (tabValue === 0) {
        let result = await handleLogin(username, password);
      }
      if (tabValue === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("");
        setMessage(result);
        setOpenSnackbar(true);
        setError("");
        setTabValue(0);
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      let message = err.response.data.message;
      setError(message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAuth();
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box className="auth-container">
        <CssBaseline />
        
        {/* Left Side - Hero Section */}
        <Box className="auth-hero">
          <Box className="hero-content">
            <VideoCallIcon className="hero-icon" />
            <Typography variant="h2" className="hero-title">
              TeamConnect
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
              Premium video conferencing for teams and individuals
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Auth Form */}
        <Box className="auth-form-container">
          <Paper elevation={6} className="auth-paper">
            <Box className="auth-form-content">
              <Avatar className="auth-avatar">
                <LockOutlinedIcon />
              </Avatar>
              
              <Typography component="h1" variant="h5" className="auth-title">
                {tabValue === 0 ? "Sign In" : "Create Account"}
              </Typography>

              {/* Tabs */}
              <Box className="auth-tabs">
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  aria-label="auth tabs"
                >
                  <Tab label="Sign In" id="auth-tab-0" aria-controls="auth-tabpanel-0" />
                  <Tab label="Sign Up" id="auth-tab-1" aria-controls="auth-tabpanel-1" />
                </Tabs>
              </Box>

              {/* Error Message */}
              {error && (
                <Alert severity="error" className="error-alert">
                  {error}
                </Alert>
              )}

              {/* Form Content */}
              <Box component="form" noValidate className="auth-form">
                <TabPanel value={tabValue} index={0}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="login-username"
                    label="Username"
                    name="username"
                    value={username}
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="login-password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="register-name"
                    label="Full Name"
                    name="name"
                    value={name}
                    autoComplete="name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="register-username"
                    label="Username"
                    name="username"
                    value={username}
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="register-password"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    helperText="Password must be at least 6 characters long"
                  />
                </TabPanel>

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  className="auth-button"
                  onClick={handleAuth}
                  size="large"
                >
                  {tabValue === 0 ? "Sign In" : "Create Account"}
                </Button>
              </Box>

              <Copyright sx={{ mt: 4 }} />
            </Box>
          </Paper>
        </Box>

        {/* Snackbar for messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="success"
            className="snackbar-alert"
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}