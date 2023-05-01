import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { SlCheck } from 'react-icons/sl';
import { SlClose } from 'react-icons/sl';
import './Login.css'
import ProfilePic from '../../img/mateo-profile.jpg'

const Login = () => {
  const {setLogged} = useContext(AuthContext)
  const [userData, setUserData] = useState({})
  const [wrongData, setWrongData] = useState(false)
  const navigate = useNavigate()
  const {logged} = useContext(AuthContext)


  useEffect(()=>{
  })

  const userObject = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
  }

  const sendData = (event) =>{
    event.preventDefault()
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL
    const adminPass = process.env.REACT_APP_ADMIN_PASS
    if (userData.email === adminEmail && userData.password === adminPass){
      setLogged(true)
      setWrongData(false)
    }else{
      setWrongData(true)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className='login-form-container'>
        <h2 className='login-title'>Iniciar Sesión</h2>
          <form action="" onSubmit={sendData} className='login-form'>
            <label htmlFor='email-input' className='form-label'>Mail</label>
            <input type="email" name='email' id='email-input' placeholder='email@example.com' onChange={userObject} disabled={logged} />
            <label htmlFor='password-input' className='form-label'>Contraseña</label>
            <input type="password" name='password' id='password-input' placeholder='*******' onChange={userObject} disabled={logged} />
            {logged && 
            <div>
              <div className='registered-tag'>
                <SlCheck />
                <p >Estás registrado</p>
              </div>
              <button type='submit' className='login-btn enter-btn' onClick={()=> navigate('/')}>
                Ver Porfolio
              </button>
            </div>
            }
            {wrongData && 
              <div className='wrong-tag'>
                <SlClose />
                <p >Datos Incorrectos</p>
              </div>
            }
            {!logged &&
              <button type='submit' className='login-btn enter-btn'>
                Entrar
              </button>
            }
          </form>
        </div>
        <div className="login-img-container">
          <img src={ProfilePic} alt="profile" className='login-img'/>
        </div>
      </div>
    </div>
  )
}

export default Login