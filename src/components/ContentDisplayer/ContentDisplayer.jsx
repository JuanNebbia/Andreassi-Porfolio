import React, { useState, useEffect } from 'react'
import Content from '../Content/Content'
import './ContentDisplayer.css'
import ContentModal from '../../components/ContentModal/ContentModal';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, getFirestore } from "firebase/firestore";

const ContentDisplayer = ({section}) => {
  const [display, setDisplay] = useState(null)
  const [content, setContent] = useState([])
  const [activeTake, setActiveTake] = useState(0)
  const navigate = useNavigate()

  useEffect(()=>{
    const db = getFirestore();
    const itemsCollection = collection(db, section)
    getDocs(itemsCollection).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      setContent(data)})
    .catch((err) => console.log('err: ' + err))
  },[section])


  const newSection = (direction) => {
     navigate(`/${direction}`)
     if (content !== direction){
       setActiveTake(0)
     }
   }

  return (
    <>
      {display !==null &&
        <ContentModal display={display} setDisplay={setDisplay} content={content} />
      }
      <div className="content-displayer-container">
          <div className="section-btn-container">
              <button 
                className={section === 'photography' ? `section-btn active-section` : 'section-btn'} 
                onClick={()=>newSection('photography')}>
                  Fotografía
              </button>
              <button 
                className={section === 'video' ? `section-btn active-section` : 'section-btn'} 
                onClick={()=>newSection('video')}>
                  Video
              </button>
              <button 
              className={section === 'branding' ? `section-btn active-section` : 'section-btn'} 
              onClick={()=>newSection('branding')}>
                Branding
              </button>
              <button 
              className={section === 'design' ? `section-btn active-section` : 'section-btn'} 
              onClick={()=>newSection('design')}>
                Diseño
              </button>
          </div>
          <Content section={section} content={content} setDisplay={setDisplay} activeTake={activeTake} setActiveTake={setActiveTake} />
     </div>
    </>
  )
}

export default ContentDisplayer