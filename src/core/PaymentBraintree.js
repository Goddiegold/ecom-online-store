import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { cartEmpty } from "./helper/cartHelper"
import { getMyToken, processPayment } from "./helper/paymentHelper"
import { createOrder } from "./helper/orderHelper";
import DropIn from "braintree-web-drop-in-react"
import { isAuthenticated, logout } from "../auth/helper";

function PaymentBraintree({
    products = [],
    reload,
    setReload = f => f
}) {

    const navigate = useNavigate()

    const [info, setInfo] = useState({
        loading: false, success: false, clientToken: null, error: "", instance: {}
    })

    const userId = isAuthenticated && isAuthenticated().user.id
    const token = isAuthenticated && isAuthenticated().token

    const getToken = () => {
        getMyToken(userId, token).then(res => {
            console.log(res)
            if (res.error) {
                setInfo({
                    ...info,
                    error: true
                })

                logout(() => navigate('/'))
            } else {
                const clientToken = res.clientToken
                setInfo({ ...info, clientToken })
            }
        }).catch(err => {
            console.log(err)
        })
    }


    const showbtnDropIn = (handlePurchase) => {
        return (
            <div>
                {
                    info.clientToken && products.length > 0 ?
                        <div>
                            <DropIn
                                options={{ authorization: info.clientToken }}
                                onInstance={instance => setInfo({...info,instance})}
                            >

                            </DropIn>
                            <button className='btn btn-block btn-success' onClick={handlePurchase}>
                                Buy
                            </button>
                        </div>
                        :
                        (
                            <h3>Please login firstor add something in cart.</h3>
                        )
                }
            </div>
        )
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])


    const getAmount = (showCurrency=false) => {
        let amount = 0;
        products.map(product => {
            amount += parseInt(product.price)
        })
        return showCurrency ? `$${amount}` : amount
    }


    const handlePurchase = () => {  
        setInfo({ ...info, loading: true })
        let nonce;
        console.log(info.instance);
        let getNonce = info.instance.requestPaymentMethod()
            .then(res => {
                nonce = res.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                }
                processPayment(userId, token, paymentData)
                    .then(res => {
                        console.log(res)
                        if (res.error) {
                            console.log("Payment Failed");
                            if (res.code === '1') {
                                logout(() => navigate('/'))
                            }
                        } else {
                            console.log("Payment Success");
                            setInfo({ ...info, success: res.success, loading: false })
                            let product_names = ""
                            products.forEach(product => {
                                product_names += product.name + ", "
                            })

                            const orderData = {
                                products: product_names,
                                transaction_id: res.transaction.id,
                                amount: res.transaction.amount
                            }

                            createOrder(userId, token, orderData).then(res => {
                                console.log(res);
                                if(res.error){
                                    if (res.code === '1') {
                                        logout(() => navigate('/'))
                                    }
                                }else{
                                    if(res.success===true){
                                        console.log("Order placed");
                                       
                                    }
                                }
                            }).catch(err => {
                                console.log(err);
                                console.log("Order failed");
                                setInfo({...info,loading:false,success:true})
                            })
                            cartEmpty(()=>{
                                console.log("Cart Emptied!!")
                            })
                            setReload(!reload)
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            }).catch(err => {
console.log(err)
            })
    }


    return (
        <div>
            <h3>Your bill is {getAmount(true)}</h3>
            {showbtnDropIn(handlePurchase)}
        </div>
    );
}

export default PaymentBraintree;