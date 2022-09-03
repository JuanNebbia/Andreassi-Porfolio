import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Slider1 from '../../img/Slider1.jpg'
import Slider2 from '../../img/Slider2.jpg'
import './Slider.css'

const Slider = () => {
    const {logged} = useContext(AuthContext)

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
        {logged && <p className='welcome-sign'>Bienvenido Mateox, tas registrado</p>}
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
            <div className="carousel-item">
            <img src={Slider2} className="d-block w-100" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
                <div className="slider-phrase-container">
                    <p className='slider-phrase'>A menos que te pongas medio densito</p>
                </div>
                <div className="slider-info-container">
                    <p className='slider-info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Nemo suscipit odit exercitationem illo labore sed sunt tempora aspernatur expedita eaque? 
                    Consequuntur quidem maiores libero, perspiciatis distinctio nulla voluptate quasi obcaecati!</p>
                </div>
            </div>
            </div>
            <div className="carousel-item">
            <img src={Slider1} className="d-block w-100" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
                <div className="slider-phrase-container">
                    <p className='slider-phrase'>Tampoco la pavada</p>
                </div>
                <div className="slider-info-container">
                    <p className='slider-info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Nemo suscipit odit exercitationem illo labore sed sunt tempora aspernatur expedita eaque? 
                    Consequuntur quidem maiores libero, perspiciatis distinctio nulla voluptate quasi obcaecati!</p>
                </div>
            </div>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="visually-hidden">Next</span>
        </button>
    </div>
  );
}


export default Slider
