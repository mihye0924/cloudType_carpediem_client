import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Reset } from 'styled-reset'
import './index.css'  
import { RecoilRoot } from 'recoil'; 
import React from 'react';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Reset/>
        <App />
      </BrowserRouter> 
    </RecoilRoot>
 </React.StrictMode> 
)
