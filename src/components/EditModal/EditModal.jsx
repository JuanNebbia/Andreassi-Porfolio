import React from 'react'
import './EditModal.css'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdModeEditOutline } from 'react-icons/md'
import { BiHide, BiShow } from 'react-icons/bi'
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'

const EditModal = ({contentInfo, setContentInfo}) => {
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
    
    const switchVisibility = () =>{
        const alterVisibility = {
            ...contentInfo,
            hidden: !contentInfo.hidden
        }
        setContentInfo(alterVisibility)
        const db = getFirestore()
        const docRef = doc(db, section, contentId)
        updateDoc(docRef, alterVisibility)
        .catch(error => {console.log(error)})
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
            <button className='modal-tool-btn' onClick={switchVisibility}>
                <BiShow className='modal-tool-icon' />
            </button>:
            <button className='modal-tool-btn' onClick={switchVisibility}>
                <BiHide className='modal-tool-icon' />
            </button>
        }
    </div>
  )
}

export default EditModal