import React, { useState } from 'react'
import Photography from '../Photography/Photography'
import './ContentDisplayer.css'
import ContentModal from '../../components/ContentModal/ContentModal';
import { photos, videos, messi, perritos } from '../../mock/mock';

const ContentDisplayer = () => {
  const [display, setDisplay] = useState(null)
  const [content, setContent] = useState(photos)
  const [activeTake, setActiveTake] = useState(0)

  const newSection = (section) => {
    setContent(section)
    if (content !== section){
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
                className={content === photos ? 'section-btn active' : 'section-btn'} 
                onClick={()=>newSection(photos)}>
                  Fotografía
              </button>
              <button 
                className={content === videos ? 'section-btn active' : 'section-btn'} 
                onClick={()=>newSection(videos)}>
                  Video
              </button>
              <button 
              className={content === messi ? 'section-btn active' : 'section-btn'} 
              onClick={()=>newSection(messi)}>
                Messi
              </button>
              <button 
              className={content === perritos ? 'section-btn active' : 'section-btn'} 
              onClick={()=>newSection(perritos)}>
                Perritos
              </button>
          </div>
          <Photography content={content} setDisplay={setDisplay} activeTake={activeTake} setActiveTake={setActiveTake} />
      </div>
    </>
  )
}

export default ContentDisplayer