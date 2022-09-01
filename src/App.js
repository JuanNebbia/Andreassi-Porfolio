import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from './components/Slider/Slider';
import ContentDisplayer from './components/ContentDisplayer/ContentDisplayer';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { addDoc, collection, getFirestore } from 'firebase/firestore';
// import { photos, videos, branding, design, perritos } from './mock/mock';
// import { useEffect } from 'react';

function App() {


  // useEffect(()=>{
  //     const db = getFirestore()
  //     const designCollection = collection(db, 'design')
  //     design.map((item)=>{
  //       addDoc(designCollection, item)
  //       .then(({ id }) => console.log({id}))
  //     })
  //   },[])
  

  return (
    <div className="App">
      <Slider />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/photography" replace />} />
          <Route path='/:section' element={<ContentDisplayer />} />
        </Routes>
      </BrowserRouter>
      <About />
      <Footer />
    </div>
  );
}

export default App;
