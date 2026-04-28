import api from "./axios";


export const getCustomers = ()=>{
 return api.get("/customers");
};


export const createCustomer = (payload)=>{
 return api.post(
   "/customers",
   payload
 );
};


export const deleteCustomer = (id)=>{
 return api.delete(
  `/customers/${id}`
 );
};