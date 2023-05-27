import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer-outer-container'>
      <div className='footer-container'>
          <div className="link-container">
              <h6 className='footer-title'>LinkedIn</h6>
              <a href="https://www.linkedin.com/in/mateo-andreassi-172507170/" target='!BLANK' className="net-link">/mateoandreassi</a>
          </div>
          <div className="link-container">
              <h6 className='footer-title'>Instagram</h6>
              <a href="https://www.instagram.com/mateoandreassi/" target='!BLANK' className="net-link">/mateoandreassi</a>
          </div>
          <div className="link-container">
              <h6 className='footer-title'>Contacto</h6>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=andreassimate@gmail.com" target='!BLANK' className="net-link">andreassimate@gmail.com</a>
              <a href="https://wa.me/543517713517?text=Hola%20Mateo,%20he%20visitado%20tu%20porfolio%20y%20me%20encanta%20tu%20trabajo!" target='!BLANK' className="net-link">3517713517</a>
          </div>
      </div>
      <small className='dev-link'>Desarrollado por <a href="https://www.linkedin.com/in/juan-nebbia/" target='blank'>Juan Nebbia</a></small>
    </div>
  )
}

export default Footer