import React, { useContext } from 'react'
import './ItemDisplay.css'
import { MarketContext } from '../../Context/MarketContext'
import MarketItem from '../MarketItem/MarketItem'

const ItemDisplay = ({category}) => {

    const {item_list} = useContext(MarketContext);

  return (
    <div className='market-display' id='market-display'>
      <h2>Top Items Near You</h2>
      <div className="market-display-list">
        {item_list.map((item) => {
            if(category === "All" || category === item.category) {
              return <MarketItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/>
            }
        })}
      </div>
    </div>
  )
}

export default ItemDisplay
