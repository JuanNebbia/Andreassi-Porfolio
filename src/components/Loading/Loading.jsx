import React from 'react'
import './Loading.css'
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {

  return (
    <div className='loading-spinner-container'>
      <Spinner className="loading-spinner" animation="grow" role="status" variant="info" />
    </div>
  )
}

export default Loading