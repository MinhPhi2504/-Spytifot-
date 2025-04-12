import Header from "../components/MainPage_header";
import Sidebar from "../components/MainPage_Sidebar";
import Body from "../components/MainPage_Body";
import "../assets/styles/MainPage.css"; // Đảm bảo import CSS
function MainPage() {
    return (
    <div className="main-container">
        <Header />
        <Sidebar />
      <div className="content">
        <Body className="BODY"/>
      </div>
    </div>
    );
  }
  
  export default MainPage;
  