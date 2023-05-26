import React, { useState, useRef } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import './About.css'
import profileGif from '../../img/GifFoto.gif'
import timelapse from '../../img/timelapse.mp4'
import landscape from '../../img/landscape.jpg'
import ps from '../../img/icons/adobe/Recurso 8@2x.png'
import pr from '../../img/icons/adobe/Recurso 9@2x.png'
import me from '../../img/icons/adobe/Recurso 10@2x.png'
import lrc from '../../img/icons/adobe/Recurso 11@2x.png'
import ai from '../../img/icons/adobe/Recurso 12@2x.png'
import ae from '../../img/icons/adobe/Recurso 13@2x.png'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import { addDoc, collection, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { storage } from '../../index.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const About = ({ info, setInfo, updateContent }) => {
  const { data: user } = useUser();
  const [ editMode, setEditMode ] = useState(false)
  const [ uploadCv, setUploadCv ] = useState(false)
  const aboutTitleInput = useRef()
  const aboutDescriptionInput = useRef()
  const trainingTitleInput = useRef()
  const trainingDescriptionInput = useRef()
  const cvFileInput = useRef()

  const collectionRef = collection(useFirestore(), 'cv')
  const  { status: dataStatus , data} = useFirestoreCollectionData(collectionRef, { idField: 'id' });

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

  const addCv = async (event) =>{
    event.preventDefault()
    const file = cvFileInput.current.files[0]
    const storageRef = ref(storage, `cv/cv`)
    await uploadBytes(storageRef, file)
    const fileUrl = await getDownloadURL(storageRef)
    const newContent = {
        cvUrl: fileUrl
    }
    const db = getFirestore()
    const docRef = doc(db, 'cv', data[0].id)
    updateDoc(docRef, newContent)
    .catch(error => {console.log(error)})
    .finally(()=>{
      setEditMode(false)
      setUploadCv(false)
    }
      )
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
                    <button onClick={()=>setEditMode(false)} className='cancel-btn'>Cancelar</button>
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
              <div className="landscape-container">
                <img src={landscape} alt="" className='landscape-img' />
              </div>
              <h6 className='tech-title'>Acá nací</h6>
            </div>
          </div>
          <div className="col-6">
            <div className="card timelapse-card">
              <div className="card-side front small card-img ">
                <video src={timelapse} alt="time lapse video" className='timelapse-video' autoPlay loop muted playsInline></video>
              </div>
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
                    <button onClick={()=>setEditMode(false)} className='cancel-btn'>Cancelar</button>
                  </div>
                </form>
              </div>
              }
            </div>
          </div>
        </div>
        { dataStatus === 'success' &&
          <>
            <div className='about-btn-container'>
              <button className='cv-button'><a href={data[0].cvUrl} target='blank'> Ver Currículum</a></button>
              { user && 
                <button className='upload-cv-button' onClick={()=>setUploadCv(!uploadCv)}>Subir nuevo CV</button>
              }
            </div>
            { uploadCv && 
              <form action="" className='upload-cv-form' onSubmit={addCv}>
                <input type='file' accept="application/pdf" required name='cv-file' ref={cvFileInput} />
                <input type="submit"  value='cargar' className='upload-cv-btn'/>
              </form>
            }
          </>
        }
    </div>
  )
}

export default About