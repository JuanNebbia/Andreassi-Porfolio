import React from 'react'
import './Photography.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdOutlineSkipPrevious } from 'react-icons/md'


const Photography = ({content, setDisplay, activeTake, setActiveTake}) => {

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
        <div className='photography-container'>
            <div className="middle-section">
                <button className="controller-prev" onClick={()=>handleController('prev')}>
                    <IoIosArrowBack className='prev-icon'/>
                </button>
                <div className='photography-img-container'>
                    <img 
                        src={content[activeTake]} 
                        className="photography-img" 
                        alt="..." 
                        onClick={()=>setDisplay(activeTake)} /> 
                </div>
                <button className="controller-next" onClick={()=>handleController('next')}>
                    <IoIosArrowForward className='next-icon'/>
                </button>
            </div>
            <div className="outer-thumbnail-container">
            <div className="thumbnail-container" style={{left:`-${activeTake*2.5}rem`}}>
                {content.map((photo, i)=>
                    <button className={activeTake === i ? "thumbnail-btn active-thumbnail-btn" : "thumbnail-btn"} key={i}>
                        <img 
                            src={content[i]} 
                            className={activeTake === i ? "thumbnail active-thumbnail" : "thumbnail"}
                            alt="..." 
                            onClick={()=>setActiveTake(i)} />
                    </button>)} 
                {activeTake > 1 &&
                <button className='rewind-btn' onClick={()=>setActiveTake(0)}>
                    <MdOutlineSkipPrevious className='rewind-icon'/>
                </button>
                }
            </div>

            </div>

        </div>
    )
}

export default Photography