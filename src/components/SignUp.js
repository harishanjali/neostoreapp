import React,{useState} from 'react';
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
import { userSignUp } from '../service/Auth';
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'

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
  const [state,setState]=useState({firstName:'',lastName:'',password:'',email:'',contactNumber:''})
  const navigate=useNavigate();
  const {register,handleSubmit,formState: { errors }} = useForm();

  const handler=(event)=>{
    let {name,value}=event.target;
    setState({...state,[name]:value})
    console.log(event.target.value);
  }
  const handleSubmitForm = (data) => {
    userSignUp(data)
    .then(res=>{
      if(res.data.err==0){
       navigate("/");
       console.log(res.data);
      }
      if(res.data.err==1){
        alert(res.data.msg)
      }
    })
    .catch(err=>{
      console.log(err);
    })
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
          <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitForm)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handler}
                  {...register('firstName',{ required: "Firstname is required",pattern:{value:/^[A-Za-z]{3,}$/i,message:'Enter Valid Name'}})}
                />
                <p className="text-danger">{errors.firstName?.message}</p>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handler}
                  {...register('lastName',{ required: "Lastname is required",pattern:{value:/^[A-Za-z]{3,}$/i,message:'Enter Valid Name'}})}
                />
                <p className="text-danger">{errors.lastName?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handler}
                  {...register('email',{ required: "Email is required", pattern: {value: /^\S+@\S+$/i, message: 'This is not a valid email'} })}
                />
                <p className="text-danger">{errors.email?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handler}
                  {...register('password',{ required: "Password is required", pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i, message: 'Password contain one upper,lower,special,digit min 8 chr'} })}
                />
                <p className="text-danger">{errors.password?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contactNumber"
                  label="Contact Number"
                 
                  id="contact"
                  autoComplete="contact"
                  onChange={handler}
                  {...register('contactNumber',{ required: "Conatact is required",pattern:{value:/^[0-9]{10}$/i,message:'Enter Valid Phone Number'}})}
                />
                 <p className="text-danger">{errors.contactNumber?.message}</p>
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}