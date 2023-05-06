import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebaseConfig from './config/firebase.config.js';
import { FirebaseAppProvider } from 'reactfire';

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </FirebaseAppProvider>
);

reportWebVitals();