import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Inbox from './components/Inbox/Inbox';
import Page404 from './components/Page404/Page404';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/photography" replace />} />
          <Route path='/:section' element={<Main />} />
          <Route path='/:section/:contentId' element={<Main />} />
          <Route path='/:section/:contentId/:edit' element={<Main />} />
          <Route path='/messages' element={<Inbox />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
