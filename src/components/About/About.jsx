import React from 'react'
import Gif from '../../img/mateogirando.gif'
import './About.css'

const About = () => {
  return (
    <div className='about-container'>
        <img src={Gif} className='about-img' alt='acerca de Mateo'/>
        <p className='about-text'>
          Tengo 25 años. Trabajo en la creación de contenidos para redes sociales y medios de comunicación. 
          Me especializo en diseño gráfico, producciones audiovisuales, desarrollo web y animación 2D. 
          Integré equipos de trabajo vinculados al Gobierno de la Provincia de Córdoba, la Municipalidad de Córdoba 
          y diferentes clientes del ámbito corporativo, académico y del tercer sector.
        </p>
    </div>
  )
}

export default About