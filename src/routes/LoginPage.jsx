import { useState } from "react";
import "../assets/styles/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Email: "",
        Password: ""
    });
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Kiểm tra dữ liệu đầu vào
        if (!formData.Email || !formData.Password) {
            setMessage("Vui lòng nhập đầy đủ thông tin!");
            setSuccess(false);
            return;
        }

        try {
            const response = await fetch("http://localhost/login.php", {
                method: "POST",
                body: new URLSearchParams(formData),
            });

            const data = await response.json();
            
            setMessage(data.message);
            setSuccess(data.success);
            
            // Chỉ chuyển hướng khi đăng nhập thành công
            if (data.success) {
                // Lưu thông tin người dùng vào localStorage để duy trì đăng nhập
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                }
                
                // Chuyển hướng đến trang chủ
                navigate("/main");
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            setMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
            setSuccess(false);
        }
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
                    <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
                        {["Email", "Password"].map((field, i) => (
                            <input
                                key={i}
                                type={field.toLowerCase().includes("password") ? "password" : "text"}
                                name={field}
                                placeholder={field}
                                className="form-control"
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        ))}
                        <button type="submit" className="btn btn-primary w-100">
                            Log in
                        </button>
                        <a href="" className="d-flex justify-content-center align-items-center forgot-password">
                            Forgot your password?
                        </a>
                        <div className="signup-link">
                        <Link to="/" className="link-to-signup">
                            Don't have an account? Sign up now.
                        </Link>
                    </div>
                    </form>
                    {message && (
    <div className="message-container">
        <p className={`message-text text-center ${success ? "text-success" : "text-danger"}`}>
            {message}
        </p>
    </div>
)}
            
                </div>
            </div>
        </>
    );
}

export default LoginPage;
