import Header from "./MainPage_header.jsx";
import Sidebar from "./MainPage_Sidebar.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import { Outlet } from "react-router-dom";
import { getLSong, initMusic } from "../../backend/data/list-song.js";
import { useEffect, useState } from "react";

const MainLayout = () => {
  // const [currentSong, setCurrentSong] = useState(() => {
  //   const crSong = localStorage.getItem("currentSong");
  //   return crSong ? JSON.parse(crSong) : listSong.array[0]; 
  // });
  const [currentSong, setCurrentSong] = useState()
  let listSong = []
  useEffect(() => {
      (async () => {
        await initMusic(); // ✅ đảm bảo dữ liệu đã có
        listSong = await getLSong()
        const crSong = localStorage.getItem("currentSong");
        const parsed = crSong ? JSON.parse(crSong) : null;

        if (parsed && parsed.id) {
          setCurrentSong(parsed);
        } else {
          setCurrentSong(listSong.array[0]); // ✅ fallback sau khi load xong
        }
      })();
    }, []);

  // Lắng nghe thay đổi localStorage từ các component khác
  useEffect(() => {
    const handleStorageChange = () => { 
      const updated = localStorage.getItem("currentSong");
      if (updated) {
        setCurrentSong(JSON.parse(updated));
      }
    };

    // Lắng nghe sự kiện "storage" (chỉ hoạt động khi thay đổi từ tab khác)
    window.addEventListener("storage", handleStorageChange);// cái này dành cho các tab khác với tab hiện tại

    // Nếu bạn thay đổi localStorage trong cùng tab, bạn có thể dùng polling hoặc custom event
    const checkInterval = setInterval(() => { //polling
      const stored = localStorage.getItem("currentSong");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.id !== currentSong?.id) {
          setCurrentSong(parsed);
        }
      }
    }, 500); // check mỗi 500ms

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(checkInterval);
    };
  }, [currentSong]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-content" style={{ marginTop: '70px', marginLeft: '240px', height: 'auto'}}>
        <Outlet />
      </div>
      <MusicPlayer song={currentSong} />
    </>
  );
};

export default MainLayout;
