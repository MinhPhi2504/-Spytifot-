import "../assets/styles/theme.css"
import { useNavigate } from "react-router-dom"
function Theme () {
    const navigate = useNavigate()
    return (<>
        <div className="theme-container">
            <div className="theme-img vh-100">
                <img src="https://photo-zmp3.zmdcdn.me/cover/c/9/b/3/c9b3c456eeabd9d4e3241666397d71aa.jpg" alt="" />
            </div>
            <div className="Chill ">
                <h3 className="Chill-title">Chill Place</h3>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    <div onClick = {() => {navigate(`/main/chu-de-va-the-loai/nhac-hoa-loi-viet`)}} >
                        <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/9/b/e/6/9be6f892a7f95ef25632752dd2a319c2.jpg" alt="" style={{ width: '240px', height: '260px', borderRadius: '15px'}} />
                        <p className="text-white" style={{opacity: 0.6, margin: '5px 0 0 3px', fontFamily: "sans-serif", width: 240}}>Lắng nghe những giai điệu nhạc Hoa lời Việt chữa lành</p>
                    </div>
                    <div onClick = {() => {navigate(`/main/chu-de-va-the-loai/VPOP`)}}>
                        <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/2/9/5/d/295d1acf510893079a8d92cc0bc92120.jpg" alt="" style={{ width: '240px', height: '260px', borderRadius: '15px' }}/>
                        <p className="text-white" style={{opacity: 0.6, margin: '5px 0 0 3px', fontFamily: "sans-serif" , width: 240}}>Nghe V-POP cực chill trên từng giai điệu</p>
                    </div>
                    <div onClick = {() => {navigate(`/main/chu-de-va-the-loai/lofi`)}}>
                        <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/2/4/5/3/24538985249cd4d3b324b4a4a09ad288.jpg" alt="" style={{ width: '240px', height: '260px', borderRadius: '15px' }}/>
                        <p className="text-white" style={{opacity: 0.6, margin: '5px 0 0 3px', fontFamily: "sans-serif", width: 240}}>Một chút thôi...Nhớ cả đời</p>
                    </div>
                    <div onClick = {() => {navigate(`/main/chu-de-va-the-loai/chill`)}}>
                        <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/c/d/c/b/cdcba8f6026e4e90e33f2d4d4604d515.jpg" alt="" style={{ width: '240px', height: '260px', borderRadius: '15px' }}/>
                        <p className="text-white" style={{opacity: 0.6, margin: '5px 0 0 3px', fontFamily: "sans-serif", width: 240}}>Lãng mạn là khi có bạn...</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Theme