import {API} from '../../backend'
import {cartEmpty,
     returnItemInLocalStorage,
      setLocalStorage} from "../../core/helper/cartHelper"

const tshirtStoreUserToken = "tshirtStoreUserToken"

export const signup = async (user) =>
 await (await fetch(`${API}user/`,{
    method:"POST",
    headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
})).json()



export const login = async (user) => {
    console.log(user)
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    console.log(formData);

    return await (await fetch(`${API}user/login/`,{method:"POST", body:formData})).json()
}

export const authenticate = (data,next) => {
if(typeof window !== "undefined"){
    setLocalStorage(tshirtStoreUserToken,data)
    next()
}
}


export const isAuthenticated = () => {
    if(typeof window !== "undefined"){
        const data = returnItemInLocalStorage(tshirtStoreUserToken)
        if(data){
            return JSON.parse(data)
        }else{
            return false
        }
    }
}

export const logout = async  (next) => {
    const userId = isAuthenticated() && isAuthenticated().user.id

    if(typeof window !== "undefined"){
        localStorage.removeItem(tshirtStoreUserToken)
        cartEmpty(()=>{})
        // next()

        return await (await fetch(`${API}user/logout/${userId}`,{method:"GET"})).json()
    }
}