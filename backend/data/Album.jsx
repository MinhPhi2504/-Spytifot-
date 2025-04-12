import { list_album } from "./list-song.js";
import { useState, useEffect } from "react";

const Albums = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        setAlbums(list_album); // Cập nhật danh sách albums
    }, []);
    return (
        <div className=" p-4 ">
        <h2 className="text-white fs-4 fw-bold mb-4" style={{margin: '26px', marginBottom: '20px'}}>Album Hot</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2">
          {albums.map((album) => (
            <div key={album.id} className="col text-center text-white">
              <img
                src={album.img}
                className="object-cover rounded mb-2"
                style={{ width: '200px', height: '220px' }}
              />
              <p className="fw-semibold" style={{ margin: 0 , fontFamily: "sans-serif", fontWeight: 14}}>{album.song_name}</p>
              <p className="text-white" style={{ opacity: 0.6, margin: 0, fontFamily: "sans-serif" }}>{album.author}</p>
            </div>
          ))}
        </div>
      </div>
      
    );
  };
  
  export default Albums;