import React from 'react'
import './Footer.css'
import { GrInstagram, GrFacebookOption } from 'react-icons/gr'
import { GiSoccerBall } from 'react-icons/gi'

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className="link-container">
            <GrInstagram className='net-icon'/>
            <a href="https://www.instagram.com/mateoandreassi/" target='!BLANK' className="net-link">/mateoandreassi</a>
        </div>
        <div className="link-container">
            <GrFacebookOption className='net-icon' />
            <a href="https://www.facebook.com/mafandre" target='!BLANK' className="net-link">/mafandre</a>
        </div>
        <div className="link-container">
            <GiSoccerBall className='net-icon' />
            <a href="https://www.google.com/search?q=messi&rlz=1C1CHBD_esAR964AR964&sxsrf=ALiCzsaM-5KGeisZLlbjb1P5SbNOG1HGIA:1661394227960&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjW5afm9-D5AhXVQ7gEHYKJBoYQ_AUoAXoECAIQAw&biw=1366&bih=635&dpr=1#imgrc=baTTHQUMt2oN3M" target='!BLANK' className="net-link">Messi</a>
        </div>
    </div>
  )
}

export default Footer