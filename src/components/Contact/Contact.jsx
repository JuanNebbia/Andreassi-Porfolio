import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact">
        <textarea name="" id="" cols="30" rows="10" className='text-area-mail'></textarea>
        <button className='send-msg-btn'>Envidiar</button>
      </div>
    </div>
  )
}

export default Contact