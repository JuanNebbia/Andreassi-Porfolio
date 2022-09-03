import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Login.css'

const Login = () => {
  const {logged, setLogged} = useContext(AuthContext)
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  const userObject = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
  }

  const sendData = (event) =>{
    event.preventDefault()
    if (userData.email === 'juan.nebbia@gmail.com' && userData.password === '123456'){
      setLogged(true)
  }else{
    alert('datos incorrectos')
  }
  }

  return (
    <div className="login-container">
      <h2 className='login-title'>Iniciar Sesión</h2>
      <div className='login-form-container'>
        <form action="" onSubmit={sendData} className='login-form'>
          <label for='email-input' className='form-label'>Email</label>
          <input type="email" name='email' id='email-input' onChange={userObject} />
          <label for='password-input' className='form-label'>Contraseña</label>
          <input type="password" name='password' id='password-input' onChange={userObject} />
          <button type='submit' className='login-btn enter-btn'>
              Entrar
          </button>
        </form>
        <button onClick={()=>setLogged(false)} className='login-btn logout-btn'>
              Salir
        </button>
        <button onClick={()=>navigate('/')} className='login-btn to-main-btn'>
              Ir al porfolio
        </button>
        {logged ? 
          <h2 style={{color:'white'}}>Registrado</h2>
          : <h2 style={{color:'white'}}> NO registrado</h2>
        }
      </div>
    </div>
  )
}

export default Login