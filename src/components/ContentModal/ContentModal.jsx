import React from 'react'
import './ContentModal.css'
import { motion } from 'framer-motion'
import { IoIosClose } from 'react-icons/io';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import EditModal from '../EditModal/EditModal';
import { useState } from 'react';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const ContentModal = ({display, setDisplay}) => {
  const {title, description, picUrl} = display
  const {section} = useParams()
  const {logged} = useContext(AuthContext)
  const [editMode, setEditMode] = useState(false)
  const [newContent, setNewContent] = useState({title: title, description: description, picUrl: picUrl})

  const closeModal = (event) =>{
    if (event.target.classList.contains('close')){
      setDisplay({})
    }
  }

  const handleOnChange = (event) =>{
    setNewContent({
      ...newContent, 
      [event.target.name]: event.target.value
    })
  } 

  const updateContent = (event) =>{
    event.preventDefault()
    const db = getFirestore()
    const docRef = doc(db, section, display.id)
    updateDoc(docRef, newContent)
    .then(docRef => {console.log(newContent)})
    .catch(error => {console.log(error)})
    .finally(()=>setEditMode(false))
  }

  return (
    <div className='modal-container close' onClick={closeModal}>
      <motion.div className="modal-card-container" 
          initial={{y: '-100vh'}}
          animate={{y: 0}}>
        <img 
          src={picUrl} 
          alt="" 
          className={description || logged? 'modal-img' : 'modal-img-only'}
          />
          { description &&
            <div className="modal-text-container">
              <button className='modal-close-btn close' onClick={closeModal}>
                <IoIosClose className='modal-close-icon close'/>
              </button>
                {editMode ? 
                <div className="item-info-container">
                  <h6 className='edit-mode-alert'>MODO DE EDICIÓN</h6>
                  <form action="" className='edit-item-form' onSubmit={updateContent}>
                    <label htmlFor='edit-title-input' className='edit-input-label'>Titulo</label>
                    <input 
                      type='text' 
                      defaultValue={title} 
                      id="edit-title-input" 
                      name='title'
                      onChange={handleOnChange} />
                    <label htmlFor='edit-description-input' className='edit-input-label'>Descripción</label>
                    <textarea 
                      type='text' 
                      defaultValue={description} 
                      id="edit-description-input" 
                      name='description'
                      onChange={handleOnChange} />
                    <label htmlFor='edit-img-input' className='edit-input-label'>Link a la imagen</label>
                    <input 
                      type='text' 
                      defaultValue={picUrl} 
                      id="edit-img-input" 
                      name='picUrl'
                      onChange={handleOnChange} />
                    <button type='submit' className='edit-submit'>Guardar Cambios</button>
                  </form>
                </div>:
                  <div className="item-info-container">
                    <h5 className='modal-title'> {title} </h5>
                    <p className='modal-text'> {description} </p>
                  </div>
                }
            </div>
          }
          {logged && <EditModal display={display} setDisplay={setDisplay} editMode={editMode} setEditMode={setEditMode} />}
      </motion.div>
    </div>
  )
}

export default ContentModal