import { addDoc, collection, getFirestore } from 'firebase/firestore'
import React, { useRef } from 'react'
import './Contact.css'

const Contact = () => {
  const messageArea = useRef()

  const sendMessage = () =>{
    const db = getFirestore()
    const collectionRef = collection(db, 'messages')
    const newMessage = {
      date: new Date(),
      message: messageArea.current.value
    }
    messageArea.current.value = ''
    addDoc(collectionRef, newMessage)
    .catch(error => {console.log(error)})
    .finally()
  }

  return (
    <div className="contact-container">
      <div className="contact">
        <textarea name="" id="" cols="30" rows="10" className='text-area-mail' ref={messageArea}></textarea>
        <button className='send-msg-btn' onClick={()=>sendMessage()}>Enviar</button>
      </div>
    </div>
  )
}

export default Contact