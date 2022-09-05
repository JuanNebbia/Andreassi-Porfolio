import React from 'react'
import { useParams } from 'react-router-dom'
import Contact from '../../Contact/Contact'
import About from '../About/About'
import ContentDisplayer from '../ContentDisplayer/ContentDisplayer'
import Footer from '../Footer/Footer'
import Slider from '../Slider/Slider'

const Main = () => {
    const {section} = useParams()

  return (
    <div>
        <Slider />
        <Contact /> 
        <ContentDisplayer section={section} />
        <About />
        <Footer /> 
    </div>
  )
}

export default Main