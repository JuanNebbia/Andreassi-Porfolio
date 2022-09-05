import { doc, getDoc, getFirestore } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ContentModal from '../ContentModal/ContentModal'
import Loading from '../Loading/Loading'

const ContentModalContainer = () => {
    const {section, contentId} = useParams()
    const [loading, setLoading] = useState(true)
    const [contentInfo, setContentInfo] = useState({})


    useEffect(()=>{
        const db = getFirestore()
        const itemRef = doc(db, section, contentId)
        getDoc(itemRef)
          .then((snapshot) => {
            if(snapshot.exists()){
              const data = {id: snapshot.id, ...snapshot.data()}
              setContentInfo(data)
            }
          })
          .catch((err) => console.log(err))
          .finally(()=>setLoading(false))
    },[section, contentId])

  return (
    <div>
        {loading ? 
          <Loading /> :
          <ContentModal 
            contentInfo={contentInfo} 
            setContentInfo={setContentInfo} 
          />
        }
    </div>
  )
}

export default ContentModalContainer