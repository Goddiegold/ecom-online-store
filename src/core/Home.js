import React, { useState, useEffect } from 'react';
import Base from './Base';
import Card from './Card';
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
        <Base title='Home Page' description='Welcome to Store'>
            <h1>Home</h1>
            <div className='row'>
            {products.map(product => (
                <div key={product.id} className="col-4 mb-4">
              <Card product={product}/>
                </div>
            ))
            }
            </div>
        </Base>
    );
}

export default Home;