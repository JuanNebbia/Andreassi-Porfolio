import React from 'react'
import './ThumbnailDisplayer.css'

const ThumbnailDisplayer = ({children, content}) => {

    const containerStyles = {
        width: '70vh'
    }

    return (
        <div className="thumbnail-displayer-container" style={containerStyles}>
            {children}
        </div>
    )
}

export default ThumbnailDisplayer