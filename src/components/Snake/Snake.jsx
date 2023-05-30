import React from 'react'
import './Snake.css'
import { motion } from 'framer-motion'

const Snake = ({gameMode, setGameMode}) => {

  const closeModal = (event) =>{
    if (event.target.classList.contains('close')){
      setGameMode(false)
    }
  }

  return (
    <motion.div>
      <div className='game-outer-container close' onClick={closeModal}>
        <div className='game-container'  >
            <iframe height="500" style={{width: '100%'}} title="Snake - Vivorita" src="https://codepen.io/AndreassiMateo/embed/abaRYVR?default-tab=result" frameBorder="no" loading="lazy" allowtransparency="true" allowFullScreen={true}>
                See the Pen <a href="https://codepen.io/AndreassiMateo/pen/abaRYVR">
                Snake - Vivorita</a> by Mateo Andreassi (<a href="https://codepen.io/AndreassiMateo">@AndreassiMateo</a>)
                on <a href="https://codepen.io">CodePen</a>.
            </iframe>
        </div>
      </div>
    </motion.div>
  )
}

export default Snake