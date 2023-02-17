import React from 'react';

function ImageHelper({product}) {
    const imageUrl = product && product.image ? product.image : "./produc.jpg";
    return (
        <div className='rounded border border-success p-2'>
            <img src={imageUrl} alt="" style={{maxHeight:"100%", maxWidth:"100%"}} className="mb-3 rounded"/>
        </div>
    );
}

export default ImageHelper;