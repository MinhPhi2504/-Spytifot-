import Header from "./components/Header.jsx";
import SignupForm from "./components/SignupForm.jsx";
import SocialLogin from "./components/SocialLogin.jsx";
import Footer from "./components/Footer.jsx";
import "./assets/styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import a from "../public/img/violin.png"
function App() {

  return (
    <div className="container">
      <img className="logo" src={a} alt="" />

      <div className="sub-container">
        <Header />

        <div className="wrapper">
          <div className="form-container bg-dark shadow-lg">
            <img className="pic-sub" src="../../public/img/logo.jpg" alt="" />
            <div className="form-detail">
              <SignupForm />
              <SocialLogin />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
