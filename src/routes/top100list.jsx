import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import "../assets/styles/top100list.css";
import {top100Types} from "../../backend/data/top100.js"
import {getSongsFromStyle} from "../../backend/data/top100.js"
import { formatAuthors } from "../../backend/data/list-song.js";
 function Top100List () {
    const [songs, setSongs] = useState([]);
    const url = useParams()
    const style = url.style
    console.log(style)
    const typeList = top100Types.find((type) => type.style === style )
    useEffect(() => {
        const fetchSongs = async () => {
        const result = await getSongsFromStyle(style);
        setSongs(result);
        console.log("Kết quả: ",result)
        };
    fetchSongs();
  }, [style]);

    return (
        <>
        <div className="top100list-container" >
            <div className="d-flex intro-place" style={{gap: '30px', marginLeft: '20px'}}>
                <div className="text-white">
                    <img
                        src= {typeList.img}
                        className="mb-2"
                        style={{ width: '150px', height: '150px', borderRadius: '20px'}}
                    />
                </div>
                <div className="style-info " >
                    <p>Các nghệ sĩ: {typeList.tac_gia}</p>
                    <p>Tổng số bài hát: 30</p>
                    <p>Lời tựa: {typeList.loi_tua}. </p>
                </div>
            </div>
            <div className="card-music-container">
                <div className ="card-music row card-music-list justify-content-center ">
                    {songs.map((song) => (
                    <div className="col-12 col-sm-6 col-md-4 card text-white " style={{ width: '300px', borderRadius: '1rem' }} onClick={() => {localStorage.setItem("currentSong", JSON.stringify(song))}}>
                        <img
                            src={song.img} 
                            className="card-img"
                            style={{borderTopLeftRadius: '1rem',
                                    borderTopRightRadius: '1rem',  
                                    width: '100%',
                                    height: '250px',
                                    padding: '20px 10px 0 10px'
                                }}
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold">{song.song_name}</h5>
                            <p className="card-text">{formatAuthors(song.author)}</p>
                        </div>
                    </div>
                    ))}               
                </div>
            </div>
        </div>
        </>
    )
 }
 export default Top100List