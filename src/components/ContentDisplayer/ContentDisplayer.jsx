import React, { useState, useEffect, useRef } from 'react'
import Content from '../Content/Content'
import './ContentDisplayer.css'
import { useNavigate, useParams } from 'react-router-dom';
import { collection, query, where } from "firebase/firestore";
import { RiAddFill} from 'react-icons/ri'
import AddView from '../AddView/AddView';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import Loading from '../Loading/Loading.jsx';

const ContentDisplayer = () => {
  const {section} = useParams()
  const [activeTake, setActiveTake] = useState(0)
  const [addItem, setAddItem] = useState(false)
  const [sectionNumber, setSectionNumber] = useState(0)
  const navigate = useNavigate()
  const { data: user } = useUser();
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const collectionRef = collection(useFirestore(), section)
  const collectionQuery = user ? collectionRef : query(collectionRef, where("hidden", "!=", true))
  const  { status: dataStatus , data} = useFirestoreCollectionData(collectionQuery, {
    idField: 'id'
  });

  useEffect(()=>{
    setSectionNumber(sections.indexOf(section))
  },[user, section] )

  // useEffect(()=>{
    // const db = getFirestore();
    // const contentCollection = collection(db, section)
    // const q = user ? contentCollection : query(contentCollection, where("hidden", "!=", true))
    // getDocs(q)
    //   .then((snapshot) => {
    //     const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    //     setContent(data)
    //     return data})
    //   .then((data)=> {
    //     if(data.length > 6){
    //       setActiveTake(3)
    //     }else{
    //       setActiveTake(0)
    //     }
    //   }).then(()=> setSectionNumber(sections.indexOf(section)))
    //   .catch((err) => console.log('err: ' + err))
  // },[section, user])

  const newSection = (newSection) => {
    setActiveTake(0)
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
        key={item}
        disabled={dataStatus === 'loading'}>
          {sectionsTitle[sections.indexOf(item)]}
      </button>)
  })

  if (dataStatus === 'loading') {
    return <Loading></Loading>
  }

  const selectorStyle = {
    left: windowSize.current[0] > 768 ? `calc((70vh / 5) * ${sectionNumber} + (70vh / 5 / 2 - 0.85rem))` : `calc(((100vw - 2.2rem) / 5) * ${sectionNumber} + ((100vw - 2rem) / 5 / 2 - 0.85rem))`
  }

  return (
    
    <>
      {addItem && <AddView setAddItem={setAddItem}/>}
      <div className="content-displayer-container" id='content-displayer-container'>
          <div className="section-btn-container">
            <div className="section-row">
              {buttons}
            </div>
            <div className="section-row">
              <div className="section-selector" style={selectorStyle}></div>
            </div>
          </div>
          <Content section={section} data={data} activeTake={activeTake} setActiveTake={setActiveTake} windowSize={windowSize} />
          {user && <button className='add-content-btn' onClick={()=>setAddItem(!addItem)}><RiAddFill className='add-content-icon' /></button>}
     </div>
    </>
  )
}

export default ContentDisplayer