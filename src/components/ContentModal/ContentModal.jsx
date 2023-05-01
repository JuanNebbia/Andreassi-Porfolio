import './ContentModal.css'
import { motion } from 'framer-motion'
import { IoIosClose } from 'react-icons/io';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import EditModal from '../EditModal/EditModal';
import { useParams } from 'react-router-dom';
import EditView from '../EditView/EditView';
import ReactPlayer from 'react-player'

const ContentModal = ({contentInfo, updateLocalContent, setShowModal}) => {
  const {title, description, picUrl, videoUrl, hidden} = contentInfo
  const {edit} = useParams()
  const {logged} = useContext(AuthContext)



  const closeModal = (event) =>{
    if (event.target.classList.contains('close')){
      setShowModal(false)
    }
  }

  return (
      <div className='modal-container close' onClick={closeModal}>
        <motion.div className="modal-card-container" 
            initial={{y: '-100vh'}}
            animate={{y: 0}}>
          {videoUrl ? 
            <ReactPlayer 
              playing
              loop
              controls
              width='fit-content'
              height='100%'
              url={videoUrl}  />
            :
            <img 
              src={picUrl} 
              alt="" 
              className={description || title? 'modal-img' : 'modal-img-only'}
              id={hidden ? 'hidden-content' : ''}
            />
          }
          {edit && logged ?
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
            {logged && <EditModal contentInfo={contentInfo} updateLocalContent={updateLocalContent} />}
        </motion.div>
      </div>
  )
}

export default ContentModal