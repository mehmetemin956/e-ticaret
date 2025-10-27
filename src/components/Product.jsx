import React from 'react'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
    const { id, price, title, description, image } = product;

    const navigate = useNavigate();

    return (
        <div className='card'>
            <img className='image' src={image} />
            <div>
                <p className='product-title'>{title}</p>
                <h4 className='product-price'>{price}₺</h4>
            </div>

            <div className='flex-row'>
                <button onClick={() => navigate("/product-details/" + id)} className='card-button'><strong>Detayına Git</strong></button>
            </div>
        </div>
    )
}

export default Product