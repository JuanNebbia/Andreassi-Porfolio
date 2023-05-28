import React from 'react'
import './ThumbnailDisplayer.css'

const ThumbnailDisplayer = ({children, content}) => {

    return (
        <div className="thumbnail-displayer-container">
            {children}
        </div>
    )
}

export default ThumbnailDisplayer