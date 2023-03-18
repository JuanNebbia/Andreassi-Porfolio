import React from 'react'
import './About.css'
import profileGif from '../../img/GifFoto.gif'
import ps from '../../img/icons/adobe/Recurso 8@2x.png'
import pr from '../../img/icons/adobe/Recurso 9@2x.png'
import me from '../../img/icons/adobe/Recurso 10@2x.png'
import lrc from '../../img/icons/adobe/Recurso 11@2x.png'
import ai from '../../img/icons/adobe/Recurso 12@2x.png'
import ae from '../../img/icons/adobe/Recurso 13@2x.png'
import win from '../../img/icons/productividad/Recurso 2@2x.png'
import ob from '../../img/icons/productividad/Recurso 3@2x.png'
import not from '../../img/icons/productividad/Recurso 4@2x.png'
import gpt from '../../img/icons/productividad/Recurso 5@2x.png'
import mac from '../../img/icons/productividad/Recurso 6@2x.png'
import drive from '../../img/icons/productividad/Recurso 7@2x.png'

const About = () => {
  return (
    <div className='about-container'>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-side front small card-img">
                <img src={profileGif} alt="" />
              </div>
              <div className="card-side back small">
                <p className='back-text'>Lo</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-side front small">
                <div className="icons-container">
                  <img src={ps} alt="" className='adobe-logo' />
                  <img src={pr} alt="" className='adobe-logo' />
                  <img src={me} alt="" className='adobe-logo' />
                  <img src={lrc} alt="" className='adobe-logo' />
                  <img src={ai} alt="" className='adobe-logo' />
                  <img src={ae} alt="" className='adobe-logo' />
                </div>
                <h6 className='adobe-title'>Adobe Suit</h6>
              </div>
              <div className="card-side back small">
                <p className='back-text'>importante</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-side front large">
                <h6 className='about-title'>Sobre Mí</h6>
                <p className='about-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa placeat illum cumque quas, 
                  libero magni porro accusantium cum dolores similique perferendis earum, 
                  pariatur voluptate velit illo architecto aperiam assumenda. Suscipit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorum repellendus cupiditate ab asperiores minima quos iusto non incidunt sit, tenetur eligendi ad iste quidem magnam iure nihil et natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ad, pariatur vero rem distinctio, temporibus nemo recusandae soluta aut dolor ullam? Velit perferendis quod cumque aliquam magnam! Nemo, ut tenetur!</p>
              </div>
              <div className="card-side back large">
                <p className='back-text'>es nunca dejar</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-side front small">
                <div className="icons-container">
                  <img src={win} alt="" className='adobe-logo' />
                  <img src={ob} alt="" className='adobe-logo' />
                  <img src={not} alt="" className='adobe-logo' />
                  <img src={gpt} alt="" className='adobe-logo' />
                  <img src={mac} alt="" className='adobe-logo' />
                  <img src={drive} alt="" className='adobe-logo' />
                </div>
              </div>
              <div className="card-side back small">
                <p className='back-text'>de hacer</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-side front small">
                <p className='heart-icon'>&lt;3</p>
              </div>
              <div className="card-side back small">
                <p className='back-text'>preguntas.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-side front large">
                <h6 className='about-title'>Formación</h6>
                <p className='about-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa placeat illum cumque quas, libero magni porro accusantium cum dolores similique perferendis earum, pariatur voluptate velit illo architecto aperiam assumenda. Suscipit!</p>
              </div>
              <div className="card-side back large">
                <p className='back-text'>&lt;3</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default About