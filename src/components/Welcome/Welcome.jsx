import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import profilePicture from '../../img/favicon.jpg'
import './Welcome.css'

const Welcome = () => {
    const {logged, setLogged} = useContext(AuthContext)
    
  return (
    <div className='welcome-container'>
        <div className="profile-picture-container">
          <img src={profilePicture} alt="mateo profile" className='profile-picture'/>
        </div>
        <h5 className='name-title'>Mateo Andreassi</h5>
        <p className='subtitle'>Portfolio</p>
        {logged && 
          <button onClick={()=>setLogged(false)} className='exit-btn'>
            Cerrar sesión
          </button>
        }
    </div>
  )
}

export default Welcome