import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div>
      <div className='header'>
        <div className='header-contents'>
            <h2 className='alignleft'>Buy or Sell.</h2>
            <h2 className='alignright'>Your Choice.</h2>
            <p>Redefining the way students can buy and sell locally.</p>
            <button>View what students are selling</button>
        </div>
      </div>
    </div>
  )
}

export default Header
