import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Page404 from './components/Page404/Page404';
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
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/photography" replace />} />
          <Route path='/:section' element={<Main />} />
          <Route path='/:section/:contentId' element={<Main />} />
          <Route path='/:section/:contentId/:edit' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
