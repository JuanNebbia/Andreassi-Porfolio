import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SlCheck } from 'react-icons/sl';
import { SlClose } from 'react-icons/sl';
import './Login.css'
import ProfilePic from '../../img/mateo-profile.jpg'
import { GoogleAuthProvider, browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useAuth, useFirebaseApp, useUser } from 'reactfire'

const Login = () => {
  const [userData, setUserData] = useState({})
  const [wrongData, setWrongData] = useState(false)
  const navigate = useNavigate()
  
  //Firebase auth
  const auth = useAuth()
  const firebase = useFirebaseApp()
  const { status, data: user } = useUser();


  const userObject = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
  }

  const sendData = async (event) =>{
    event.preventDefault()
    try {
      await setPersistence(auth, browserSessionPersistence)
      await signInWithEmailAndPassword(auth, userData.email, userData.password)
      setWrongData(false)
    } catch (error) {
      setWrongData(true)
      console.log(error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className='login-form-container'>
        <h2 className='login-title'>Iniciar Sesión</h2>
          <form action="" onSubmit={sendData} className='login-form'>
            <label htmlFor='email-input' className='form-label'>Mail</label>
            <input type="email" name='email' id='email-input' placeholder='email@example.com' onChange={userObject} disabled={user} />
            <label htmlFor='password-input' className='form-label'>Contraseña</label>
            <input type="password" name='password' id='password-input' placeholder='*******' onChange={userObject} disabled={user} />
            {user && 
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
            {!user &&
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