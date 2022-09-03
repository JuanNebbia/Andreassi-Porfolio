import React from 'react'
import './ContentModal.css'
import { motion } from 'framer-motion'
import { IoIosClose } from 'react-icons/io';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import EditModal from '../EditModal/EditModal';

const ContentModal = ({display, setDisplay}) => {
  const {logged} = useContext(AuthContext)

  const closeModal = (event) =>{
    if (event.target.classList.contains('close')){
      setDisplay({})
    }
  }

  return (
    <div className='modal-container close' onClick={closeModal}>
      <motion.div className="modal-card-container" 
          initial={{y: '-100vh'}}
          animate={{y: 0}}>
        <img 
          src={display.picUrl} 
          alt="" 
          className={display.description || logged? 'modal-img' : 'modal-img-only'}
          />
          { display.description &&
            <div className="modal-text-container">
              <button className='modal-close-btn close' onClick={closeModal}>
                <IoIosClose className='modal-close-icon close'/>
              </button>
                <h5 className='modal-title'> {display.title} </h5>
                <p className='modal-text'> {display.description} </p>
            </div>
          }
          {logged && <EditModal display={display} setDisplay={setDisplay} />}
      </motion.div>
    </div>
  )
}

export default ContentModal