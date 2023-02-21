import React, { useState } from 'react';
import ImageHelper from "./helper/imageHelper";
import { useNavigate } from "react-router-dom"
import { addItemToCart,removeItemFromCart } from './helper/cartHelper';
import {isAuthenticated} from "../auth/helper/index"

function Card({
    product,
    addToCart = true,
    removeFromCart = false 
}) {

    const [redirect,setRedirect] = useState(false)
    const authenticated = isAuthenticated()

    const navigate = useNavigate()

    const handleAddToCart = () => {
        if (authenticated) {
            addItemToCart(product, ()=>setRedirect(true))
            console.log("Added to cart");
        } else {
            // redirectUser(redirect)
            console.log("Login Please!!!")
        }
    }

    const redirectUser = (redirect) => {
        if (redirect) {
            return navigate('/cart')
        }
    }


    const showAddToCart = addToCart => {
        if (addToCart) return (<button
            onClick={handleAddToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
        >
            Add to cart
        </button>)
    }


    const showRemoveFromCart = removeFromCart => {
        if (removeFromCart) return (<button
         className="btn btn-block btn-outline-danger mt-2 mb-2"
         onClick={()=>removeItemFromCart(product.id)}
         >
            Remove from cart
        </button>)
    }
    return (
        <div className='card text-white bg-dark border border-info'>
            <div className="card-header lead">
                {product.name}
            </div>

            <div className="card-body">
            {redirectUser(redirect)}
                {/* <div className="rounded border border-success p-2">
                    <img src={product.image} alt="" style={{ maxHeight: "100%", maxWidth: "100%" }} className="mb-3 rounded" />
                </div> */}
                <ImageHelper product={product} />
                <p className='lead bg-success font-weight-normal text-wrap'>
                    {product.description}
                </p>
                <p className='btn btn-success rounded btn-sm px-4'>$ {product.price}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Card; 
