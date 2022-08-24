import React from 'react'
import './ContentModal.css'
import { motion } from 'framer-motion'

const ContentModal = ({display, setDisplay, content}) => {

  const closeModal = (event) =>{
    if (event.target.classList.contains('modal-container')){
      setDisplay(null)
    }
  }

  return (
    <div className='modal-container' onClick={closeModal}>
      <motion.img 
        src={content[display]} 
        alt="" 
        className='modal-img'
        initial={{y: '-100vh'}}
        animate={{y: 0}}
        />
    </div>
  )
}

export default ContentModal