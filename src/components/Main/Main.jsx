import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Contact from '../Contact/Contact'
import { AuthContext } from '../../context/AuthContext'
import About from '../About/About'
import ContentDisplayer from '../ContentDisplayer/ContentDisplayer'
import Footer from '../Footer/Footer'
import Slider from '../Slider/Slider'
import Welcome from '../Welcome/Welcome'

const Main = () => {
    const {section} = useParams()
    const {logged} = useContext(AuthContext)

  return (
    <div>
        {logged && <Welcome />}
        <Slider />
        <Contact /> 
        <ContentDisplayer section={section} />
        <About />
        <Footer /> 
    </div>
  )
}

export default Main