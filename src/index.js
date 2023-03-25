import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8yAX95FPFRlesf0RNV-fjev_rhzxZWe0",
  authDomain: "andreassi-porfolio.firebaseapp.com",
  projectId: "andreassi-porfolio",
  storageBucket: "andreassi-porfolio.appspot.com",
  messagingSenderId: "632042158252",
  appId: "1:632042158252:web:85ab0c55c84cf76cacc709",
  measurementId: "G-NN94NSFMHD"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();