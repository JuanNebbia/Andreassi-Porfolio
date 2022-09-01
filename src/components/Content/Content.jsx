import React from 'react'
import './Content.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiFillInfoCircle } from 'react-icons/ai'
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from 'react-icons/md'
import Loading from '../Loading/Loading';

const Photography = ({section, content, setDisplay, activeTake, setActiveTake}) => {

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


    const calculate = () => {
        return (- activeTake * 3.7)
    }

    return (
        <>
        {content.length ? 
        <div className={`content-container ${section}-section`}>
            <div className='middle-section'>
                <button className="controller-prev" onClick={()=>handleController('prev')}>
                    <IoIosArrowBack className='prev-icon'/>
                </button>
                <div className='photography-img-container'>
                    {section === 'video' ?
                        <iframe
                            className="video-item" 
                            width="560" height="315" 
                            src={content[activeTake].videoUrl + '?autoplay=1&mute=1&controls=0'} title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe> :
                        <img 
                            src={content[activeTake].picUrl} 
                            className="photography-img" 
                            alt="..." 
                            onClick={()=>setDisplay(activeTake)} />
                    }
                    {content[activeTake].description && 
                        <AiFillInfoCircle className='info-icon'
                        onClick={()=>setDisplay(activeTake)} />
                    }
                </div>
                <button className="controller-next" onClick={()=>handleController('next')}>
                    <IoIosArrowForward className='next-icon'/>
                </button>
            </div>
            <div className="outer-thumbnail-container">
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
            </div>
                <button className='rewind-btn' onClick={()=>setActiveTake(0)}>
                    <MdOutlineSkipPrevious className='rewind-icon'/>
                </button>
                <button className='rewind-btn' onClick={()=>setActiveTake(content.length-1)}>
                    <MdOutlineSkipNext className='rewind-icon'/>
                </button>
        </div> : 
        <Loading />}
        </>
        
    )
}

export default Photography