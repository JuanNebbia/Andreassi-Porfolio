import React from 'react'
import './Content.css'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { AiOutlineFullscreen } from 'react-icons/ai'
import Loading from '../Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import ThumbnailDisplayer from '../ThumbnailDisplayer/ThumbnailDisplayer';

const Content = ({section, content, activeTake, setActiveTake}) => {
    const navigate = useNavigate()
    const {contentId} = useParams()

    const handleController = (direction) =>{
        if (direction === 'prev'){
            if (activeTake === (0)){
                setActiveTake(content.length - 1)
            }else{
                setActiveTake(activeTake - 1)
            }
        }else{
            if (activeTake === (content.length - 1)){
                setActiveTake(0)
            }else{
                setActiveTake(activeTake +1)
            }
        }
    }

    return (
        <>
        {content.length ? 
        <div className='content-container'>
            <div className='middle-section'>
                <button className="controller-prev" onClick={()=>handleController('prev')}>
                    <SlArrowLeft className={!contentId ? 'prev-icon' : 'icon-invisible'}/>
                </button>
                <div className='photography-img-container'>
                    {section === 'video' ?
                        <iframe
                            className="video-item" 
                            width="600" height="600" 
                            src={content[activeTake].videoUrl + '?controls=0&showinfo=0&modestbranding=1&rel=0&autoplay=1&mute=1'} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe> :
                        <div className="content-img-container">
                            <img 
                                src={content[activeTake].picUrl} 
                                className={content[activeTake].hidden ? "content-img-hidden" : "content-img"} 
                                alt="..." 
                                onClick={()=>navigate(`/${section}/${content[activeTake].id}`)}
                                />
                        </div>
                    }
                    {(content[activeTake].description || content[activeTake].title) && 
                        <AiOutlineFullscreen className='fullscreen-icon' onClick={()=>navigate(`/${section}/${content[activeTake].id}`)}/>
                    }
                </div>
                <button className="controller-next" onClick={()=>handleController('next')}>
                    <SlArrowRight className={!contentId ? 'next-icon' : 'icon-invisible'}/>
                </button>
            </div>
            <ThumbnailDisplayer content={content} activeTake={activeTake} setActiveTake= {setActiveTake}/>
        </div> : 
        <Loading />}
        </>
        
    )
}

export default Content