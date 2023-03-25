import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import About from '../About/About'
import Loading from '../Loading/Loading'

const AboutContainer = () => {
    const [loading, setLoading] = useState(true)
    const [info, setInfo] = useState({})

    useEffect(()=>{
        const db = getFirestore();
        const docRef = doc(db, 'info', 'encbRsJJaAmXWNQIMvmj')
        getDoc(docRef)
        .then(document => {
            const data = document.data()
            setInfo(data)
        })
        .finally(()=>setLoading(false))
      },[])


    const updateContent = (newInfo) =>{
        const db = getFirestore()
        const docRef = doc(db, 'info', 'encbRsJJaAmXWNQIMvmj')
        updateDoc(docRef, newInfo)
        .catch(error => {console.log(error)})
    }

    

    return (
        <>
            {!loading ?
                <About info={info} updateContent={updateContent} setInfo={setInfo} />
                : <Loading />
            }
        </>
    )
}

export default AboutContainer