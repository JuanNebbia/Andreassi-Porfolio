import React from 'react'
import './ContentModal.css'
import { motion } from 'framer-motion'
import { IoIosClose } from 'react-icons/io';

const ContentModal = ({display, setDisplay, content}) => {

  const closeModal = (event) =>{
    if (event.target.classList.contains('close')){
      setDisplay(null)
    }
  }

  return (
    <div className='modal-container close' onClick={closeModal}>
      <motion.div className="modal-card-container" 
          initial={{y: '-100vh'}}
          animate={{y: 0}}>
        <img 
          src={content[display].picUrl} 
          alt="" 
          className={content[display].description ? 'modal-img' : 'modal-img-only'}
          />
          { content[display].description &&
            <div className="modal-text-container">
              <button className='modal-close-btn close' onClick={closeModal}>
                <IoIosClose className='modal-close-icon close'/>
              </button>
                <h5 className='modal-title'> {content[display].title} </h5>
                <p className='modal-text'> {content[display].description} </p>
            </div>
          }
      </motion.div>
    </div>
  )
}

export default ContentModal