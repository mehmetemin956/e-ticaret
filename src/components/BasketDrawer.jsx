import React, { useState } from 'react';
import { Drawer, Button, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { CiShoppingBasket } from "react-icons/ci";
import { addToBasket } from '../redux/slices/basketSlice';
import '../css/BasketDrawer.css';

function BasketDrawer() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const basket = useSelector((store) => store.basket?.products ?? []);

    // Toplam fiyat hesaplama
    const totalPrice = basket.reduce((acc, item) => {
        const price = parseFloat(item.price) || 0;
        const count = parseInt(item.count) || 0;
        return acc + price * count;
    }, 0);

    // Adet artır
    const increment = (item) => {
        dispatch(addToBasket({ ...item, count: 1 }));
    };

    // Adet azalt
    const decrement = (item) => {
        if (item.count > 1) {
            dispatch(addToBasket({ ...item, count: -1 }));
        }
    };

    // Ürünü sil
    const removeItem = (item) => {
        const updated = basket.filter((p) => p.id !== item.id);
        localStorage.setItem('basket', JSON.stringify(updated));
        window.location.reload(); // basit senkronizasyon için, daha iyisi Redux dispatch ile yapılabilir
    };

    return (
        <>
            {/* Sepet ikonu */}
            <IconButton onClick={() => setOpen(true)} className="basket-icon-btn">
                <CiShoppingBasket size={28} />
                {basket.length > 0 && (
                    <span className="basket-badge">{basket.length}</span>
                )}
            </IconButton>

            {/* Drawer */}
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <div className="drawer-container">
                    <h2>🛒 Sepetim</h2>
                    {basket.length === 0 ? (
                        <p>Sepetiniz boş</p>
                    ) : (
                        basket.map((item, index) => (
                            <div key={index} className="basket-item">
                                <img src={item.image} alt={item.title} className="basket-img" />
                                <div className="basket-info">
                                    <p className="basket-title">{item.title}</p>
                                    <p className="basket-price">{item.price}₺</p>
                                    <div className="basket-count-controls">
                                        <button onClick={() => decrement(item)}>-</button>
                                        <span>{item.count}</span>
                                        <button onClick={() => increment(item)}>+</button>
                                    </div>
                                    <button onClick={() => removeItem(item)} className="remove-btn">
                                        Sil
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                    <h3 className="basket-total">Toplam: {totalPrice.toFixed(2)}₺</h3>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "100%", marginTop: "10px" }}
                    >
                        Satın Al
                    </Button>
                </div>
            </Drawer>
        </>
    );
}

export default BasketDrawer;
