import React from 'react'
import Slider1 from '../../img/Slider1.jpg'
import { SlArrowDown } from 'react-icons/sl';
import './Banner.css'

const Banner = () => {

  return (
    <>
        <div className="banner-container">
            <div className="banner-inner">
                <img src={Slider1} className="background-banner" alt="..."/>
                <div className="banner-phrase-container">
                    <h2 className='banner-phrase'>Lo importante <br></br> es  no dejar de <br></br> hacer preguntas</h2>
                    <p className='banner-info'>Una de las fotografías tomadas del eclipse de 1919 durante la expedición de Arthur Eddington, 
                    en el que se pudieron confirmar las predicciones de Einstein acerca de la curvatura de la luz 
                    en presencia de un campo gravitatorio.</p>
                </div>
            </div>
        </div>
        <a href="#content-displayer-container" className='scroll-down-icon'>< SlArrowDown /></a>
    </>

  );
}


export default Banner
