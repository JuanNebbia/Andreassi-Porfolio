import React, { useCallback, useEffect, useRef, useState } from 'react'
import './ThumbnailDisplayer2.css'

const ThumbnailDisplayer2 = ({content, activeTake, setActiveTake, direction}) => {
    const innerContainer = useRef(null)
    const [externalMove, setExternalMove] = useState(false)


    useEffect(() => {
        if(externalMove && innerContainer.current.children.length > 7){
            move(activeTake + direction)
        }
        setExternalMove(true)
    },[activeTake, direction])

    const handleOnClick = (event, index) => {
        setActiveTake(index)
        if(externalMove && innerContainer.current.children.length > 7){
            move(index)
        }
        setExternalMove(false)
    }

    const move = useCallback((index) => {
        const translateWidth = 7
        innerContainer.current.style.transition = `200ms ease-out all`;
        if(Math.abs(index - activeTake) === innerContainer.current.children.length - 1){
            innerContainer.current.style.transform = `translateX(${-1 * translateWidth}rem)`;
        }else{
            innerContainer.current.style.transform = `translateX(${-1 * (index - activeTake) * translateWidth}rem)`;
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

    return (
    <div className="thumbnail-displayer-container2" style={{width: `${content.length > 6 ? 50 : content.length * 7 + 1}rem`, marginLeft: `calc((100vw - ${content.length > 6 ? 49 : content.length * 7 + 1}rem) / 2)`}}>
            <div className="inner-thumbnail-container2" ref={innerContainer}>
                {content.map((item, index) => {
                    return <div className={activeTake === index ? 'thumbnail-img-container2 selected-thumbnail2' : 'thumbnail-img-container2'} key={index} onClick={(event)=> handleOnClick(event, index)}>
                        <img className='thumbnail-img2' src={item.picUrl} alt='' />
                    </div>
                })}
            </div>
        </div>
    )
}

export default ThumbnailDisplayer2