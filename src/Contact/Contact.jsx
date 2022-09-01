import React from 'react'
import './Contact.css'
import { GrInstagram, GrFacebookOption } from 'react-icons/gr'
import { GiSoccerBall } from 'react-icons/gi'

const Contact = () => {

  return (
    <div className='contact-container'>
        <div className="contact-btn-container">
            <a className='floating-icon-a' href='https://www.instagram.com/mateoandreassi/' target='!BLANK'>
                <GrInstagram className='floating-icon' />
            </a>
            <a className='floating-icon-a' href='https://www.facebook.com/mafandre' target='!BLANK'>
                <GrFacebookOption className='floating-icon' />
            </a>
            <a className='floating-icon-a' href='https://www.google.com/search?q=messi&rlz=1C1CHBD_esAR964AR964&sxsrf=ALiCzsaM-5KGeisZLlbjb1P5SbNOG1HGIA:1661394227960&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjW5afm9-D5AhXVQ7gEHYKJBoYQ_AUoAXoECAIQAw&biw=1366&bih=635&dpr=1#imgrc=baTTHQUMt2oN3M' target='!BLANK'>
                <GiSoccerBall className='floating-icon football-floating-icon' />
            </a>
        </div>
    </div>
  )
}

export default Contact