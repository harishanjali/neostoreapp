import { MAIN_API } from "../env";
import axios from "axios";
import jwt_decode from 'jwt-decode'
function getProducts(){
    return axios.get(`${MAIN_API}products`)
}
function getProductByid(id){
    return axios.get(`${MAIN_API}products/${id}`)
}
function postAddProduct(data){
    return axios.post(`${MAIN_API}products`,data);

}
function deleteProduct(id){
    return axios.delete(`${MAIN_API}products/${id}`);
}
function searchProducts(ser){
    return axios.get(`${MAIN_API}products/${ser}`);
}

export {getProducts,getProductByid,postAddProduct,deleteProduct,searchProducts};