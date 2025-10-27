import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlice';
import Product from './Product';

function ProductList() {
    const dispatch = useDispatch();
    const { filteredProducts, products, loading } = useSelector((store) => store.product);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    // Eğer filteredProducts yoksa tüm ürünleri göster
    const productsToShow = filteredProducts && filteredProducts.length > 0 ? filteredProducts : products;

    if (loading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Ürünler yükleniyor...</p>;
    if (!productsToShow || productsToShow.length === 0) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Ürün bulunamadı</p>;

    return (
        <div className='flex-row' style={{ flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {productsToShow.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;
