import { addDoc, collection, getFirestore } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { SlCheck } from 'react-icons/sl';
import './Contact.css'

const Contact = () => {
  const [show, setShow] = useState(false);
  const sendButton = useRef(null);
  const messageArea = useRef()
  const messageSubject = useRef()

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
    .then(()=>setShow(true))
    .then(()=>setTimeout(()=>setShow(false), 3000))
    .catch(error => {console.log(error)})
    .finally()
  }

  const enableButton = () =>{
    if(messageArea.current.value && messageSubject.current.value){
      sendButton.current.disabled = false
    }else{
      sendButton.current.disabled = true
    }
  }

  return (
    <div className="contact-container">
      <p className='leave-a-msg-tag'>¿Llegaste hasta acá? Dejame un mensaje</p>
      <div className="contact">
        <form action="" onSubmit={(event)=>sendMessage(event)}>
          <input 
            type="text" 
            className='subject-mail' 
            placeholder='Nombre / Email' 
            ref={messageSubject} 
            onChange={enableButton} 
            required 
          />
          <textarea 
            className='text-area-mail' 
            placeholder='Había una vez...' 
            name="message"  
            cols="30" 
            rows="10" 
            ref={messageArea} 
            onChange={enableButton}
            required 
          >
          </textarea>
          <button className='send-msg-btn' type='submit' ref={sendButton} disabled>Enviar</button>
          <Overlay target={sendButton.current} show={show} placement="left">
            {(props) => (
              <Tooltip id="tooltip" {...props} className='custom-tooltip'>
                <p className='tooltip-text'>Enviado</p>
                <SlCheck />
              </Tooltip>
            )}
          </Overlay>
        </form>
      </div>
    </div>
  )
}

export default Contact