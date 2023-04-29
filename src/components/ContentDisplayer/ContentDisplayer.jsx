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
  const {section, contentId} = useParams()
  const [content, setContent] = useState([])
  const [activeTake, setActiveTake] = useState(3)
  const [addItem, setAddItem] = useState(false)
  const [sectionNumber, setSectionNumber] = useState(0)
  const navigate = useNavigate()
  const {logged} = useContext(AuthContext)

  useEffect(()=>{
    const db = getFirestore();
    const contentCollection = collection(db, section)
    const q = logged ? contentCollection : query(contentCollection, where("hidden", "!=", true))
    getDocs(q)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setContent(data)
        return data})
      .then((data)=> {
        if(data.length > 6){
          setActiveTake(3)
        }else{
          setActiveTake(0)
        }
      }).then(()=> setSectionNumber(sections.indexOf(section)))
      .catch((err) => console.log('err: ' + err))
  },[section, logged])

  const newSection = (newSection) => {
    navigate(`/${newSection}`)
  }

  
  const sections = ['photography', 'video', 'branding', 'design', 'animation']
  
  const sectionsTitle = ['Fotografía', 'Video', 'Branding', 'Diseño', 'Animación']
  
  //Store code for buttons for every section
  const buttons = []
  sections.forEach(item => {
    buttons.push(
      <button 
        className={section === item ? `section-btn active-section` : 'section-btn'} 
        onClick={()=>newSection(item)}
        key={item}>
          {sectionsTitle[sections.indexOf(item)]}
      </button>)
  })

  return (
    <>
      {addItem && <AddView setAddItem={setAddItem}/>}
      {contentId && <ContentModalContainer /> }
      <div className="content-displayer-container" id='content-displayer-container'>
          <div className="section-btn-container">
            <div className="section-row">
              {buttons}
            </div>
            <div className="section-row">
              <div className="section-selector" style={{left: `calc((70vh / 5) * ${sectionNumber} + (70vh / 5 / 2 - 0.85rem))`}}></div>
            </div>
          </div>
          <Content section={section} content={content} activeTake={activeTake} setActiveTake={setActiveTake} />
          {logged && <button className='add-content-btn' onClick={()=>setAddItem(!addItem)}><RiAddFill className='add-content-icon' /></button>}
     </div>
    </>
  )
}

export default ContentDisplayer