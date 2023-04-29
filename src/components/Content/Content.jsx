import React, { useCallback, useRef, useState } from 'react'
import './Content.css'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { RxEnterFullScreen } from 'react-icons/rx'
import Loading from '../Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import ThumbnailDisplayer from '../ThumbnailDisplayer/ThumbnailDisplayer';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import ThumbnailDisplayer2 from '../ThumbnailDisplayer2/ThumbnailDisplayer2.jsx';

const Content = ({ section, content, activeTake, setActiveTake }) => {
    const navigate = useNavigate()
    const {contentId} = useParams()
    const [show, setShow] = useState(false);
    const [clickeable, setClickleable] = useState(true)
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
                console.log(innerContainer.current.children[innerContainer.current.children.length - (i + 1)].children);
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


    

    return (
        <>
        {content.length ? 
        <div className='content-container'>
            <div className='middle-section'>
                <button className="controller-prev" onClick={()=> clickeable && handleController(true)}>
                    <SlArrowLeft className={!contentId ? 'prev-icon' : 'icon-invisible'}/>
                </button>
                <div className='photography-img-container'>
                    {section === 'video' ?
                        <iframe
                            className="video-item" 
                            width="600" height="600" 
                            src={content[activeTake].videoUrl + '?controls=0&showinfo=0&modestbranding=1&rel=0&autoplay=1&mute=1'} 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe> :
                        <div className="content-img-container" >
                            <img 
                                src={content[activeTake].picUrl || content[activeTake].fileUrl } 
                                className={content[activeTake].hidden ? "content-img-hidden" : "content-img"} 
                                alt="..." 
                                onClick={()=>navigate(`/${section}/${content[activeTake].id}`)}
                                />
                        </div>
                    }
                    {(content[activeTake].description || content[activeTake].title) && 
                    <div className="full-screen-icon-container" ref={fullscreenIcon} onMouseEnter={(()=>setShow(true))} onMouseLeave={(()=>setShow(false))}>
                        <RxEnterFullScreen className='fullscreen-icon' onClick={()=>navigate(`/${section}/${content[activeTake].id}`)}/>
                        <Overlay target={fullscreenIcon.current} show={show} placement="left">
                            {(props) => (
                            <Tooltip id="tooltip" {...props} className='info-tooltip' delay={{ show: 250, hide: 400 }}>
                                <p className='tooltip-text'>Hacé click para ver contenido adicional</p>
                            </Tooltip>
                            )}
                        </Overlay>
                    </div>
                    }
                </div>
                <button className="controller-next" onClick={()=> clickeable && handleController(false)}>
                    <SlArrowRight className={!contentId ? 'next-icon' : 'icon-invisible'}/>
                </button>
            </div>
            <ThumbnailDisplayer2 content={content}>
                <div className="inner-thumbnail-container2" ref={innerContainer}>
                    {content.map((item, index) => {
                        return <div className={activeTake === index ? 'thumbnail-img-container2 selected-thumbnail2' : 'thumbnail-img-container2'} key={index} >
                            <img className='thumbnail-img2' src={item.picUrl} alt='' />
                        </div>
                    })}
                </div>
            </ThumbnailDisplayer2>
        </div> : 
        <Loading />}
        </>
        
    )
}

export default Content