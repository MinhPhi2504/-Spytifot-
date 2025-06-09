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
                if (data.user) {
                    const levelMap = { normal: 0, plus: 1, premium: 2 };
                    const accountType = data.user.account_type || "normal";
                    const userLevel = levelMap[accountType];
                    console.log("Account type từ backend:", accountType);
                    console.log("user_premium_level set:", userLevel);

                    // Lưu dữ liệu vào localStorage
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("user_id", data.user.id);
                    localStorage.setItem("user_premium_level", userLevel);
                }

                // Điều hướng đến trang chính
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
                <div style={{ zIndex: 2 }}>
                    <h3 className="Login-title">Login to Spytifot</h3>
                </div>
                <div className="login-place p-4 rounded shadow handle-form-container d-flex flex-column justify-content-center align-items-center" style={{ maxWidth: "400px", width: "100%" }}>
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
                        <Link to="/quen-mat-khau" className="d-flex justify-content-center align-items-center forgot-password">
                            Forgot your password?
                        </Link>
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

