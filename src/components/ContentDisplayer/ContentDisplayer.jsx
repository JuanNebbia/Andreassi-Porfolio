import React, { useState, useEffect, useContext } from 'react'
import Content from '../Content/Content'
import './ContentDisplayer.css'
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import ContentModalContainer from '../ContentModalContainer/ContentModalContainer';
import { AuthContext } from '../../context/AuthContext';
import { RiAddFill} from 'react-icons/ri'
import AddView from '../AddView/AddView';

const ContentDisplayer = () => {
  const [content, setContent] = useState([])
  const [activeTake, setActiveTake] = useState(0)
  const [addItem, setAddItem] = useState(false)
  const navigate = useNavigate()
  const {section, contentId} = useParams()
  const {logged} = useContext(AuthContext)

  useEffect(()=>{
    const db = getFirestore();
    const contentCollection = collection(db, section)
    const q = logged ? contentCollection : query(contentCollection, where("hidden", "!=", true))
    getDocs(q)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setContent(data)})
      .catch((err) => console.log('err: ' + err))
  },[section, logged])

  const newSection = (direction) => {
     navigate(`/${direction}`)
     if (content !== direction){
       setActiveTake(0)
     }
   }

  return (
    <>
      {addItem && <AddView setAddItem={setAddItem}/>}
      {contentId && <ContentModalContainer /> }
      <div className="content-displayer-container" id='content-displayer-container'>
          <div className="section-btn-container">
            <div className="row section-row">
              <button 
                className={section === 'photography' ? `section-btn active-section col-2` : 'section-btn col-2'} 
                onClick={()=>newSection('photography')}>
                  Fotografía
              </button>
              <button 
                className={section === 'video' ? `section-btn active-section col-2` : 'section-btn col-2'} 
                onClick={()=>newSection('video')}>
                  Video
              </button>
              <button 
              className={section === 'branding' ? `section-btn active-section col-2` : 'section-btn col-2'} 
              onClick={()=>newSection('branding')}>
                Branding
              </button>
              <button 
              className={section === 'design' ? `section-btn active-section col-2` : 'section-btn col-2'} 
              onClick={()=>newSection('design')}>
                Diseño
              </button>
              <button 
              className={section === 'animation' ? `section-btn active-section col-2` : 'section-btn col-2'} 
              onClick={()=>newSection('animation')}>
                Animación
              </button>
            </div>
            <div className="section-row">
              <div className="col-2">
                {section === 'photography' && <div className="section-selector"></div>}
              </div>
              <div className="col-2">
              {section === 'video' && <div className="section-selector"></div>}
              </div>
              <div className="col-2">
              {section === 'branding' && <div className="section-selector"></div>}
              </div>
              <div className="col-2">
              {section === 'design' && <div className="section-selector"></div>}
              </div>
              <div className="col-2">
              {section === 'animation' && <div className="section-selector"></div>}
              </div>
            </div>
          </div>
          <Content section={section} content={content} activeTake={activeTake} setActiveTake={setActiveTake} />
          {logged && <button className='add-content-btn' onClick={()=>setAddItem(!addItem)}><RiAddFill className='add-content-icon' /></button>}
     </div>
    </>
  )
}

export default ContentDisplayer