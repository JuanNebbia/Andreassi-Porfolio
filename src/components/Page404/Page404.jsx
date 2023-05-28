import React from 'react'
import './Page404.css'
import {Link} from 'react-router-dom'

const Page404 = () => {
  return (
    <div className='notfound-container'>
        <p className='notfound-msg'>Ups, nada por aquí :(</p>
        <button className='notfound-btn'><Link to='/'>Volver al inicio</Link> </button>
    </div>
  )
}

export default Page404