import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route}  from 'react-router-dom'
import MainPage from './routes/MainPage.jsx'
import TOP100 from './routes/top100.jsx'
import './index.css'
import App from './App.jsx'
import LoginPage from './routes/LoginPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<App/>}></Route>
      <Route path="/main" element={<MainPage/>}></Route>
      <Route path='/top100' element={<TOP100/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
