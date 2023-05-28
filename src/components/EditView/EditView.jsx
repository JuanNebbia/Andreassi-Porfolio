import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './EditView.css'

const EditView = ({contentInfo,updateLocalContent}) => {
  const {title, description, picUrl, videoUrl, posterUrl, hidden, order} = contentInfo
  const [updatedContent, setUpdatedContent] = useState({})
  const {section} = useParams()
  const navigate = useNavigate()

  const updateContent = (event) =>{
      event.preventDefault()
      updateLocalContent({...contentInfo, ...updatedContent,})
      const db = getFirestore()
      const docRef = doc(db, section, contentInfo.id)
      updateDoc(docRef, updatedContent)
      .catch(error => {console.log(error)})
      .finally(()=>navigate(`/${section}`))
  }
    
  const handleOnChange = (event) =>{
    if(event.target.name === 'order'){
      return setUpdatedContent({
        ...updatedContent, 
        [event.target.name]: +event.target.value
      })
    }
    setUpdatedContent({
      ...updatedContent, 
      [event.target.name]: event.target.value
    })
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
            <label htmlFor='edit-order-input' className='edit-input-label'>N° de orden</label>
            <input 
              type='number' 
              defaultValue={order} 
              id="edit-order-input" 
              name='order'
              onChange={handleOnChange} />
          {section === 'video' || section === 'animation' ? 
            <>
              <label htmlFor='edit-video-input' className='edit-input-label'>Link al video</label>
              <input 
                type='text' 
                defaultValue={videoUrl} 
                id="edit-video-input" 
                name='videoUrl'
                onChange={handleOnChange}
                required />
              <label htmlFor='edit-poster-input' className='edit-input-label'>Link a la miniatura</label>
              <input 
                type='text' 
                defaultValue={posterUrl} 
                id="edit-poster-input" 
                name='posterUrl'
                onChange={handleOnChange}
                required />
            </>:
            <>
              <label htmlFor='edit-img-input' className='edit-input-label'>Link a la imagen</label>
              <input 
                type='text' 
                defaultValue={picUrl} 
                id="edit-img-input" 
                name='picUrl'
                onChange={handleOnChange}
                required />
            </>
          }
            <p className='hidden-show-text'>
              {hidden?'Este contenido se encuentra oculto':'Este contenido se encuentra visible'}
            </p>: 
          <button type='submit' className='edit-submit'>Guardar Cambios</button>
        </form>
      </div>
    </div>
  )
}

export default EditView