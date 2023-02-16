import React, { useState, useEffect } from 'react';
import { getProducts } from './helper/core_api_calls';

function Home(props) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts().then(res => {
            console.log(res)
            setProducts(res)
        }).catch(err =>{
             console.log(err.message)
                })
    }


    useEffect(() => {
     loadAllProducts()
    }, [])

    return (
        <>
            <h1>Home</h1>
            <div className='row'>
            {products.map(product => (
                <div key={product.id}>
                <h1>{product.name}</h1>
                </div>
            ))
            }
            </div>
        </>
    );
}

export default Home;