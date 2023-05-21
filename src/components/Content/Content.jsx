import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Content.css'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { RxEnterFullScreen } from 'react-icons/rx'
import { useNavigate, useParams } from 'react-router-dom';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import ThumbnailDisplayer from '../ThumbnailDisplayer/ThumbnailDisplayer.jsx';
import ReactPlayer from 'react-player'
import ContentModal from '../ContentModal/ContentModal.jsx';

const Content = ({ section, data, activeTake, setActiveTake }) => {
    const navigate = useNavigate()
    const { contentId } = useParams()
    const [show, setShow] = useState(false);
    const [clickeable, setClickleable] = useState(true)
    const [content, setContent] = useState(data)
    const [showModal, setShowModal] = useState(false)
    const fullscreenIcon = useRef(null);
    const innerContainer = useRef(null)

    useEffect(()=>{
        setContent(data)
        contentId ? setShowModal(true) : setShowModal(false)
        innerContainer.current.style.transform = `translateX(0)`;
    },[data])

    //Move by clicking arrows
    const handleController = (backwards) =>{
        if (backwards){
            move(activeTake -1)
            if (activeTake === (0)){
                setActiveTake(content.length - 1)
            }else{
                setActiveTake(activeTake - 1)
            }
        }else{
            move(activeTake + 1)
            if (activeTake === (content.length - 1)){
                setActiveTake(0)
            }else{
                setActiveTake(activeTake +1)
            }
        }
        setClickleable(false)
        setTimeout(()=> {
            setClickleable(true)
        }, 300)
    }
    
    //Move by clicking thumbnails
    const handleOnClick = (event, index) => {
        setActiveTake(index)
        if (content.length > 9){
            move(index)
        }
    }
    
    const move = useCallback((index) => {
        innerContainer.current.style.transition = `200ms ease-out all`;
        if(index === content.length){
            innerContainer.current.style.transform = `translateX(0)`;
        }else{
            if(index + activeTake === -1){
                innerContainer.current.style.transform = `translateX(calc(${-1 * (content.length -1)} * 4rem))`;
            }
            else{
                innerContainer.current.style.transform = `translateX(calc(${-1 * index} * 4rem))`;
            }
        }
    }, [activeTake, setActiveTake])


    const updateLocalContent = (newContentObject) =>{
        let newContent
        if (newContentObject.delete) {
            newContent = content.filter(item => {
                return item.id !== newContentObject.id
            })
        }else{
            newContent = content.map(item => {
                if(item.id === newContentObject.id){
                    return newContentObject
                }
                return item
            })
        }
        setContent(newContent)
    }    

    const openElement = () =>{
        setShowModal(true)
        contentId !== content[activeTake].id  && navigate(`/${section}/${content[activeTake].id}`)
    }

    return (
        <>
        {showModal && <ContentModal contentInfo={content[activeTake]} updateLocalContent={updateLocalContent} setShowModal={setShowModal} handleController={handleController} /> }
        {content.length &&
        <div className='content-container'>
            <div className='middle-section'>
                <button className="controller-prev" onClick={()=> clickeable && handleController(true)}>
                    <SlArrowLeft className={!showModal ? 'prev-icon' : 'icon-invisible'}/>
                </button>
                <div className='photography-img-container'>
                    {(section === 'video' || section === 'animation') ?
                        <div className="content-video-container">
                            <ReactPlayer 
                                playing = {!showModal}
                                loop
                                muted
                                width='100%'
                                height='100%'
                                url={content[activeTake].videoUrl}
                                className={content[activeTake].hidden ? "content-video-hidden" : "content-video"}
                                onClick={openElement}
                            />
                        </div>
                        :
                        <div className="content-img-container" >
                            <img 
                                src={content[activeTake].picUrl || content[activeTake].fileUrl } 
                                className={content[activeTake].hidden ? "content-img-hidden" : "content-img"} 
                                alt="..." 
                                onClick={openElement}
                                />
                        </div>
                    }
                    {(content[activeTake].description || content[activeTake].title) && 
                    <div className="full-screen-icon-container" ref={fullscreenIcon} onMouseEnter={(()=>setShow(true))} onMouseLeave={(()=>setShow(false))}>
                        <RxEnterFullScreen className='fullscreen-icon' onClick={()=>navigate(`/${section}/${content[activeTake].id}`)}/>
                        <Overlay target={fullscreenIcon.current} show={show} placement="left">
                            {(props) => (
                            <Tooltip id="tooltip" {...props} className='info-tooltip' delay={{ show: 250, hide: 400 }}>
                                <p className='tooltip-text'>Haz click para ver contenido adicional</p>
                            </Tooltip>
                            )}
                        </Overlay>
                    </div>
                    }
                </div>
                <button className="controller-next" onClick={()=> clickeable && handleController(false)}>
                    <SlArrowRight className={!showModal ? 'next-icon' : 'icon-invisible'}/>
                </button>
            </div>
            <ThumbnailDisplayer content={content}>
                <div className="inner-thumbnail-container" ref={innerContainer}>
                    {content.map((item, index) => {
                        return <div className={activeTake === index ? 'thumbnail-img-container selected-thumbnail' : 'thumbnail-img-container'} key={index} onClick={(event)=>handleOnClick(event, index)} >
                            <img className='thumbnail-img' src={item.picUrl || item.posterUrl} alt='' />
                        </div>
                    })}
                </div>
            </ThumbnailDisplayer>
        </div>}
        </>  
    )
}

export default Content