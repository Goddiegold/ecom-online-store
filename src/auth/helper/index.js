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
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

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

const logout = async  (next) => {
    const userId = isAuthenticated() && isAuthenticated().user.id

    if(typeof window !== "undefined"){
        returnItemInLocalStorage(tshirtStoreUserToken)
        cartEmpty(()=>{})
        // next()

        return await (await fetch(`${API}user/logout/${userId}`,{method:"GET"})).json()
    }
}