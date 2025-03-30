import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route}  from 'react-router-dom'
import MainPage from './routes/MainPage.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<App/>}></Route>
      <Route path="/main" element={<MainPage/>}></Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
