import React from 'react'
import {Link} from "react-router-dom"

function Header() {
  return (<>
    <div className='header'>
      <Link to="/" className='home-header'>HOME</Link>
      <Link to="/game" className='game-header' >GAME</Link>
    </div>
  </>
  )
}

export default Header
