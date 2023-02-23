import React, { useEffect, useState } from 'react';
import Base from './Base'
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import PaymentBraintree from './PaymentBraintree';

const LoadAllProducts = ({ products, reload, setReload }) => {
    return (
        <div>
            <h1>Products</h1>
            {products.map(product => (
                <Card
                    product={product}
                    removeFromCart={true}
                    addToCart={false}
                    reload={reload}
                    setReload={setReload}
                />
            ))}
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
    const [reload, setReload] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    return (
        <Base title='Cart Page' description='welcome to checkout'>
            <div className='row text-center'>
                <div className='col-6'>
                    <LoadAllProducts products={products}
                        reload={reload}
                        setReload={setReload}
                    />
                </div>
                <div className='col-6'>
                    {/* <LoadCheckout /> */}
                    <PaymentBraintree products={products} reload={reload} setReload={setReload}/>
                </div>
            </div>
        </Base>
    );
}

export default Cart;