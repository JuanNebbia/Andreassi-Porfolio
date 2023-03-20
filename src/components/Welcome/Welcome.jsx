import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import profilePicture from '../../img/favicon.jpg'
import './Welcome.css'

const Welcome = ({ parent }) => {
    const {logged, setLogged} = useContext(AuthContext)
    const navigate = useNavigate()
    
  return (
    <div className='welcome-container'>
        <div className="profile-picture-container">
          <img src={profilePicture} alt="mateo profile" className='profile-picture'/>
        </div>
        <h5 className='name-title'>Mateo Andreassi</h5>
        <p className='subtitle'>Portfolio</p>
        {logged && 
          <div>
            {parent === 'main' &&
              <button onClick={()=>navigate('/messages')} className='messages-btn'>Mensajes</button>
            }
            {parent === 'inbox' &&
              <button onClick={()=>navigate('/')} className='messages-btn'>Inicio</button>
            }
            <button onClick={()=>setLogged(false)} className='exit-btn'>
              Cerrar sesión
            </button>
          </div>
        }
    </div>
  )
}

export default Welcome