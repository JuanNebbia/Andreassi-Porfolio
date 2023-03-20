import React, { useState, useEffect} from 'react'
import { collection, getDocs, getFirestore} from "firebase/firestore";
import './Inbox.css'
import Welcome from '../Welcome/Welcome';

function Inbox() {
    const [content, setContent] = useState([])

    useEffect(()=>{
        const db = getFirestore();
        const collectionRef = collection(db, 'messages')
        getDocs(collectionRef)
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            return data
        })
        .then(data =>{
            const sortedData = data.sort((a,b)=> (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0)
            new Date().getUTCDate()
            return sortedData
        })
        .then(data => setContent(data))
        .catch((err) => console.log('err: ' + err))
    },[])
    
    const renderDate = (date) =>{
        const fullDate = `
            ${date.getDate()}/${date.getMonth()}/${date.getYear()}
            ${date.getHours()}:${date.getMinutes()}`
        return fullDate
    }
       

    return (
        <>
            <Welcome parent='inbox' />
                
                <div className='messages-container'>
                    {!content.length ? <p className='no-messages-tag'>No hay mensajes para mostrar.</p> :
                        <div className="messages-inner-container">
                            {content.map((message => {
                                return (
                                    <div className='message-box'>
                                        <p className='message-subject'>{message.subject}:</p>
                                        <p className='message-text'>"{message.message}"</p>
                                        <p className='message-date'>{renderDate(message.date.toDate())}</p>
                                    </div>
                                )
                            }))}
                        </div>
                    }
                </div>
        </>
    )
}

export default Inbox