import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { countProducts } from '../redux/Actions/ProductActions';

export default function Cart() {
  const [cartItems,setCart] = useState([]);
  const dispatch = useDispatch();
  const [total,setTotal] = useState(0);
    useEffect(()=>{
        if (localStorage.getItem('procart') != undefined) {
            let array = JSON.parse(localStorage.getItem('procart'));
            setCart(array);
            let subTotal = 0;
            array.map(each=>{
              let eachTotal = (each.quantity) * (parseInt(each.price));
              subTotal += eachTotal;
            });
            setTotal(subTotal);
        }
        else {
            console.log('not found');
        }
    },[]);
    const deleteItem = (id)=>{
      let items = JSON.parse(localStorage.getItem('procart'));
      let deleteElementIndex = items.findIndex(function(eachItem) {
        if(eachItem._id===id){
          return true;
        }
        else{
          return false;
        }
      });
      items.splice(deleteElementIndex,1);
      localStorage.setItem('procart',JSON.stringify(items));
      if(localStorage.getItem('procart')!=undefined){
        let arr=JSON.parse(localStorage.getItem('procart'));
        let count=0;
        items.map(each=>{
            let quantity = each.quantity;
            count += quantity;
        })
        dispatch(countProducts(count));
      }
      setCart(items);
      let subTotal = 0;
            items.map(each=>{
              let eachTotal = (each.quantity) * (parseInt(each.price));
              subTotal += eachTotal;
            });
            setTotal(subTotal);
    }
    const increaseQuantity = (id)=>{
      let items = JSON.parse(localStorage.getItem('procart'));
      let ElementIndex = items.findIndex(function(eachItem) {
        if(eachItem._id===id){
          return true;
        }
        else{
          return false;
        }
      });
      items[ElementIndex].quantity += 1;
      localStorage.setItem('procart',JSON.stringify(items));
      let count=0;
      items.map(each=>{
          let quantity = each.quantity;
          count += quantity;
      })
      dispatch(countProducts(count));
      setCart(items);
      let subTotal = 0;
            items.map(each=>{
              let eachTotal = (each.quantity) * (parseInt(each.price));
              subTotal += eachTotal;
            });
            setTotal(subTotal);
    }
    const decreaseQuantity = (id)=>{
      let items = JSON.parse(localStorage.getItem('procart'));
      let ElementIndex = items.findIndex(function(eachItem) {
        if(eachItem._id===id){
          return true;
        }
        else{
          return false;
        }
      });
      if(items[ElementIndex].quantity > 1){
        items[ElementIndex].quantity -= 1;
      }
      localStorage.setItem('procart',JSON.stringify(items));
      let count=0;
      items.map(each=>{
          let quantity = each.quantity;
          count += quantity;
      })
      dispatch(countProducts(count));
      setCart(items);
      let subTotal = 0;
            items.map(each=>{
              let eachTotal = (each.quantity) * (parseInt(each.price));
              subTotal += eachTotal;
            });
            setTotal(subTotal);
    }
  return (
    <>
        <table className='table-danger table'>
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
          {cartItems.map(item=>(
            <tr>
              <td>
                <img src={item.imageURL} style={{height:'150px',width:'150px'}}/>
              </td>
              <td>
                <h5 className='mt-5'>{item.name}</h5>
              </td>
              
              <td>
                <button className='btn btn-info mt-5' onClick={()=>decreaseQuantity(item._id)}>-</button>
                <button className='btn btn-info ms-3 me-3 mt-5'>{item.quantity}</button>
                <button className='btn btn-info mt-5' onClick={()=>increaseQuantity(item._id)}>+</button>
              </td>
              <td>
                <h5 className='mt-5'>{`₹ ${item.price}`}</h5>
              </td>
              <td>
                <button className='btn btn-danger mt-5' onClick={()=>deleteItem(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    <p className='text-start text-success'>{`Total is ${total}`}</p>
    </>
  
  )
}
