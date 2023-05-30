import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AboutContainer from '../AboutContainer/AboutContainer'
import Contact from '../Contact/Contact'
import ContentDisplayer from '../ContentDisplayer/ContentDisplayer'
import Footer from '../Footer/Footer'
import Banner from '../Banner/Banner'
import Welcome from '../Welcome/Welcome'
import Snake from '../Snake/Snake'
import './Main.css'

const Main = () => {
    const {section} = useParams()
    const [ gameMode, setGameMode ] = useState(false)

  return (
    <div className='main-container'>
        <Welcome parent='main' />
        <Banner />
        <ContentDisplayer section={section} />
        <AboutContainer />
        <div className="section-divider"></div>
        <Contact />
        {gameMode && <Snake gameMode={gameMode} setGameMode={setGameMode} />}
        <Footer gameMode={gameMode} setGameMode={setGameMode} /> 
    </div>
  )
}

export default Main