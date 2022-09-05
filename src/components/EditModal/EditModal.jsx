import React from 'react'
import './EditModal.css'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdModeEditOutline } from 'react-icons/md'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'

const EditModal = ({ editMode, setEditMode, contentInfo }) => {
    const {section, contentId} = useParams()
    const navigate = useNavigate()

    const deleteItem = () =>{
        const db = getFirestore()
        deleteDoc(doc(db, section, contentId))
        .then(()=>navigate(`/${section}`))
    }

  return (
    <div className="modal-tools-container">
        <button className='modal-tool-btn' onClick={deleteItem}>
            <BsFillTrashFill className='modal-tool-icon' />
        </button>
        {contentInfo.description &&
            <button className='modal-tool-btn' onClick={()=>setEditMode(!editMode)}>
                <MdModeEditOutline className='modal-tool-icon' />
            </button>
        }
    </div>
  )
}

export default EditModal