import { API } from "../../backend";


export const getMyToken = async (userId,token) => {
return await (await fetch(`${API}payment/get-token/${userId}/${token}/`)).json()
}

export const processPayment = async (userId,token, paymentInfo) => {
    const formData = new FormData();

    for(const name in paymentInfo){
        formData.append(name,paymentInfo[name])
     }

     return await (await fetch(`${API}payment/process/${userId}/${token}/ `, {
        method:"POST",body:formData
     })).json()
}