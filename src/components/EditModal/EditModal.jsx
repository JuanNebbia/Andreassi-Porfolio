import React from 'react'
import './EditModal.css'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdModeEditOutline } from 'react-icons/md'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import { useParams } from 'react-router-dom'

const EditModal = ({ display, setDisplay }) => {
    const {section} = useParams()

    const deleteItem = () =>{
        const db = getFirestore()
        deleteDoc(doc(db, section, display.id))
        .then(()=>setDisplay({}))
    }

  return (
    <div className="modal-tools-container">
        <button className='modal-tool-btn' onClick={deleteItem}>
            <BsFillTrashFill className='modal-tool-icon' />
        </button>
        <button className='modal-tool-btn'>
            <MdModeEditOutline className='modal-tool-icon' />
        </button>
    </div>
  )
}

export default EditModal