import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  Paper
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    //paddingBottom: theme.spacing(3),
    //paddingTop: theme.spacing(3)
  },
  image: {
    width: 272,
    height: 322,
  },
  img: {
    margin: 'auto',
    display: 'center',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'admin@gmail.com',
              password: 'Admin123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => {
              navigate('/app/admin/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <Grid 
              container
              spacing={0}
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}>
              <Grid item xs={6}> 
                <img
                  alt="Under development"
                  className={classes.image}
                  src="/static/images/background/twitter.jpg"
                  />
              </Grid>
              <Grid item xs={6} style={{ backgroundColor:"#fff", boxShadow: '0 3px 5px 0px rgba(0, 0, 0, .5)', padding: '10px',borderRadius: 3 }}>
              <form onSubmit={handleSubmit}>
                 <Box mb={3}>
                  <Typography
                    style={{ color:"#1e8449" }}
                    variant="h3"
                  >
                    Login Page
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    style={{ backgroundColor:"#1e8449", color:"#fff" }}
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Login
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                    style={{ color:"#1e8449" }}
                  >
                    Forget your password?
                  </Link>
                </Typography>
              </form>
              </Grid>
              </Grid>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
