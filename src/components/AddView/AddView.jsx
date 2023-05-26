import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { storage } from '../../index.js'
import { IoIosClose } from 'react-icons/io';
import './AddView.css'

const AddView = ({setAddItem}) => {
    const {section} = useParams()
    const titleInput = useRef()
    const descriptionInput = useRef()
    const urlInput = useRef()
    const fileInput = useRef()
    const urlInputVideo = useRef()
    const urlInputVideoThumbnail = useRef()
    const fileInputVideo = useRef()
    const fileInputVideoThumbnail = useRef()
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
        const db = getFirestore()
        const sectionCollection = collection(db, section)
        addDoc(sectionCollection, newContent)
        .catch(error => {console.log(error)})
        .finally(()=>setAddItem(false))
    }

    const addVideoContent = async (event) =>{
        event.preventDefault()
        const videoFile = fileInputVideo.current.files[0]
        const thumbnailFile = fileInputVideoThumbnail.current.files[0]
        const storageVideoRef = ref(storage, `${section}/videos/${videoFile.name}`)
        const storageThumbnailRef = ref(storage, `${section}/thumbnails/${thumbnailFile.name}`)
        await uploadBytes(storageVideoRef, videoFile)
        await uploadBytes(storageThumbnailRef, thumbnailFile)
        const fileVideoUrl = await getDownloadURL(storageVideoRef)
        const fileThumbnailUrl = await getDownloadURL(storageThumbnailRef)
        const newContent = {
            hidden: hideInput.current.checked,
            videoUrl: fileVideoUrl || urlInputVideo.current.value,
            posterUrl: fileThumbnailUrl || urlInputVideoThumbnail.current.value,
            description: descriptionInput.current.value,
            title: titleInput.current.value,
        }
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
            <button className='add-modal-close-btn close' onClick={closeModal}>
                <IoIosClose className='modal-close-icon close' onClick={closeModal}/>
            </button>
            <h6 className='add-mode-title'>NUEVO CONTENIDO PARA {section.toUpperCase()}</h6>
            <form action="" className='add-item-form' onSubmit={ section === 'video' || section === 'animation' ? addVideoContent : addContent}>
            <label htmlFor='add-title-input' className='add-input-label'>Titulo</label>
            <input 
                type='text' 
                id="add-title-input" 
                name='title'
                ref={titleInput} 
                className='text-input'
            />
            <label htmlFor='add-description-input' className='add-input-label'>Descripción</label>
            <textarea 
                type='text' 
                id="add-description-input" 
                name='description'
                ref={descriptionInput} 
                className='text-input'
            />
            {   section === 'video' || section === 'animation' ?
                <>
                    <label htmlFor='add-video-file-input' className='add-input-label'>Subir un archivo de video</label>
                    <input 
                        type='file' 
                        accept='video/*'
                        id="add-video-file-input" 
                        name='videoFile'
                        ref={fileInputVideo}
                    />
                    <label htmlFor='add-video-input' className='add-input-label'>Link al video</label>
                    <input 
                        type='text' 
                        id="add-video-input" 
                        name='videoUrl'
                        ref={urlInputVideo}
                        className='text-input'
                    />
                    <label htmlFor='add-video-thumbnail-file-input' className='add-input-label'>Subir un archivo de para miniatura</label>
                    <input 
                        type='file' 
                        accept='image/*'
                        id="add-video-thumbnail-file-input" 
                        name='thumbnailFile'
                        ref={fileInputVideoThumbnail}
                    />
                    <label htmlFor='add-video-thumbnail-input' className='add-input-label'>Link a la miniatura</label>
                    <input 
                        type='text' 
                        id="add-video-thumbnail-input" 
                        name='videoThumbnailUrl'
                        ref={urlInputVideoThumbnail}
                        className='text-input'
                    />
                </>:
                <>
                    <label htmlFor='add-img-input' className='add-input-label'>Link a la imagen</label>
                    <input 
                        type='text' 
                        id="add-img-input" 
                        name='picUrl'
                        ref={urlInput}
                        className='text-input'
                    />
                    <label htmlFor='add-img-file-input' className='add-input-label'>Subir un archivo de imagen</label>
                    <input 
                        type='file' 
                        accept='image/*'
                        id="add-img-file-input" 
                        name='picFile'
                        ref={fileInput}
                    />
                </>
            }
            <label htmlFor='hide-input-false' className='hide-input-label'>Ocultar</label>
            <input type='checkbox' name='hidden' id='hide-input-false' ref={hideInput} />
            <button type='submit' className='add-submit'>Guardar Cambios</button>
            </form>
        </motion.div>
    </div>
  )
}

export default AddView