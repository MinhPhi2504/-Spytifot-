import "../assets/styles/top100.css"
import Header from "../components/MainPage_header.jsx"
import Sidebar from "../components/MainPage_Sidebar.jsx"
function TOP100 () {

    return <>
        <Header></Header>
        <Sidebar></Sidebar>
        <div className="body-container">
            <div className="img_title">
                <img src="./../public/img/top100.jpg" alt="" />
            </div>
            <h3 className="title-text">TOP 100 CÁC THỂ LOẠI</h3>
            <div className=" p-4 ">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    <div className="col text-center text-white">
                        <img
                            src= "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/7/a/8/f/7a8f953aa385d67fc1fa4ca7448fd3e8.jpg"
                            className="object-cover rounded mb-2"
                            style={{ width: '250px', height: '260px' }}
                        />
                        <p className="fw-semibold" style={{ margin: 0 , fontFamily: "sans-serif", fontWeight: 14}}>Top 100 bài hát trẻ</p>
                        <p className="text-white" style={{ opacity: 0.6, margin: 0, fontFamily: "sans-serif" }}>Dương Domic, HIEUTHUHAI, Quang Hùng MasterD...</p>
                    </div>
                    <div className="col text-center text-white">
                        <img
                            src= "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/6/3/2/0/63207ba6db02bac379928147081397b2.jpg"
                            className="object-cover rounded mb-2"
                            style={{ width: '250px', height: '260px' }}
                        />
                        <p className="fw-semibold" style={{ margin: 0 , fontFamily: "sans-serif", fontWeight: 14}}>Top 100 POP Âu Mỹ</p>
                        <p className="text-white" style={{ opacity: 0.6, margin: 0, fontFamily: "sans-serif" }}>Taylor Swift, Avicii, Alan Walker...</p>
                    </div>
                    <div className="col text-center text-white">
                        <img
                            src= "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/6/b/e/c/6becd51a6def43fe4daedfe8f7a67954.jpg"
                            className="object-cover rounded mb-2"
                            style={{ width: '250px', height: '260px' }}
                        />
                        <p className="fw-semibold" style={{ margin: 0 , fontFamily: "sans-serif", fontWeight: 14}}>Top 100 nhạc Rap Việt</p>
                        <p className="text-white" style={{ opacity: 0.6, margin: 0, fontFamily: "sans-serif" }}>HIEUTHUHAI, RHYDER, Bray...</p>
                    </div>
                    <div className="col text-center text-white">
                        <img
                            src= "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/7/5/2/8/752821a779e62f12b25be0d557654214.jpg"
                            className="object-cover rounded mb-2"
                            style={{ width: '250px', height: '260px' }}
                        />
                        <p className="fw-semibold" style={{ margin: 0 , fontFamily: "sans-serif", fontWeight: 14}}>Top 100 V-POP hay nhất</p>
                        <p className="text-white" style={{ opacity: 0.6, margin: 0, fontFamily: "sans-serif" }}>Dương Domic, Quang Hùng MasterD, Tăng Duy Tân...</p>
                    </div>
                </div>
            </div>
        </div>
    </>;

}
export default TOP100