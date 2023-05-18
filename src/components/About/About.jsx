import React, { useState, useRef } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import './About.css'
import profileGif from '../../img/GifFoto.gif'
import ps from '../../img/icons/adobe/Recurso 8@2x.png'
import pr from '../../img/icons/adobe/Recurso 9@2x.png'
import me from '../../img/icons/adobe/Recurso 10@2x.png'
import lrc from '../../img/icons/adobe/Recurso 11@2x.png'
import ai from '../../img/icons/adobe/Recurso 12@2x.png'
import ae from '../../img/icons/adobe/Recurso 13@2x.png'
import win from '../../img/icons/productividad/Recurso 2@2x.png'
import ob from '../../img/icons/productividad/Recurso 3@2x.png'
import not from '../../img/icons/productividad/Recurso 4@2x.png'
import gpt from '../../img/icons/productividad/Recurso 5@2x.png'
import mac from '../../img/icons/productividad/Recurso 6@2x.png'
import drive from '../../img/icons/productividad/Recurso 7@2x.png'
import { useUser } from 'reactfire';

const About = ({ info, setInfo, updateContent }) => {
  const { data: user } = useUser();
  const [editMode, setEditMode] = useState(false)
  const aboutTitleInput = useRef()
  const aboutDescriptionInput = useRef()
  const trainingTitleInput = useRef()
  const trainingDescriptionInput = useRef()

  const setNewInfo = (event) =>{
    event.preventDefault()
    const newInfo = {
      ...info,
      about:{
        general: {
          title: aboutTitleInput.current.value,
          description: aboutDescriptionInput.current.value
        },
        training: {
          title: trainingTitleInput.current.value,
          description: trainingDescriptionInput.current.value
        }
      }
    }
    setInfo(newInfo)
    updateContent(newInfo)
    setEditMode(false)
  }

  return (
    <div className='about-container'>
        <div className="row">
          <div className="col-6">
            <div className="card mateo-gif-card">
              <div className="card-side front small card-img ">
                <img src={profileGif} alt="Mateo gif" className='mateo-gif' />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="icons-container">
                  <div className="icons-row">
                    <img src={ps} alt="" className='adobe-logo' />
                    <img src={pr} alt="" className='adobe-logo' />
                    <img src={me} alt="" className='adobe-logo' />
                  </div>
                  <div className="icons-row">
                    <img src={lrc} alt="" className='adobe-logo' />
                    <img src={ai} alt="" className='adobe-logo' />
                    <img src={ae} alt="" className='adobe-logo' />
                  </div>
              </div>
              <h6 className='tech-title'>Adobe Suite</h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              { !editMode ? <div className="card-side">
                <div className="about-title-row">
                  <h6 className='about-title'>{info.about?.general.title}</h6>
                  {user && 
                    <button className='about-edit-button' onClick={()=>setEditMode(!editMode)}><MdModeEditOutline /></button>
                  }
                </div>
                <p className='about-text'>{info.about?.general.description}</p>
              </div> :
              <div className="card-side">
                <div className="about-title-row">
                  <h6 className='about-title'>{info.about?.general.title}: Editando</h6>
                </div>
                <form action="" className='edit-about-form' onSubmit={setNewInfo}>
                  <label htmlFor='edit-about-title-input'>Titulo</label>
                  <input 
                    type="text" 
                    defaultValue={info.about?.general.title} 
                    id='edit-about-title-input' 
                    className='edit-about-input' 
                    name='title'
                    ref={aboutTitleInput}
                  />
                  <label htmlFor='edit-about-description-input'>Descripción</label>
                  <textarea 
                    defaultValue={info.about?.general.description} 
                    id='edit-about-description-input' 
                    className='edit-about-input'  
                    name='description'
                    ref={aboutDescriptionInput}
                  />
                  <div className="buttons-container">
                    <input type="submit" value='Guardar' className='submit-about-general'/>
                    <button onClick={()=>setEditMode(false)}>Cancelar</button>
                  </div>
                </form>
              </div>
              }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="icons-container">
                <div className="icons-row">
                  <img src={win} alt="" className='adobe-logo' />
                  <img src={ob} alt="" className='adobe-logo' />
                  <img src={not} alt="" className='adobe-logo' />
                </div>
                <div className="icons-row">
                  <img src={gpt} alt="" className='adobe-logo' />
                  <img src={mac} alt="" className='adobe-logo' />
                  <img src={drive} alt="" className='adobe-logo' />
                </div>
              </div>
              <h6 className='tech-title'>Productividad</h6>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="landscape-container">
                <img src="https://media.tycsports.com/files/2023/02/10/532928/lionel-messi_w416.webp" alt="" className='landscape-img' />
              </div>
              <h6 className='tech-title'>Acá nací</h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
            { !editMode ? <div className="card-side">
                <div className="about-title-row">
                  <h6 className='about-title'>{info.about?.training.title}</h6>
                  {user && 
                    <button className='about-edit-button' onClick={()=>setEditMode(!editMode)}><MdModeEditOutline /></button>
                  }
                </div>
                <p className='about-text'>{info.about?.training.description}</p>
              </div> :
              <div className="card-side">
                <div className="about-title-row">
                  <h6 className='about-title'>{info.about?.training.title}: Editando</h6>
                </div>
                <form action="" className='edit-about-form' onSubmit={setNewInfo}>
                  <label htmlFor='edit-about-title-input'>Titulo</label>
                  <input 
                    type="text" 
                    defaultValue={info.about?.training.title} 
                    id='edit-about-title-input' 
                    className='edit-about-input' 
                    name='title'
                    ref={trainingTitleInput}
                  />
                  <label htmlFor='edit-about-description-input'>Descripción</label>
                  <textarea 
                    defaultValue={info.about?.training.description} 
                    id='edit-about-description-input' 
                    className='edit-about-input'  
                    name='description'
                    ref={trainingDescriptionInput}
                  />
                  <div className="buttons-container">
                    <input type="submit" value='Guardar' className='submit-about-training'/>
                    <button onClick={()=>setEditMode(false)}>Cancelar</button>
                  </div>
                </form>
              </div>
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default About