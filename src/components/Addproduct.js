import React,{useState,useEffect} from 'react';
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
import { postAddProduct} from '../service/Product';
import { useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

const theme = createTheme();
export default function AddProduct() {
  const {register,handleSubmit,formState: { errors }} = useForm();
    const [state,setState]=useState({});
    const navigate=useNavigate();
    const handler=(event)=>{
   const {name,value}=event.target;
   setState({...state,[name]:value})
    }
    const handleSubmitForm=(data)=>{
          console.log(state);
          postAddProduct(data)
          .then(res=>{
            if(res.data){
                alert("Product Added");
                navigate("/products")
            }
          })
    }

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
         Add Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleSubmitForm)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handler}
            {...register('name',{ required: "Name is required", pattern: {value: /^[A-Za-z]{3,}$/i, message: 'This is not a valid name'} })}
          />
          <p className="text-danger">{errors.name?.message}</p>
           <TextField
            margin="normal"
            required
            fullWidth
            id="category"
            label="Category"
            name="category"
            autoComplete="category"
            onChange={handler}
            {...register('category',{ required: "Category is required", pattern: {value: /^[A-Za-z]{3,}$/i, message: 'This is not a valid category'} })}
          />
           <p className="text-danger">{errors.category?.message}</p>
           <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            autoComplete="price"
            onChange={handler}
            {...register('price',{ required: "Price is required", pattern: {value: /^[0-9]{1,}$/i, message: 'This is not a valid Price'} })}
          />
          <p className="text-danger">{errors.price?.message}</p>
           <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="description"
            name="description"
            autoComplete="description"
            
          />
          
           <TextField
            margin="normal"
            required
            fullWidth
            id="manufacturer"
            label="manufacturer"
            name="manufacturer"
            autoComplete="manufacturer"
            onChange={handler}
            {...register('manufacturer',{ required: "manufacturer is required", pattern: {value: /^[A-Za-z]{3,}$/i, message: 'This is not a valid manufacturer'} })}
          />
            <p className="text-danger">{errors.manufacturer?.message}</p>
           <TextField
            margin="normal"
            required
            fullWidth
            id="availableItems"
            label="availableItems"
            name="availableItems"
            autoComplete="availableItems"
            onChange={handler}
            {...register('availableItems',{ required: "availableItems is required", pattern: {value: /^[0-9]{3,}$/i, message: 'This is not a valid availableItems'} })}
          />
          <p className="text-danger">{errors.availableItems?.message}</p>
            <TextField
            margin="normal"
            required
            fullWidth
            id="imageURL"
            label="imageURL"
            name="imageURL"
            autoComplete="imageURL"
            onChange={handler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Product
          </Button>
        </Box>
      </Box>
     
    </Container>
  </ThemeProvider>
  )
}
