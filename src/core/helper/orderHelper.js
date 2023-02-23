import { API } from "../../backend";


export const createOrder = async (userId,token,orderData) => {
 const formData = new FormData();

 for(const name in orderData){
    formData.append(name,orderData[name])
 }

 return (await fetch(`${API}order/add/${userId}/${token}/`,{method:"POST",body:formData})).json()
}