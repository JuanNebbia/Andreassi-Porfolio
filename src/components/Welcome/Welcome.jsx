import React from 'react'
import { useNavigate } from 'react-router-dom'
import profilePicture from '../../img/favicon.jpeg'
import './Welcome.css'
import { getAuth, signOut } from 'firebase/auth'
import { useUser } from 'reactfire'

const Welcome = ({ parent }) => {
  const { status, data: user } = useUser();
    const navigate = useNavigate()

    
  const auth = getAuth()
    
  const logout = async () =>{
    await signOut(auth)
  } 
    
  return (
    <div className='welcome-container'>
      <a href="/" className='home-link'>
        <div className="profile-picture-container">
          <img src={profilePicture} alt="mateo profile" className='profile-picture'/>
        </div>
        <h5 className='name-title'>Mateo Andreassi</h5>
      </a>
      { !user && <p className='subtitle'>Portfolio</p> }
        {user && 
          <div className="welcome-button-container">
            {parent === 'main' &&
              <button onClick={()=>navigate('/messages')} className='messages-btn'>Mensajes</button>
            }
            {parent === 'inbox' &&
              <button onClick={()=>navigate('/')} className='messages-btn'>Inicio</button>
            }
            <button onClick={logout} className='exit-btn'>
              Cerrar sesión
            </button>
          </div>
        }
    </div>
  )
}

export default Welcome