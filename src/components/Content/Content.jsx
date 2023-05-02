import React, { useCallback, useRef, useState } from 'react'
import './Content.css'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { RxEnterFullScreen } from 'react-icons/rx'
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import ThumbnailDisplayer from '../ThumbnailDisplayer/ThumbnailDisplayer.jsx';
import ReactPlayer from 'react-player'
import ContentModal from '../ContentModal/ContentModal.jsx';

const Content = ({ section, content, setContent, activeTake, setActiveTake }) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [clickeable, setClickleable] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const fullscreenIcon = useRef(null);
    const innerContainer = useRef(null)

    //Move by clicking arrows
    const handleController = (backwards) =>{
        if (backwards){
            if (content.length > 7){
                move(activeTake - 1)
            }
            if (activeTake === (0)){
                setActiveTake(content.length - 1)
            }else{
                setActiveTake(activeTake - 1)
            }
        }else{
            if (content.length > 7){
                move(activeTake + 1)
            }
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
    // const handleOnClick = (event, index) => {
    //     setActiveTake(index)
    //     if (content.length > 7){
    //         move(index)
    //     }
    // }
    
    const move = useCallback((index) => {
        innerContainer.current.style.transition = `200ms ease-out all`;
        if(Math.abs(index - activeTake) === innerContainer.current.children.length - 1){
            innerContainer.current.style.transform = `translateX(calc(${-1 * 4}vw + 1rem))`;
        }else{
            innerContainer.current.style.transform = `translateX(calc(${-1 * (index - activeTake) * 4}vw - ${(index - activeTake)}rem))`;
        }
        const distance = Math.abs(index - activeTake)
        const movingElements = []
        for(let i = 0; i < distance; i++){
            if (index > activeTake){
                movingElements.push(innerContainer.current.children[i])
            }
            if (index < activeTake){
                movingElements.push(innerContainer.current.children[innerContainer.current.children.length - (i + 1)])
            }
        }
        const transition = () => {
            innerContainer.current.style.transition = 'none';
            innerContainer.current.style.transform = `translateX(0)`;
            if (index > activeTake) {
                for(let i = 0; i < movingElements.length; i++) {
                    innerContainer.current.appendChild(movingElements[i]);
                }
            }
            if (index < activeTake) {
                for(let i = 0; i < movingElements.length; i++) {
                    innerContainer.current.insertBefore(movingElements[i], innerContainer.current.firstChild)
                }
            }
            innerContainer.current.removeEventListener('transitionend', transition);
        }

        innerContainer.current.addEventListener('transitionend', transition);
    }, [activeTake, setActiveTake])


    const updateLocalContent = (newContentObject) =>{
        const newContent = content.map(item => {
            if(item.id === newContentObject.id){
                return newContentObject
            }
            return item
        })
        setContent(newContent)
    }    

    return (
        <>
        {showModal && <ContentModal contentInfo={content[activeTake]} updateLocalContent={updateLocalContent} setShowModal={setShowModal} /> }
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
                                onClick={()=>setShowModal(true)}
                            />
                        </div>
                        :
                        <div className="content-img-container" >
                            <img 
                                src={content[activeTake].picUrl || content[activeTake].fileUrl } 
                                className={content[activeTake].hidden ? "content-img-hidden" : "content-img"} 
                                alt="..." 
                                onClick={()=>setShowModal(true)}
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
                        return <div className={activeTake === index ? 'thumbnail-img-container selected-thumbnail' : 'thumbnail-img-container'} key={index} >
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