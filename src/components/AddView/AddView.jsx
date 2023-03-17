import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './AddView.css'

const AddView = ({setAddItem}) => {
    const [newContent, setNewContent] = useState({})
    const {section} = useParams()

    const handleOnChange = (event) =>{
        if (event.target.name === 'hidden'){
            const isTrueSet = (event.target.value === 'true');
            setNewContent({
                ...newContent, 
                hidden: isTrueSet
              })
        }
        else{
            setNewContent({
              ...newContent, 
              [event.target.name]: event.target.value
            })   
        }
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
        <motion.div className="add-item-info-container"
            initial={{y: '-100vh'}}
            animate={{y: 0}}>
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
            <input type='radio' name='hidden' value={false} id='hide-input-false' defaultChecked onChange={handleOnChange} />
            <label htmlFor='hide-input-false' className='hide-input-label'>No ocultar</label>
            <input type='radio' name='hidden' value={true} id='hide-input-true' onChange={handleOnChange}/>
            <label htmlFor='hide-input-true' className='hide-input-label'>Ocultar</label>
            <button type='submit' className='add-submit'>Guardar Cambios</button>
            </form>
        </motion.div>
    </div>
  )
}

export default AddView