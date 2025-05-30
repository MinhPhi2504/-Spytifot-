import { v4 as uuidv4 } from 'uuid';
import { Music } from './hashTable';

const list_song = [
    {
        id: uuidv4(),
        img: "/img/dua-nhau-di-tron.jpg",
        song_name: "Đưa Nhau Đi Trốn",
        author: "Đen Vâu, Linh Cáo",
        album: ["Đen Vâu", ", Linh Cáo"],
        style: ["nhac-tre", "VPOP"],
        premium: 1,
        time: 3,
        audio: "/mp3/DuaNhauDiTron.mp3",
    },
    {
        id: uuidv4(),
        img: "/img/mua-mua=ay.jpg",
        song_name: "Mùa Mưa Ấy",
        author: "Vũ",
        album: ["Vũ"],
        style: ["nhac-tre", "VPOP"],
        time: 1,
        audio: "/mp3/MuaMuaAy.mp3"
    },
    {
        id: uuidv4(),
        img: "/img/shhhh.jpg",
        song_name: "shhhhhhh...",
        author: "WEAN ft Tlinh",
        album: ["WEAN", ", Tlinh"],
        style: ["nhac-tre", "VPOP"],
        premium: 0,
        time: 3,
        audio: "/mp3/Shhhh.mp3"
    },
    {
        id: uuidv4(),
        img: "/img/dong-thoi-gian.jpg",
        song_name: "Dòng Thời Gian",
        author: "Nguyễn Hải Phong",
        album: ["Nguyễn Hải Phong"],
        style: ["nhac-tre"],
        premium: 0,
        time: 4,
        audio: "/mp3/DongThoiGian.mp3"
    },
    {
        id: uuidv4(),
        img: "/img/mot-trieu-like.jpg",
        song_name: "Một Triệu Like",
        author: "Đen Vâu",
        album: ["Đen Vâu"],
        style: ["nhac-tre", "rap"],
        premium: 0,
        time: 2,
        audio: "/mp3/MotTrieuLike.mp3"
    },
    {
        id: uuidv4(),
        img: "/img/exit-sign.jpg",
        song_name: "Exit Sign",
        author: "HIEUTHUHAI prod. by Kewtile",
        album: ["HIEUTHUHAI", " Kewtile"],
        style: ["nhac-tre", "rap"],
        premium: 1,
        time: 3,
        audio: "/mp3/ExitSign-HIEUTHUHAI.mp3",
    },
    {
        id: uuidv4(),
        img: "/img/hen-gap-em-duoi-anh-trang.jpg",
        song_name: "Hẹn Gặp Em Dưới Ánh Trăng",
        author: "HURRYKNG, HIEUTHUHAI, MANBO",
        album: ["HURRYKNG", "HIEUTHUHAI", "MANBO"],
        style: ["nhac-tre"],
        premium: 1,
        time: 3,
        audio: "/mp3/HenGapEmDuoiAnhTrang.mp3"
    },
    {
        id: uuidv4(),
        img: "/public/img/nang-tho.jpg",
        song_name: "Nàng Thơ",
        author: "Hoàng Dũng",
        album: ["Hoàng Dũng"],
        style: ["nhac-tre"],
        premium: 0,
        time: 1,
        audio: "/mp3/NangTho.mp3"
    },
    {
        id: uuidv4(),
        img: "/img/ban-doi.jpg",
        song_name: "BẠN ĐỜI",
        author: "KARIK ft. GDUCKY",
        album: ["KARIK", "GDUCKY"],
        style: ["nhac-tre", "VPOP"],
        premium: 0,
        time: 3,
        audio: "/mp3/BanDoi.mp3"
    },
    {
        id: uuidv4(),
        img: "/img/am-tham-ben-em.jpg",
        song_name: "Âm thầm bên em",
        author: "Sơn Tùng MTP",
        album: ["Sơn Tùng M-TP"],
        style: ["nhac-tre", "VPOP"],
        premium: 0,
        time: 3,
        audio: "/mp3/AmThamBenEm.mp3"
    },
    {
        id: uuidv4(),
        img: "/img/mat-ket-noi.jpg",
        song_name: "Mất Kết Nối",
        author: "Dương Domic",
        album: ["Dương Domic"],
        style: ["nhac-tre", "rap"],
        premium: 0,
        time: 1,
        audio: "/mp3/MatKetNoi.mp3"
    },
    {
        id: uuidv4(),
        img: "/img/tran-bo-nho.jpg",
        song_name: "Tràn Bộ Nhớ",
        author: "Dương Domic",
        album: ["Dương Domic"],
        style: ["nhac-tre", "rap"],
        premium: 1,
        time: 1,
        audio: "/mp3/TranBoNho.mp3"
    },
    {
        id: uuidv4(),
        img: "/img/chiu-cach-minh-noi-thua.jpg",
        song_name: "Chịu Cách Mình Nói Thua",
        author: "Rhyder",
        album: ["Rhyder"],
        style: ["nhac-tre", "rap"],
        premium: 0,
        time: 2,
        audio: "/mp3/ChiuCachMinhNoiThua.mp3"
    },
    {
        id: uuidv4(),
        img: "/img/chua-phai-la-yeu.jpg",
        song_name: "Chưa Phải Là Yêu",
        author: "HURRYKNG",
        album: ["HURRYKNG"],
        style: ["nhac-tre", "rap"],
        premium: 0,
        time: 2,
        audio: "/mp3/ChuaPhaiLaYeu.mp3"
    },
    {
        id: uuidv4(),
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_A3vshwke16DoO1XKIOoFls176UwYTelEuQ&s",
        song_name: "Thu Cuối",
        author: "Mr.T, Yanbi, Hằng BingBoong",
        album: ["Thu Cuối"],
        style: ["nhac-tre", "VPOP"],
        premium: 0,
        time: 2,
        audio: "/mp3/ThuCuoi.mp3"        
    },
    {
        id: uuidv4(),
        img: "/img/loi-nho.jpg",
        song_name: "Lối Nhỏ",
        author: "Đen Vâu",
        album: ["Đen Vâu"],
        style: ["rap","nhac-tre", "VPOP"],
        premium: 1,
        time: 2,
        audio: "/mp3/LoiNho.mp3"
    }, 
    {
        id: uuidv4(),
        img: "/img/cao-oc-20.jpg",
        song_name: "Cao Ốc 20",
        author: "Bray",
        album: ["Bray"],
        style: ["rap"],
        premium: 0,
        time: 3,
        audio: "/mp3/CaoOc20.mp3"
    }, 
    {
        id: uuidv4(),
        img: "/img/du-cho-tan-the.jpg",
        song_name: "Dù Cho Tận Thế",
        author: "Erik",
        album: ["Erik"],
        style: ["rap","nhac-tre", "VPOP"],
        premium: 0,
        time: 3,
        audio: "/mp3/DuChoTanThe.mp3"
    }, 
    {
        id: uuidv4(),
        img: "/img/wrong-times.jpg",
        song_name: "Wrong Times",
        author: "PUPPY x DANGRANGTO",
        album: ["PUPPY x DANGRANGTO"],
        style: ["nhac-tre", "rap", "VPOP"],
        premium: 0,
        time: 3,
        audio: "/mp3/WrongTimes.mp3"
    }
];
const listSong = new Music();
    listSong.setList(list_song, list_song.length)
export {listSong}
export const music_option = list_song.slice(0,9)

export const list_album = [
    {
        id: uuidv4() ,
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/0/8/9/a/089a2e63ec1d49c3f6be611f1aff1a89.jpg",
        song_name: "Nước Mắt Cá Sấu",
        author: "HIEUTHUHAI",
        album: ["HIEUTHUHAI"],
        style: "rap-viet",
        premium: 1,
        time: 2
    },
    {
        id: uuidv4(),
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/1/2/3/2/123240ddf23a8b6fef07fbe5b0d239c5.jpg",
        song_name: "Ôm Em Thật Lâu (Single)",
        author: "MONO",
        album: ["MONO"],
        style: "nhac-tre",
        premium: 0,
        time: 1
    },
    {
        id: uuidv4(),
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/8/c/1/6/8c166e2b9a0e45ca9a6c7bef40a81f74.jpg",
        song_name: "Dữ Liệu Quý (EP)",
        author: "Dương Domic",
        album: ["Dương Domic"],
        style: "nhac-tre",
        premium: 1,
        time: 1
    },
    {
        id: uuidv4(),
        img: "../../public/img/cao-oc-20.jpg",
        song_name: "Cao Ốc 20",
        author: "Bray",
        album: ["Bray"],
        style: "rap-viet",
        premium: 0,
        time: 3
    },
]
export const raw_playlist = [
   {
    id_playlist: 2222,
    name: "Nghe khi trời mưa",
    id_songs: list_song.slice(0,4).map(song => song.id),
   },
   {
    id_playlist: 2223,
    name: "Nghe khi trời nắng",
    id_songs: list_song.slice(5,9).map(song => song.id),
   }
];
export const my_playlist = raw_playlist.map((pl) => {
    const firstSong = getSongFromId(pl.id_songs[0]);
    return {
      ...pl,
      img: firstSong ? firstSong.img : "No Image",
    };
  });
export function getSongFromId(id) {
    return listSong.getSong(id)
}
export function getPlaylistFromId (id) {
    return my_playlist.find((pl) => pl.id_playlist === id);
}  
export const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
export const top_list = list_song.slice(5,14)

export function generate_music_option () {
    let html = ``
    list_song.forEach((music) => {
        html += `
            <div className="music-item">
                <img src="${music.img}">
            <div className="music-info">
                <h3>${music.song_name} 
                    ${music.premium === 1 ? `<span className="premium">PREMIUM</span>` : ``}
                </h3>
                <p>${music.author}</p>
                <p>${music.time} năm trước</p>
            </div>
        </div>
        `
    }) 
    document.querySelector('.music-list').innerHTML = html
}

