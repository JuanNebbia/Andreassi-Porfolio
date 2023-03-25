import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { storage } from '../../index.js'
import './AddView.css'

const AddView = ({setAddItem}) => {
    const {section} = useParams()
    const titleInput = useRef()
    const descriptionInput = useRef()
    const urlInput = useRef()
    const fileInput = useRef()
    const hideInput = useRef()
    
    const addContent = async (event) => {
        event.preventDefault()
        const file = fileInput.current.files[0]
        const storageRef = ref(storage, `${section}/${file.name}`)
        await uploadBytes(storageRef, file)
        const fileUrl = await getDownloadURL(storageRef)
        const newContent = {
            hidden: hideInput.current.checked,
            picUrl: fileUrl || urlInput.current.value,
            description: descriptionInput.current.value,
            title: titleInput.current.value,
        }
        console.log(newContent);
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
            <h6 className='add-mode-title'>NUEVO CONTENIDO PARA {section.toUpperCase()}</h6>
            <form action="" className='add-item-form' onSubmit={addContent}>
            <label htmlFor='add-title-input' className='add-input-label'>Titulo</label>
            <input 
                type='text' 
                id="add-title-input" 
                name='title'
                ref={titleInput} 
            />
            <label htmlFor='add-description-input' className='add-input-label'>Descripción</label>
            <textarea 
                type='text' 
                id="add-description-input" 
                name='description'
                ref={descriptionInput} 
            />
            <label htmlFor='add-img-input' className='add-input-label'>Link a la imagen</label>
            <input 
                type='text' 
                id="add-img-input" 
                name='picUrl'
                ref={urlInput}
            />
            <label htmlFor='add-img-file-input' className='add-input-label'>Subir un archivo</label>
            <input 
                type='file' 
                id="add-img-file-input" 
                name='picFile'
                ref={fileInput}
            />
            <input type='checkbox' name='hidden' id='hide-input-false' ref={hideInput} />
            <label htmlFor='hide-input-false' className='hide-input-label'>Ocultar</label>
            <button type='submit' className='add-submit'>Guardar Cambios</button>
            </form>
        </motion.div>
    </div>
  )
}

export default AddView