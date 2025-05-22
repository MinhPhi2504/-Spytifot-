import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './routes/MainPage.jsx';
import TOP100 from './routes/top100.jsx';
import './index.css';
import App from './App.jsx';
import LoginPage from './routes/LoginPage.jsx';
import AdminPage from './routes/AdminPage.jsx';
import Thuvien from './routes/thuvien.jsx';
import PlaylistDetail from './components/Playlist.jsx';
import MainLayout from './components/MainLayout.jsx';
import ForgotPW from './routes/FogotPW.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/main" element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="top100" element={<TOP100 />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpw" element={<ForgotPW />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/thuvien" element={<MainLayout />}>
            <Route index element={<Thuvien />} />
            <Route path="/thuvien/:id_playlist" element={<PlaylistDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>
);
