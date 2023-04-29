import React from 'react'
import './ThumbnailDisplayer2.css'

const ThumbnailDisplayer2 = ({children, content}) => {

    const containerStyles = {
        width: content.length > 6 ? `calc(30vw + 6rem)` : `calc(${content.length - 1 } * 4vw + 6vw + ${content.length}rem)`
    }

    return (
        <div className="thumbnail-displayer-container2" style={containerStyles}>
            {children}
        </div>
    )
}

export default ThumbnailDisplayer2