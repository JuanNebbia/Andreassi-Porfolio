import React from 'react'
import './Photography.css'
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';


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
            <div className="thumbnail-container">
                {content.map((photo, i)=>
                    <button className={activeTake === i ? "thumbnail-btn active-thumbnail-btn" : "thumbnail-btn"} key={i}>
                        <img 
                            src={content[i]} 
                            className={activeTake === i ? "thumbnail active-thumbnail" : "thumbnail"}
                            alt="..." 
                            onClick={()=>setActiveTake(i)} />
                    </button>)} 
            </div>

        </div>
    )
}

export default Photography