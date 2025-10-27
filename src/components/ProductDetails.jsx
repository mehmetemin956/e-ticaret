import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setProductSelected, getAllProducts } from '../redux/slices/productSlice';
import { addToBasket } from '../redux/slices/basketSlice';
import '../css/ProductDetails.css';

function ProductDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { products, selectedProduct, loading } = useSelector((store) => store.product);
    const [count, setCount] = useState(1);

    //  Ürün sayısını ayarlayan fonksiyonlar
    const increment = () => setCount(prev => prev + 1);
    const decrement = () => setCount(prev => (prev > 1 ? prev - 1 : 1));

    //  Sepete ekleme
    const addBasket = () => {
        if (!selectedProduct) return;
        const payload = {
            id,
            price: selectedProduct.price,
            title: selectedProduct.title,
            description: selectedProduct.description,
            image: selectedProduct.image,
            count,
        };
        dispatch(addToBasket(payload));
    };

    //  Sayfa ilk yüklendiğinde ürünleri yükle (eğer boşsa)
    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProducts());
        }
    }, [dispatch, products]);

    //  Ürünleri yükledikten sonra seçili ürünü belirle
    useEffect(() => {
        if (products && products.length > 0) {
            const found = products.find(p => p.id == id);
            if (found) {
                dispatch(setProductSelected(found));
                localStorage.setItem("selectedProduct", JSON.stringify(found));
            }
        } else {
            // Eğer products hâlâ boşsa, localStorage'tan al
            const stored = localStorage.getItem("selectedProduct");
            if (stored) {
                dispatch(setProductSelected(JSON.parse(stored)));
            }
        }
    }, [products, id, dispatch]);

    //  LocalStorage güncel tut
    useEffect(() => {
        if (selectedProduct && selectedProduct.id) {
            localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
        }
    }, [selectedProduct]);

    //  Loading durumu
    if (loading || !selectedProduct || !selectedProduct.image) {
        return <p style={{ textAlign: "center", marginTop: "40px" }}>Ürün yükleniyor...</p>;
    }

    return (
        <div className="product-details-container">
            <img src={selectedProduct.image} alt={selectedProduct.title} className="product-details-image" />
            <div className="product-details-info">
                <h2 className="product-details-title">{selectedProduct.title}</h2>
                <p className="product-details-description">{selectedProduct.description}</p>
                <p className="product-details-price">{selectedProduct.price}₺</p>

                <div>
                    <button onClick={decrement} className="count-btn">-</button>
                    <span className="count">{count}</span>
                    <button onClick={increment} className="count-btn">+</button>
                </div>

                <button onClick={addBasket} className="buy-button">
                    Sepete Ekle
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;