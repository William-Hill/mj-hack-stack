import React, { useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Face, Fingerprint } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import { Navigate, useNavigate } from 'react-router-dom';
import { spacing } from '@mui/system';

import { login, isAuthenticated } from '../utils/auth';

// const useStyles = makeStyles((theme) => ({
//   margin: {
//     margin: theme.spacing(2),
//   },
//   padding: {
//     padding: theme.spacing(1),
//   },
//   button: {
//     textTransform: 'none',
//   },
//   marginTop: {
//     marginTop: 10,
//   },
// }));

export const Login = () => {
  // const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (_) => {
    setError('');
    try {
      const data = await login(email, password);

      if (data) {
        navigate('/');
      }
    } catch (err) {
      if (err instanceof Error) {
        // handle errors thrown from frontend
        setError(err.message);
      } else {
        // handle errors thrown from backend
        setError(String(err));
      }
    }
  };

  return isAuthenticated() ? (
    <Navigate to="/" />
  ) : (
    <Paper>
      <div>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              fullWidth
              autoFocus
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <br />
        <Grid container alignItems="center">
          {error && (
            <Grid item>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
        </Grid>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
          </Grid>
          <Grid item>
            <Button
              disableFocusRipple
              disableRipple
              variant="text"
              color="primary"
            >
              Forgot password ?
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center" sx={{ mt: 10 }}>
          {' '}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => history.push('/signup')}
          >
            Sign Up
          </Button>{' '}
          &nbsp;
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Login
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};
