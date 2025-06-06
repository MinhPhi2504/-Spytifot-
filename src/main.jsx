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
import AlbumCard from './routes/AlbumCard.jsx';
import KaraokePage from './routes/KaraokePage.jsx';
import TopChartItem from './routes/TopChart.jsx';
import Top100List from './routes/top100list.jsx';
import Theme from './routes/Theme.jsx';
import PrivacyPolicy from './routes/chinh-sach-bao-mat.jsx';
import Author from './routes/Author.jsx';
//import AdminPage_QLBH from './routes/AdminPage_QLBH.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/main" element={<MainLayout />}>
                <Route index element={<MainPage />} />
                <Route path="top100" element={<TOP100 />}/>
                <Route path='/main/top100/:style' element={<Top100List />} /> 
                <Route path='/main/:id_song' element = {<AlbumCard/>}/>
                <Route path="bang-xep-hang" element={<TopChartItem />} />
                <Route path="chu-de-va-the-loai" element={<Theme />} />
                <Route path="/main/chu-de-va-the-loai/:style" element={<Top100List />} /> 
              </Route>
              <Route path="/karaoke/:id_song" element={<KaraokePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicy />} />
              <Route path="/quen-mat-khau" element={<ForgotPW />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/thuvien" element={<MainLayout />}>
                <Route index element={<Thuvien />} />
                <Route path="/thuvien/:id_playlist" element={<PlaylistDetail/>}/>
                <Route path="/thuvien/album/:author_name" element={<Author/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
  </StrictMode>
);
