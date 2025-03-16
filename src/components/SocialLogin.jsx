import "../assets/styles/SocialLogin.css"

const SocialLogin = () => {
    return (
      <div className="d-flex flex-row justify-center gap-1 list-btn">
        <button className="btn social-btn"><i className="fa-brands fa-facebook " style={{ color: "#ffffff" }}></i></button>
        <button className="btn social-btn"><i className="fa-brands fa-apple" style={{ color: "#ffffff" }}></i></button>
        <button className="btn social-btn"><i className="fa-brands fa-google" style={{color: "#ffffff"}}></i></button>
      </div>
    );
  };
  
  export default SocialLogin;
  