import React, {useState, useEffect, useContext} from 'react'
import { MarketContext } from '../../Context/MarketContext'
import { assets } from '../../assets/assets'
import './MarketItem.css'

const MarketItem = ({id, name, price, description, image}) => {

  const [itemCount, setItemCount] = useState(0);
const {cartItems, addToCart, removeFromCart, url} = useContext(MarketContext);


  return (
      <div className="market-item">
        <div className="market-item-img-container">
            <img className='market-item-image' src={url + '/images/' +image} alt="" />
            {!cartItems[id]
                ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                : <div className='market-item-counter'>
                    <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={() => addToCart([id])} src={assets.add_icon_green} alt="" />
                  </div>
            }
        </div>
        <div className="market-item-info">
            <div className="market-item-name">
                <p>{name}</p>
            </div>
            <p className='market-item-desc'>{description}</p>
            <p className='market-item-price'>${price}</p>   
        </div>
      </div>
  )
}

export default MarketItem
