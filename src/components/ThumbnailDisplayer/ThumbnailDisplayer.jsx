import React from 'react'
import './ThumbnailDisplayer.css'

const ThumbnailDisplayer = ({content, activeTake, setActiveTake}) => {

    const calculateNextThumbnail = (position) => {
        let actualImg;
        if (activeTake === content.length - position){
            actualImg = content[0]
        }
        else if (activeTake === content.length - position + 1){
            actualImg = content[1]
        }
        else if (activeTake === content.length - position + 2){
            actualImg = content[2]
        }
        else {
            actualImg = content[activeTake + position]
        }
        return actualImg.picUrl
    }

    const calculatePrevThumbnail = (position) => {
        let actualImg;
        if (activeTake - position === (-1)){
            actualImg = content[content.length-1]
        }else if (activeTake - position === (-2)){
            actualImg = content[content.length-2]
        }else if (activeTake - position === (-3)){
            actualImg = content[content.length-3]
        }
        else {
            actualImg = content[activeTake - position]
        }
        return actualImg.picUrl
    }

    const toNext = (position) =>{
        let actualThumbnail;
        if (activeTake === content.length - position){
            actualThumbnail = 0
        }else if (activeTake > content.length - position){
            actualThumbnail = 1
        }
        else{
            actualThumbnail = activeTake + position
        }
        setActiveTake(actualThumbnail)
    }

    const toPrev = ( position) =>{
        let actualThumbnail;
        if (activeTake - position === (-1)){
            actualThumbnail = content.length-1
        } else if (activeTake - position === (-2)){
            actualThumbnail = content.length-2
        }else if (activeTake - position === (-3)){
            actualThumbnail = content.length-3
        }
        else{
            actualThumbnail = activeTake - position
        }
        setActiveTake(actualThumbnail)
    }

    return (
        <div className="thumbnail-displayer-container">
            <div className="inner-thumbnail-container">
                {content.length > 6 && 
                    <div className='thumbnail-img-container' onClick={()=>toPrev(3)}>
                        <img className='thumbnail-img' src={calculatePrevThumbnail(3)} alt='' />
                    </div>
                }
                {content.length > 4 && 
                    <div className='thumbnail-img-container' onClick={()=>toPrev(2)}>
                        <img className='thumbnail-img' src={calculatePrevThumbnail(2)} alt='' />
                    </div>
                }
                {content.length > 2 &&  
                    <div className='thumbnail-img-container' onClick={()=>toPrev(1)}>
                    <img className='thumbnail-img' src={calculatePrevThumbnail(1)} alt='' />
                </div>
                }     
                <div className='thumbnail-img-container selected-thumbnail' >
                    <img className='thumbnail-img' src={content[activeTake].picUrl} alt='' />
                </div>
                {content.length > 1 &&  
                    <div className='thumbnail-img-container' onClick={()=>toNext(1)}>
                        <img className='thumbnail-img' src={calculateNextThumbnail(1)} alt='' />
                </div>
                } 
                {content.length > 3 &&  
                        <div className='thumbnail-img-container' onClick={()=>toNext(2)}>
                            <img className='thumbnail-img' src={calculateNextThumbnail(2)} alt='' />
                        </div>
                }  
                {content.length > 6 &&  
                        <div className='thumbnail-img-container' onClick={()=>toNext(3)}>
                            <img className='thumbnail-img' src={calculateNextThumbnail(3)} alt='' />
                        </div>
                }  
            </div>
        </div>
    )
}

export default ThumbnailDisplayer