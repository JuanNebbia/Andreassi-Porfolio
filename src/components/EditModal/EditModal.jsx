import React from 'react'
import './EditModal.css'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdModeEditOutline } from 'react-icons/md'
import { BiHide, BiShow } from 'react-icons/bi'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'

const EditModal = ({contentInfo}) => {
    const {section, edit, contentId} = useParams()
    const navigate = useNavigate()

    const deleteItem = () =>{
        const db = getFirestore()
        deleteDoc(doc(db, section, contentId))
        .then(()=>navigate(`/${section}`))
    }

    const switchMode = () => {
        if (edit){
            navigate(`/${section}/${contentId}`)
        }else{
            navigate(`./edit`)
        }
    }

  return (
    <div className="modal-tools-container">
        <button className='modal-tool-btn' onClick={deleteItem}>
            <BsFillTrashFill className='modal-tool-icon' />
        </button>
        <button className='modal-tool-btn' onClick={switchMode}>
            <MdModeEditOutline className='modal-tool-icon' />
        </button>
        {contentInfo.hidden ?
            <button className='modal-tool-btn' onClick={switchMode}>
                <BiShow className='modal-tool-icon' />
            </button>:
            <button className='modal-tool-btn' onClick={switchMode}>
                <BiHide className='modal-tool-icon' />
            </button>
        }
    </div>
  )
}

export default EditModal