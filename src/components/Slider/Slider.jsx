import React from 'react'
import Slider1 from '../../img/Slider1.jpg'
import { SlArrowDown } from 'react-icons/sl';
import './Slider.css'

const Slider = () => {

  return (
    <>
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={Slider1} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    <div className="slider-phrase-container">
                        <p className='slider-phrase'>Lo importante es no dejar de hacer preguntas</p>
                    </div>
                    <div className="slider-info-container">
                        <p className='slider-info'>Una de las fotografías tomadas del eclipse de 1919 durante la expedición de Arthur Eddington, 
                        en el que se pudieron confirmar las predicciones de Einstein acerca de la curvatura de la luz 
                        en presencia de un campo gravitatorio.</p>
                    </div>
                </div>
            </div>
        </div>
        <a href="#content-displayer-container" className='scroll-down-icon'>< SlArrowDown /></a>
    </>

  );
}


export default Slider
