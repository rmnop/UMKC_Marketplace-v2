import React from 'react'
import { createContext, useState, useEffect } from 'react';
import { item_list, menu_list } from '../assets/assets';
import axios from "axios";

export const MarketContext = createContext(null);

const MarketContextProvider = (props) => {
    
    const url = "http://localhost:4000"
    const [cartItems, setCartItems] = useState({});
    const [item_list, setItemList] = useState([]);
    const [token, setToken] = useState("")

    const addToCart = (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems((prev)=>({...prev, [itemId]:1}))
        } else {
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) =>({...prev, [itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                //totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchItemList = async () => {
        const response = await axios.get(url + "/api/item/list");
        setItemList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchItemList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData({ token: localStorage.getItem("token") })
            }
        }
        loadData()
    }, [])

   const contextValue = {
        url,
        item_list,
        menu_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData
    };
    

    return (
        <MarketContext.Provider value={contextValue}>
            {props.children}
        </MarketContext.Provider>
    )
}

export default MarketContextProvider;
