import React,{useEffect,useState} from 'react'
import { getProducts } from '../service/Product'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { countProducts } from '../redux/Actions/ProductActions';
import {isAdmin} from '../service/Auth';
import { deleteProduct } from '../service/Product';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../service/Product';
import Pagination from './Pagination';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Products() {
  const [proData,setProData]=useState([]);
  const [perPage,setPage] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(()=>{
    searchProducts(location.search)
    .then(res=>{
      if(res.data.err==0){
        setProData(res.data.prodata);
        setPage(res.data.prodata.slice(0,6));
      }
    })
    .catch(err=>console.log(err));
  },[location.search])
  useEffect(() => {
    if (localStorage.getItem('procart') != undefined) {
        let array = JSON.parse(localStorage.getItem('procart'));
    }
    else {
        console.log('not found');
    }
}, [])
  const navigate=useNavigate();
    useEffect(()=>{
        getProducts()
        .then(res=>{
          if(res.data.err==0){
            setProData(res.data.prodata)
          }
        })
        .catch(err=>console.log(err.msg));
    },[])
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
         let flag = isThere(item);
         if(flag){
             alert("Product already in cart");
         }
         else {
          arr.push(item);
          arr.map(each=>{
            if(each.quantity===undefined){
              each.quantity = 1;
            }
          })
          localStorage.setItem('procart',JSON.stringify(arr));
          let myArr = localStorage.getItem('procart');
          alert("Product Add To Cart");
          let count=0;
          arr.map(each=>{
            let quantity = each.quantity;
            count += quantity;
          })

          dispatch(countProducts(count));

         }
      }
      else{
          let arr=[];
          arr.push(item);
          arr.map(each=>{
            if(each.quantity===undefined){
              each.quantity = 1;
            }
          })
          localStorage.setItem('procart',JSON.stringify(arr));
          alert("Product Add To Cart");
          let count=0;
          arr.map(each=>{
            let quantity = each.quantity;
            count += quantity;
          })

          dispatch(countProducts(count))
      }
  }
  const delPro=(id)=>{
    if(window.confirm("Do u want to delete ?"))
    {
      deleteProduct(id)
      .then(res=>{
        if(res.data){
          alert("Product Deleted");
          let data=proData.filter(pro=> pro._id!=id);
          setProData(data);
        }
      })
    }
  }
  const pagehandler = (page)=>{
    setPage(proData.slice((page*6)-6,page*6));
  }
  return (
    <>
       <Container>
      <h2> Products</h2>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
          {perPage.map(pro=>
           <Grid item xs={4}>
        <Card sx={{ maxWidth: 345 }} key={pro.id}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={pro.imageURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pro.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category : {pro.category} <br/>
          Price : {pro.price}<br/>
          Avail Items : {pro.availableItems}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> navigate(`/product-details/${pro._id}`) }>Info</Button>
        <Button size="small" onClick={()=>addCart(pro)}>Add To Cart</Button>
        {isAdmin() && (
          <div>
            <Button size="small" onClick={()=> delPro(pro._id)}>Delete</Button>
          </div>
        )}
      </CardActions>
        </Card>
        </Grid>
         )}
      
       
       
      </Grid>
    </Box>
    </Container>
    <Pagination data={proData} pagehandler={pagehandler}/>
    </>
 
    
  )
}
