import React from 'react'
import './Content.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiFillInfoCircle } from 'react-icons/ai'
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import ThumbnailDisplayer from '../ThumbnailDisplayer/ThumbnailDisplayer';

const Content = ({section, content, setDisplay, activeTake, setActiveTake}) => {
    const navigate = useNavigate()

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

    // const calculate = () => {
    //     return (- activeTake * 3.7)
    // }

    return (
        <>
        {content.length ? 
        <div className='content-container'>
            <div className='middle-section'>
                <button className="controller-prev" onClick={()=>handleController('prev')}>
                    <IoIosArrowBack className='prev-icon'/>
                </button>
                <div className='photography-img-container'>
                    {section === 'video' ?
                        <iframe
                            className="video-item" 
                            width="400" height="1000" 
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
                        <AiFillInfoCircle className='info-icon'
                        onClick={()=>setDisplay(content[activeTake])} />
                    }
                </div>
                <button className="controller-next" onClick={()=>handleController('next')}>
                    <IoIosArrowForward className='next-icon'/>
                </button>
            </div>
            <ThumbnailDisplayer content={content} activeTake={activeTake} setActiveTake= {setActiveTake}/>
            {/* <div className="outer-thumbnail-container">
                <div className="thumbnail-container" style={{left:`${calculate()}rem`}}>
                    {content.map((photo, i)=>
                        <button className={activeTake === i ? "thumbnail-btn active-thumbnail-btn" : "thumbnail-btn"} key={i}>
                            <div 
                                className={activeTake === i ? 
                                "active-thumbnail-img-container" : 
                                "thumbnail-img-container"}
                            >
                                <img 
                                    src={photo.picUrl} 
                                    className={activeTake === i ? "thumbnail active-thumbnail" : "thumbnail"}
                                    alt="..." 
                                    onClick={()=>setActiveTake(i)} />
                            </div>
                        </button>)} 
                </div>
            </div> */}
        </div> : 
        <Loading />}
        </>
        
    )
}

export default Content