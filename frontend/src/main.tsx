import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";


const app = (
          <BrowserRouter>
            <App />
          </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  app
);
