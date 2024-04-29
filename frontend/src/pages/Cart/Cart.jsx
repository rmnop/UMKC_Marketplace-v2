import React, {useContext} from 'react'
import './Cart.css'
import { MarketContext } from '../../Context/MarketContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const {cartItems, food_list, removeFromCart, getTotalCartAmount} = useContext(MarketContext);

    const navigate = useNavigate();
 

  return (
      <div className="cart">
        <div className="cart-items">
            <div className="cart-items-title">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <br />
            < hr />
            {food_list.map((item, index)=>{
                if(cartItems[item._id] > 0) {
                    return (
                        <div>
                        <div className="cart-items-title cart-items-item">
                            <img src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                            <p>{cartItems[item._id]}</p>
                            <p>${item.price * cartItems[item._id]}</p>
                            <p onClick={() => removeFromCart(item._id)} className='cross'>*</p>
                        </div>
                        <hr />
                        </div>
                    )
                }
            })}
        </div>
        <div className="cart-bottom">
            <div className="cart-total">
                <h2>Cart Total</h2>
                <div>
                <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${getTotalCartAmount()}</b>
                    </div>
                </div>
                <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
            </div>
        </div>
      </div>
  )
}

export default Cart


