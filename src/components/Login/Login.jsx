import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Login.css'
import ProfilePic from '../../img/mateo-profile.jpg'

const Login = () => {
  const {setLogged} = useContext(AuthContext)
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
      navigate('/')
  }else{
    alert('datos incorrectos')
  }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className='login-form-container'>
        <h2 className='login-title'>Iniciar Sesión</h2>
          <form action="" onSubmit={sendData} className='login-form'>
            <label htmlFor='email-input' className='form-label'>Mail</label>
            <input type="email" name='email' id='email-input' placeholder='email@example.com' onChange={userObject} />
            <label htmlFor='password-input' className='form-label'>Contraseña</label>
            <input type="password" name='password' id='password-input' placeholder='*******' onChange={userObject} />
            <button type='submit' className='login-btn enter-btn'>
                Entrar
            </button>
          </form>
          <button onClick={()=>setLogged(false)} className='login-btn logout-btn'>
                Cerrar sesión
          </button>
        </div>
        <div className="login-img-container">
          <img src={ProfilePic} alt="profile" className='login-img'/>
        </div>
      </div>
    </div>
  )
}

export default Login