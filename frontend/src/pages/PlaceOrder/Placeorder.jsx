import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { MarketContext } from '../../Context/MarketContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Placeorder = () => {

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
})

const { getTotalCartAmount, token, item_list, cartItems, url, setCartItems } = useContext(MarketContext);

const navigate = useNavigate();

const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
}

const placeOrder = async (e) => {
    e.preventDefault()
    let orderItems = [];
    item_list.map(((item) => {
        if (cartItems[item._id] > 0) {
            let itemInfo = item;
            itemInfo["quantity"] = cartItems[item._id];
            orderItems.push(itemInfo)
        }
    }))
    let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount(),
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
    }
    else {
        toast.error("Something Went Wrong")
    }
}

useEffect(() => {
    if (!token) {
        toast.error("to place an order sign in first")
        navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
        navigate('/cart')
    }
}, [token])


return (
  <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
          <p className='title'>Student Information</p>
          <div className="multi-field">
              <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
              <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
          </div>
          <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' required />
          <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
      </div>
      <div className="place-order-right">
          <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                  <div className="cart-total-details"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
                  <hr />
                  <div className="cart-total-details"><b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}</b></div>
              </div>
          </div>
          <button className='place-order-submit' type='submit'>Proceed To Payment</button>
      </div>
  </form>
)
}

export default Placeorder
