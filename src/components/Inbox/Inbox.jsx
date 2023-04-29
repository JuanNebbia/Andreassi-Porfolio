import React, { useState, useEffect} from 'react'
import { doc, updateDoc, collection, getDocs, getFirestore} from "firebase/firestore";
import Loading from '../Loading/Loading'
import './Inbox.css'
import Welcome from '../Welcome/Welcome';

function Inbox() {
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(true)

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
        .finally(()=> setLoading(false))
    },[content])
    
    const renderDate = (date) =>{
        const fullDate = `
            ${date.getDate()}/${date.getMonth()}/${date.getYear()}
            ${date.getHours()}:${date.getMinutes()}`
        return fullDate
    }

    const switchVisibility = (id) =>{
        const thisMessage = content.find(mes => mes.id===id)
        thisMessage.hidden = !thisMessage.hidden
        const newContent = content.map(mes =>{
            if(mes.id === id){
                mes.hidden = !mes.hidden
            }
            return mes
        })
        setContent(newContent)
        const newMessage = {
            ...thisMessage,
            hidden: !thisMessage.hidden
        }
        const db = getFirestore()
        const docRef = doc(db, 'messages', id)
        updateDoc(docRef, newMessage)
        .catch(error => {console.log(error)})
    }
       

    return (
        <>
            <Welcome parent='inbox' />
                {loading ? <Loading /> :
                <div className='messages-container'>
                    {!content.length ? <p className='no-messages-tag'>No hay mensajes para mostrar.</p> :
                        <div className="messages-inner-container">
                            <div className="visible-msg-container">
                                {content.map((message, i)=>{
                                    return (
                                        !message.hidden &&
                                        <div key={i} className='message-box' onDoubleClick={()=>switchVisibility(message.id)}>
                                            <p className='message-subject'>{message.subject}:</p>
                                            <p className='message-text'>"{message.message}"</p>
                                            <p className='message-date'>{renderDate(message.date.toDate())}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <hr />
                            <div className="hidden-msg-container">
                                {content.map((message, i)=>{
                                    return (
                                        message.hidden &&
                                        <div key={i} className='message-box hidden' onDoubleClick={()=>switchVisibility(message.id)}>
                                            <p className='message-subject'>{message.subject}:</p>
                                            <p className='message-text'>"{message.message}"</p>
                                            <p className='message-date'>{renderDate(message.date.toDate())}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>}
        </>
    )
}

export default Inbox