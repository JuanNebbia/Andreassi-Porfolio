import React from 'react'
import { useParams } from 'react-router-dom'
import AboutContainer from '../AboutContainer/AboutContainer'
import Contact from '../Contact/Contact'
import ContentDisplayer from '../ContentDisplayer/ContentDisplayer'
import Footer from '../Footer/Footer'
import Banner from '../Banner/Banner'
import Welcome from '../Welcome/Welcome'
import './Main.css'

const Main = () => {
    const {section} = useParams()

  return (
    <div>
        <Welcome parent='main' />
        <Banner />
        <ContentDisplayer section={section} />
        <AboutContainer />
        <div className="section-divider"></div>
        <Contact />
        <Footer /> 
    </div>
  )
}

export default Main