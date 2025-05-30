import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route}  from 'react-router-dom'
import MainPage from './routes/MainPage.jsx'
import TOP100 from './routes/top100.jsx'
import './index.css'
import App from './App.jsx'
import LoginPage from './routes/LoginPage.jsx'
import AdminPage from './routes/AdminPage.jsx'
import Thuvien from './routes/thuvien.jsx'
import PlaylistDetail from './components/Playlist.jsx'
import MainLayout from './components/MainLayout.jsx'
import ForgotPW from './routes/FogotPW.jsx'
import AdminPage_MainLayout from './components/AdminPage_Mainlayout.jsx'
import AdminPage_Dashboard from './routes/AdminPage_Dashboard.jsx'
//import AdminPage_QLBH from './routes/AdminPage_QLBH.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<App/>}></Route>
      <Route path="/main" element={<MainLayout/>}>
        <Route index element={<MainPage/>}></Route>
        <Route path='top100' element={<TOP100/>}></Route>
      </Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/forgotpw' element={<ForgotPW/>}></Route>
      <Route path='/admin' element={<AdminPage_MainLayout/>}>
        <Route index element={<AdminPage/>}></Route>
        <Route path='dashboard'element={<AdminPage_Dashboard/>}></Route>
        

        
      </Route>
      <Route path="/thuvien" element={<MainLayout />}>
        <Route index element={<Thuvien />} /> {/* /thuvien */}
        <Route path="/thuvien/:id_playlist" element={<PlaylistDetail />} /> {/* /thuvien/abc123 */}
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>
);
