import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './EditView.css'

const EditView = ({contentInfo}) => {
    const {title, description, picUrl, hidden} = contentInfo
    const [newContent, setNewContent] = useState({})
    const {section, contentId} = useParams()
    const navigate = useNavigate()

    const updateContent = (event) =>{
        event.preventDefault()
        const db = getFirestore()
        const docRef = doc(db, section, contentId)
        updateDoc(docRef, newContent)
        .catch(error => {console.log(error)})
        .finally(()=>navigate(`/${section}`))
    }
    
  const handleOnChange = (event) =>{
    setNewContent({
      ...newContent, 
      [event.target.name]: event.target.value
    })
  }

  const hideContent = () =>{
    if(hidden){
      setNewContent({
        ...newContent, 
        hidden: false
      })
    }else{setNewContent({
      ...newContent, 
      hidden: true
    })

    }
  }

  return (
    <div className="edit-modal-text-container">
      <div className="edit-item-info-container">
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
            onChange={handleOnChange}
            required />
          {hidden?
          <div className="show-btn-container">
            <p className='hidden-show-text'>Este contenido se encuentra oculto</p>
            <button onClick={hideContent} className="show-content-btn">Mostrar</button>
          </div>:
          <div className="show-btn-container">
            <p className='hidden-show-text' >Este contenido se encuentra visible</p>
            <button onClick={hideContent} className="hide-content-btn">Ocultar</button>
          </div>
          }
          <button type='submit' className='edit-submit'>Guardar Cambios</button>
        </form>
      </div>
    </div>
  )
}

export default EditView