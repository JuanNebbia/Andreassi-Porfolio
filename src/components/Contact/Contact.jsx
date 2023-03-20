import { addDoc, collection, getFirestore } from 'firebase/firestore'
import React, { useRef } from 'react'
import './Contact.css'

const Contact = () => {
  const messageArea = useRef()
  const messageSubject = useRef('')

  const sendMessage = (event) =>{
    event.preventDefault()
    const db = getFirestore()
    const collectionRef = collection(db, 'messages')
    const newMessage = {
      date: new Date(),
      message: messageArea.current.value,
      subject: messageSubject.current.value,
      hidden: false
    }
    messageArea.current.value = ''
    messageSubject.current.value = ''
    addDoc(collectionRef, newMessage)
    .catch(error => {console.log(error)})
    .finally()
  }

  return (
    <div className="contact-container">
      <div className="contact">
        <form action="" onSubmit={(event)=>sendMessage(event)}>
          <input type="text" placeholder='Asunto' ref={messageSubject} className='subject-mail'/>
          <textarea name="message" id="" cols="30" rows="10" className='text-area-mail' placeholder='Había una vez...' ref={messageArea}></textarea>
          <button className='send-msg-btn' type='submit'>Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default Contact