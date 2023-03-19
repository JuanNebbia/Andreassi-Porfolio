import React from 'react'
import { useParams } from 'react-router-dom'
import About from '../About/About'
import Contact from '../Contact/Contact'
import ContentDisplayer from '../ContentDisplayer/ContentDisplayer'
import Footer from '../Footer/Footer'
import Slider from '../Slider/Slider'
import Welcome from '../Welcome/Welcome'
import './Main.css'

const Main = () => {
    const {section} = useParams()

  return (
    <div>
        <Welcome />
        <Slider />
        <ContentDisplayer section={section} />
        <About />
        <div className="section-divider"></div>
        <Contact />
        <Footer /> 
    </div>
  )
}

export default Main