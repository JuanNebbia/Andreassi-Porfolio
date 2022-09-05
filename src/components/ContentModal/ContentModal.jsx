import React, { useEffect } from 'react'
import './ContentModal.css'
import { motion } from 'framer-motion'
import { IoIosClose } from 'react-icons/io';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import EditModal from '../EditModal/EditModal';
import { useState } from 'react';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

const ContentModal = () => {
  const [contentInfo, setContentInfo] = useState({})
  const {title, description, picUrl} = contentInfo
  const {section, contentId} = useParams()
  const {logged} = useContext(AuthContext)
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [newContent, setNewContent] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const db = getFirestore()
    const itemRef = doc(db, section, contentId)
    getDoc(itemRef)
      .then((snapshot) => {
        if(snapshot.exists()){
          const data = {id: snapshot.id, ...snapshot.data()}
          setContentInfo(data)
          setNewContent(data)
        }
      })
      .catch((err) => console.log(err))
      .finally(()=>setLoading(false))
    },[section, contentId])

  const closeModal = (event) =>{
    if (event.target.classList.contains('close')){
      navigate(`/${section}`)
    }
  }

  const handleOnChange = (event) =>{
    setNewContent({
      ...newContent, 
      [event.target.name]: event.target.value
    })
    console.log(newContent)
  } 

  const updateContent = (event) =>{
    event.preventDefault()
    const db = getFirestore()
    const docRef = doc(db, section, contentId)
    updateDoc(docRef, newContent)
    .then(docRef => {console.log(newContent)})
    .catch(error => {console.log(error)})
    .finally(()=>navigate(`/${section}`))
  }

  return (
    <>
    {loading ? <Loading /> :
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
            {logged && <EditModal editMode={editMode} setEditMode={setEditMode} contentInfo={contentInfo} />}
        </motion.div>
      </div>
    }
    
    </>
    
  )
}

export default ContentModal