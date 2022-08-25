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
          src={content[display]} 
          alt="" 
          className='modal-img'
          />
        <div className="modal-text-container">
        <button className='modal-close-btn close' onClick={closeModal}>
          <IoIosClose className='modal-close-icon close'/>
        </button>
        <p className='modal-text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Ratione officia ullam porro excepturi sed obcaecati voluptas voluptate quam magni harum animi repellendus, 
          architecto omnis quibusdam iusto doloremque explicabo, nemo mollitia!
        </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ContentModal