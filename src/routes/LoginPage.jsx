
import "../assets/styles/LoginPage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function LoginPage() {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault(); // chặn reload nếu là trong form
        // TODO: xử lý login ở đây
        navigate("/main");
      };
  return (
<>
  <div className="background-img">
    <img className="logo" src="../../public/img/violin.png" alt="" />
  </div>
    <div className="containerAll d-flex flex-column justify-content-center align-items-center vh-100">
        <div>
            <h3 className="Login-title">Login to Spytifot</h3>
        </div>
        <div className="bg-dark p-4 rounded shadow handle-form-container d-flex flex-column justify-content-center align-items-center" style={{ maxWidth: "400px", width: "100%" }}>
            <form className="d-flex flex-column gap-3">
                {["Email", "Password"].map((field, i) => (
                    <input
                        key={i}
                        type={field.toLowerCase().includes("password") ? "password" : "text"}
                        name={field}
                        placeholder={field}
                        className="form-control"
                        required
                    />
                ))}
                <button onClick={handleSubmit} type="submit" className="btn btn-primary w-100">
                        Log in
                </button>
                <a href="" className="d-flex justify-content-center align-items-center forgot-password">
                    Forgot your password?
                </a>
            </form>
            <div className="signup-link">
                <Link to="/" className="link-to-signup">
                    Don't have an account? Sign up now.
                </Link>
            </div>
        </div>
    </div>
</>

    );
}

export default LoginPage;
