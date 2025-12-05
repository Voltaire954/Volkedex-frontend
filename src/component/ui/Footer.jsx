import React from 'react'
import { TbPokeball } from "react-icons/tb";
import { GiSonicLightning } from "react-icons/gi";

function Footer() {
  return (

    <>
    <div className='footer'>

    <div className='pokeBall'><TbPokeball /></div>
    <div className='vlok'> VOLKEDEX

    <ul>
      <li>Tech-support</li>
      <li>Emergency-line</li>
      <li>Nursing-station</li>
    </ul>

    </div>

    <div className='logo'><GiSonicLightning /></div>
    </div>

    </>
  )
}

export default Footer
