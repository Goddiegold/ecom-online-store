import React from 'react';
import Base from './Base'

const LoadAllProducts = () => {
    return (
        <div>
            <h1>Products</h1>
        </div>
    )
}


const LoadCheckout = () => {
    return (
        <div>
            <h1>Checkout</h1>
        </div>
    )
}

function Cart(props) {

   

    return (
        <Base title='Cart Page' description='welcome to checkout'>
            <div className='row text-center'>
                <div className='col-6'>
                    <LoadAllProducts/>
                </div>
                <div className='col-6'>
                    <LoadCheckout/>
                </div>
            </div>
        </Base>
    );
}

export default Cart;