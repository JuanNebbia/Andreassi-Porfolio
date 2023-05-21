import './ContentModal.css'
import { motion } from 'framer-motion'
import { IoIosClose } from 'react-icons/io';
import EditModal from '../EditModal/EditModal';
import EditView from '../EditView/EditView';
import ReactPlayer from 'react-player'
import { useUser } from 'reactfire';
import { useState } from 'react';

const ContentModal = ({contentInfo, updateLocalContent, setShowModal, handleController}) => {
  const {title, description, picUrl, videoUrl, hidden} = contentInfo
  const [editionMode, setEditonMode]= useState(false)
  const { data: user } = useUser();



  const closeModal = (event) =>{
    if (event.target.classList.contains('close') || event.target.parentNode.classList.contains('close')){
      setShowModal(false)
    }
  }

  return (
      <div className='modal-container close' onClick={closeModal} onDoubleClick={handleController}>
        <motion.div className="modal-card-container" 
            initial={{y: '-100vh'}}
            animate={{y: 0}}>
          {videoUrl ? 
          <div>
            <button className='modal-close-btn-mobile close' onClick={closeModal}>
              <IoIosClose className='modal-close-icon close' onClick={closeModal}/>
            </button>
            <ReactPlayer 
              playing
              loop
              controls
              width='fit-content'
              height='100%'
              url={videoUrl}  />
          </div>
            :
            <div>
              <button className='modal-close-btn-mobile close' onClick={closeModal}>
                <IoIosClose className='modal-close-icon close' onClick={closeModal}/>
              </button>
              <img 
                src={picUrl} 
                alt="" 
                className={description || title? 'modal-img' : 'modal-img-only'}
                id={hidden ? 'hidden-content' : ''}
              />
            </div>
          }
          {editionMode && user ?
            <EditView contentInfo={contentInfo} updateLocalContent={updateLocalContent} />
            :<>
              { (description || title) &&
                <div className="modal-text-container">
                  <button className='modal-close-btn close' onClick={closeModal}>
                    <IoIosClose className='modal-close-icon close'/>
                  </button>
                      <div className="item-info-container">
                        <h5 className='modal-title'> {title} </h5>
                        <p className='modal-text'> {description} </p>
                      </div>
                </div>
              }
            </>
          }
          {user && <EditModal contentInfo={contentInfo} updateLocalContent={updateLocalContent} editionMode={editionMode} setEditonMode={setEditonMode} />}
        </motion.div>
      </div>
  )
}

export default ContentModal