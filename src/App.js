import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Inbox from './components/Inbox/Inbox';
import Page404 from './components/Page404/Page404';
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getAuth } from 'firebase/auth';
import Protected from './components/Protected/Protected.jsx';
import { getFirestore } from 'firebase/firestore';

function App() {
  const firebase = useFirebaseApp()
  const auth = getAuth(firebase)
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestoreInstance}>
            <Routes>
              <Route path='/not-found' element={<Page404 />} />
              <Route path="/" element={<Navigate to="/video" replace />} />
              <Route path='/:section' element={<Main />} />
              <Route path='/:section/:contentId' element={<Main />} />
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
          </FirestoreProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
