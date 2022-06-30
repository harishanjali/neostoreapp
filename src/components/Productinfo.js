import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { getProductByid } from '../service/Product';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux/es/exports';
import { countProducts } from '../redux/Actions/ProductActions';
import {useNavigate} from 'react-router-dom';

export default function Productinfo() {
    const [product, setProduct] = useState({});
    const {id}=useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
      getProductByid(id)
      .then(res=>{
        setProduct(res.data)
      })
      .catch(err=> console.log(err))
    },[id])

    function isThere(item){
        let arr=JSON.parse(localStorage.getItem('procart'));
        let result;
        for(let items of arr){
          if(items._id===item._id){
            result = true;
            break;
          }
          else{
            result = false;
          }
        }
        return result;
      }
      const addCart=(item)=>{
        if(localStorage.getItem('procart')!=undefined){ 
           let arr=JSON.parse(localStorage.getItem('procart'));
           let flag = isThere(item)
           if(flag){
               alert("Product already in cart");
           }
           else {
            arr.push(item);
            localStorage.setItem('procart',JSON.stringify(arr));
            alert("Product Add To Cart");
            dispatch(countProducts(arr.length))
  
           }
        }
        else{
            let arr=[];
            arr.push(item);
            alert("Product Add To Cart");
            dispatch(countProducts(arr.length))
        }
    }
  return (
    <>
    <div style={{ display: "flex", justifyContent: "space-around", margin: "40px 40px" }}>
        <div>
            <ul style={{ listStyleType: "none", fontSize: "24px",fontWeight:"bolder", maxWidth:"600px"}}>
                <li >
                    Product Name: <span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.name}</span>
                </li>
                <li>
                    Price:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>₹{product.price}</span> 
                </li>
                <li>
                    Category:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.category}</span> 
                </li>
                <li>
                    Description:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.description}</span> 
                </li>
                <li>
                    Manufacturer:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.manufacturer}</span> 
                </li>
                <li>
                    Available Items:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.availableItems}</span> 
                </li>
                <li>
                    <button className='btn btn-primary' onClick={()=>addCart(product)}>Add to cart</button>
                    <button className='btn btn-warning m-2'>Back</button>
                </li>
            </ul>



        </div>
        <Grid item xs={3}>
            <Card sx={{ maxWidth: "500px" }} >
                <CardMedia
                    component="img"
                    alt={product.name}
                    image={product.imageURL}
                    height="250"
                />
            </Card>
        </Grid>

    </div>
</>
  )
}
