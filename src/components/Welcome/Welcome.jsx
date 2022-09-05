import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Welcome.css'

const Welcome = () => {
    const {setLogged} = useContext(AuthContext)
    
  return (
    <div className='welcome-container'>
        <h4 className='welcome-title'>¡Hola de nuevo Mateo! {'<3'}</h4>
        <button onClick={()=>setLogged(false)} className='exit-btn'>
            Cerrar sesión
        </button>
    </div>
  )
}

export default Welcome