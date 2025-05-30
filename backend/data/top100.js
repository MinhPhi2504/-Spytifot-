import {listSong} from "./list-song.js"
export  const top100Types = [
     {
        style: 'nhac-tre',
        loi_tua: 'Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ, được Spytifot tự động tổng hợp dựa trên thông tin số liệu lượt nghe và lượt chia sẻ của từng bài hát trên phiên bản web và phiên bản Mobile. Dữ liệu sẽ được lấy trong 30 ngày gần nhất và được cập nhật liên tục',
        tac_gia: 'Dương DOMIC, Quang Hùng MasterD, Tùng Dương...',
        img: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/7/a/8/f/7a8f953aa385d67fc1fa4ca7448fd3e8.jpg'
     },
     {
        style: 'rap',
        loi_tua: 'Top 100 Nhạc Rap Việt Nam Hay Nhất là danh sách 100 ca khúc hot nhất hiện tại của thể loại nhạc Rap Việt Nam, được Spytifot tự động tổng hợp dựa trên thông tin số liệu lượt nghe và lượt chia sẻ của từng bài hát trên phiên bản web và phiên bản Mobile. Dữ liệu sẽ được lấy trong 30 ngày gần nhất và được cập nhật liên tục',
        tac_gia: 'Bray, MCK, HIEUTHUHAI...',
        img: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/8/b/7/f/8b7f4640f9ea3347f11925156bf59ac3.jpg'
     }, 
     {
        style: 'VPOP',
        loi_tua: 'Top 100 Nhạc V-Pop là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc V-Pop, được Spytifot tự động tổng hợp dựa trên thông tin số liệu lượt nghe và lượt chia sẻ của từng bài hát trên phiên bản web và phiên bản Mobile. Dữ liệu sẽ được lấy trong 30 ngày gần nhất và được cập nhật liên tục',
        tac_gia: 'Đức Phúc, Hòa Minzy, Sơn Tùng MTP...',
        img: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/7/5/2/8/752821a779e62f12b25be0d557654214.jpg'
     },
     {
        style: 'US-UK',
        loi_tua: 'Top 100 Nhạc Pop Âu Mỹ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc US-UK, được Spytifot tự động tổng hợp dựa trên thông tin số liệu lượt nghe và lượt chia sẻ của từng bài hát trên phiên bản web và phiên bản Mobile. Dữ liệu sẽ được lấy trong 30 ngày gần nhất và được cập nhật liên tục',
        tac_gia: 'Alan Walker, Avicii, Bruno Mars...',
        img: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/6/3/2/0/63207ba6db02bac379928147081397b2.jpg' 
     }
]
export function getSongsFromStyle (style) {
    const list = listSong.array.filter(Boolean);
    let listSongFromStyle = []
    for ( let i = 0; i < list.length; i++) {
        const songStyles = list[i].style
        for ( let j = 0; j < songStyles.length; j++) {
            if (songStyles [j] === style) {
                listSongFromStyle.push(list[i])
                break;
            }
        }
    }
    return listSongFromStyle
}