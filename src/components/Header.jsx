import React, { useState } from 'react';
import '../css/Header.css';
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import BasketDrawer from './BasketDrawer';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredProducts } from '../redux/slices/productSlice';

function Header() {
    const [theme, setTheme] = useState(true);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);

    const themeChange = () => {
        const body = document.body;
        body.classList.toggle("light-mode");
        setTheme(!theme);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);

        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );

        dispatch(setFilteredProducts(filtered));
    };

    return (
        <div className="header-container">
            <div className='flex-row'>
                <img onClick={() => navigate("/")} className='logo' src="/src/images/logo-7.png" alt="Logo" />
                <p className='logo-text'>MEMO A.Ş</p>
            </div>

            <div className='flex-row'>
                <input
                    className='search-input'
                    type="text"
                    placeholder='Search here'
                    value={searchText}
                    onChange={handleSearch}
                />

                <div className='flex-row'>
                    {theme ? <FaMoon className='icon' onClick={themeChange} /> : <CiLight className='icon' onClick={themeChange} />}
                    <BasketDrawer />
                </div>
            </div>
        </div>
    );
}

export default Header;
