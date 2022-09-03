import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

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
    <div onSubmit={sendData}>
      <form action="">
        <input type="email" placeholder='email' name='email' onChange={userObject} />
        <input type="password" placeholder='contraseña' name='password' onChange={userObject} />
        <button type='submit'>
            Entrar
        </button>
      </form>
      <button onClick={()=>setLogged(false)}>
            Salir
      </button>
      <button onClick={()=>navigate('/')}>
            Ir al porfolio
      </button>
      {logged ? 
        <h2 style={{color:'white'}}>Registrado</h2>
        : <h2 style={{color:'white'}}> NO registrado</h2>
      }
    </div>
  )
}

export default Login