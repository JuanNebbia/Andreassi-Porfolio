import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Inbox from './components/Inbox/Inbox';
import Page404 from './components/Page404/Page404';
import { AuthProvider, useFirebaseApp, useUser } from 'reactfire';
import { getAuth } from 'firebase/auth';
import Protected from './components/Protected/Protected.jsx';

function App() {
  const firebase = useFirebaseApp()
  const auth = getAuth(firebase)

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider sdk={auth}>
          <Routes>
            <Route path="/" element={<Navigate to="/photography" replace />} />
            <Route path='/:section' element={<Main />} />
              <Route 
                path='/:section/:contentId' 
                element={
                  <Protected>
                    <Main />
                  </Protected>
                } 
              />
              <Route 
                path='/:section/:contentId/:edit' 
                element={
                  <Protected>
                    <Main />
                  </Protected>
                } 
              />
              <Route 
                path='/messages' 
                element={
                  <Protected>
                    <Inbox />
                  </Protected>
                } />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
