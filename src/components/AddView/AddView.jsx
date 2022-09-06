import { addDoc, collection, getFirestore } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './AddView.css'

const AddView = ({setAddItem}) => {
    const [newContent, setNewContent] = useState({})
    const {section} = useParams()

    const handleOnChange = (event) =>{
        setNewContent({
          ...newContent, 
          [event.target.name]: event.target.value
        })
        console.log(newContent)
    }

    
    const addContent = (event) =>{
        event.preventDefault()
        const db = getFirestore()
        const sectionCollection = collection(db, section)
        addDoc(sectionCollection, newContent)
        .catch(error => {console.log(error)})
        .finally(()=>setAddItem(false))
    }

    const closeModal = (event) =>{
        if (event.target.classList.contains('close')){
            setAddItem(false)
        }
      }

  return (
    <div className="add-modal-container close" onClick={closeModal}>
        <div className="add-item-info-container">
            <h6 className='add-mode-title'>NUEVO CONTENIDO</h6>
            <form action="" className='add-item-form' onSubmit={addContent}>
            <label htmlFor='add-title-input' className='add-input-label'>Titulo</label>
            <input 
                type='text' 
                id="add-title-input" 
                name='title'
                onChange={handleOnChange} />
            <label htmlFor='add-description-input' className='add-input-label'>Descripción</label>
            <textarea 
                type='text' 
                id="add-description-input" 
                name='description'
                onChange={handleOnChange} />
            <label htmlFor='add-img-input' className='add-input-label'>Link a la imagen</label>
            <input 
                type='text' 
                id="add-img-input" 
                name='picUrl'
                onChange={handleOnChange}
                required />
            <button type='submit' className='add-submit'>Guardar Cambios</button>
            </form>
        </div>
    </div>
  )
}

export default AddView