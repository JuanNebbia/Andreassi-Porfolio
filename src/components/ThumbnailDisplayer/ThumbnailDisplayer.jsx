import React from 'react'
import './ThumbnailDisplayer.css'

const ThumbnailDisplayer = ({children, content}) => {

    const containerStyles = {
        width: content.length > 9 ? `37rem` : `calc(${content.length - 1 } * 3rem + 5rem + ${content.length}rem)`
    }

    return (
        <div className="thumbnail-displayer-container" style={containerStyles}>
            {children}
        </div>
    )
}

export default ThumbnailDisplayer