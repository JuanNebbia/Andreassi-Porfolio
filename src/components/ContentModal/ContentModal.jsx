import './ContentModal.css'
import { motion } from 'framer-motion'
import { IoIosClose } from 'react-icons/io';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import EditModal from '../EditModal/EditModal';
import { useNavigate, useParams } from 'react-router-dom';
import EditView from '../EditView/EditView';

const ContentModal = ({contentInfo}) => {
  const {title, description, picUrl, hidden} = contentInfo
  const {section, edit} = useParams()
  const {logged} = useContext(AuthContext)
  const navigate = useNavigate()


  const closeModal = (event) =>{
    if (event.target.classList.contains('close')){
      navigate(`/${section}`)
    }
  }

  return (
      <div className='modal-container close' onClick={closeModal}>
        <motion.div className="modal-card-container" 
            initial={{y: '-100vh'}}
            animate={{y: 0}}>
          <img 
            src={picUrl} 
            alt="" 
            className={description || title? 'modal-img' : 'modal-img-only'}
            id={hidden && 'hidden-content'}
            />
            {edit && logged ?
              <EditView contentInfo={contentInfo}/>
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
            {logged && <EditModal contentInfo={contentInfo} />}
        </motion.div>
      </div>
  )
}

export default ContentModal