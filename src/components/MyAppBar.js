import React,{useEffect,useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from 'react-router-dom'
import { isLoggedIn,isAdmin,doLogout} from '../service/Auth';
import { useSelector } from 'react-redux';
import { countProducts } from '../redux/Actions/ProductActions';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';

export default function MyAppBar() {
  const [filter,setFilter]=useState("");
  useEffect(()=>{
    let searchParams=new URLSearchParams();
      if(filter){
        searchParams.set("name",filter);
      }
      navigate({
        pathname:"/products",
        search:searchParams.toString()
      })
  },[filter])
  
  const navigate=useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem('procart')!=undefined){
      let arr=JSON.parse(localStorage.getItem('procart'));
      let count=0;
      arr.map(each=>{
        let quantity = each.quantity;
        count += quantity;
      })

      dispatch(countProducts(count));
    }
  },[]);
  const productCount = useSelector((state) => state.addItem.proInCart)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Neostore E-Shop
          </Typography>
          {isLoggedIn() && <div>
               <SearchIcon />
               <InputBase 
               placeholder='Search'
               value={filter}
               onChange={(event)=> setFilter(event.target.value)}/>
            </div>}
          {!isLoggedIn() && (
            <>
            <Button color="inherit" onClick={()=> navigate("/") }>Login</Button>
            <Button color="inherit" onClick={()=> navigate("/signup")}>SignUp</Button>
            </>
          )}
          {isLoggedIn() && (
            <>
            <Button color="inherit" onClick={()=> navigate("/products") }>Home</Button>
            </>
          )}
          {isLoggedIn() && isAdmin() &&  (
            <>
            <Button color="inherit" onClick={()=> navigate("/addproduct") }>Add Product</Button>
            </>
          )}
          {isLoggedIn() && (
            <>
            <Button color="inherit" onClick={doLogout}>Logout</Button>
            <Button color="inherit" onClick={()=> navigate("/cart") }>{`Cart${productCount}`}</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
