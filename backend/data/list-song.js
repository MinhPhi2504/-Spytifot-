import { v4 as uuidv4 } from 'uuid';
import { Music } from './hashTable';
import pic from "../../public/img/mac-dinh.jpeg"
let list_song = [];
let listSong = new Music();
let music_option = [];
let raw_playlist
let my_playlist = [];
let top_list = [];
let userID = localStorage.getItem('user_id')
console.log(userID)
export const list_album = [
    {
      id: uuidv4(),
      img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/0/8/9/a/089a2e63ec1d49c3f6be611f1aff1a89.jpg",
      name: "Nước Mắt Cá Sấu",
      author: "HIEUTHUHAI",
      album: ["HIEUTHUHAI"],
      style: "rap-viet",
      premium: 1,
      time: 2
    },
    {
        id: uuidv4(),
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/1/2/3/2/123240ddf23a8b6fef07fbe5b0d239c5.jpg",
        name: "Ôm Em Thật Lâu (Single)",
        author: "MONO",
        album: ["MONO"],
        style: "nhac-tre",
        premium: 0,
        time: 1
    },
    {
        id: uuidv4(),
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/8/c/1/6/8c166e2b9a0e45ca9a6c7bef40a81f74.jpg",
        name: "Dữ Liệu Quý (EP)",
        author: "Dương Domic",
        album: ["Dương Domic"],
        style: "nhac-tre",
        premium: 1,
        time: 1
    },
    {
        id: uuidv4(),
        img: "../../public/img/cao-oc-20.jpg",
        name: "Cao Ốc 20",
        author: "Bray",
        album: ["Bray"],
        style: "rap-viet",
        premium: 0,
        time: 3
    },
  ];
async function getPlaylistsByUser(userID) {
  try {
    const response = await fetch(`http://localhost:8080/get-playlist.php?userID=${userID}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    console.log("Status trả về:", response.status);

    const text = await response.text();
    console.log("Dữ liệu thô:", text);

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy playlist:', error);
    return []; 
  }
}



async function fetchSongsFromServer() {
  try {
    const response = await fetch('http://localhost:8080/get-song.php');
    const data = await response.json();
    console.log("Dữ liệu fetch được:", data);
    return data.map(song => ({
      id: song.id,
      song_name: song.song_name,
      img: song.img,
      audio: song.audio,
      album: song.album.split(',').map(a => a.trim()),
      lyric: song.lyric,
      author: song.author.split(',').map(a => a.trim()),
      premium: parseInt(song.premium),
      time: parseInt(song.time),
      style: song.style.split(',').map(s => s.trim()),
    }));
  } catch (error) {
    console.error('Lỗi khi tải bài hát:', error);
    return [];
  }
}

// Hàm khởi tạo toàn bộ dữ liệu
export async function initMusic() {
  list_song = await fetchSongsFromServer();
  listSong.setList(list_song, list_song.length);
  music_option = list_song.slice(0, 9);
  raw_playlist = await getPlaylistsByUser (localStorage.getItem("user_id"))
  my_playlist = raw_playlist.map(pl => {
    const firstSongId = pl.id_songs?.[0];
    const firstSong = firstSongId ? getSongFromId(firstSongId) : null;
    return {
      ...pl,
      img: firstSong ? firstSong.img : pic,
    };
  });
  console.log("My playlist: ", my_playlist)
  top_list = list_song.slice(5, 14);
}

// ✅ Các hàm truy xuất

export function getSongFromId(id) {
  return listSong.getSong(id);
}

export async function getPlaylistFromId(id) {
  return my_playlist.find(pl => pl.id_playlist === id);
}

export function formatTime(time) {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function generate_music_option() {
  let html = ``;
  list_song.forEach((music) => {
    html += `
      <div class="music-item">
        <img src="${music.img}">
        <div class="music-info">
          <h3>${music.song_name} 
            ${music.premium === 1 ? `<span class="premium">PREMIUM</span>` : ``}
          </h3>
          <p>${music.author}</p>
          <p>${music.time} năm trước</p>
        </div>
      </div>
    `;
  });
  document.querySelector('.music-list').innerHTML = html;
}

export function getSongFromAuthorName(author) {
  return list_song.filter(song => song.author.includes(author));
}

export function getAlbumFromAuthorName(author) {
  return list_album.find(album => album.author === author);
}

export function formatAuthors(authorsArray) {
  if (!Array.isArray(authorsArray) || authorsArray.length === 0) {
    return "Đang cập nhật"; 
  }
  return authorsArray.join(", ");
}

export function getRandomSong() {
  const randomNum = Math.floor(Math.random() * list_song.length);
  return list_song[randomNum] || "";
}

// ✅ Nếu cần lấy dữ liệu (sau khi initMusic), có thể export getter

export function getListSong() {
  return list_song;
}
export function getTopList() {
  return top_list;
}
export function getMusicOption() {
  return music_option;
}
export function getMyPlaylist() {
  return my_playlist;
}
export function getLSong () {
    return listSong
}

console.log(listSong)