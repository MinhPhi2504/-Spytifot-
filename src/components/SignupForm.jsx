// src/components/SignupForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/styles/SignupForm.css"; // Đảm bảo bạn có file CSS này

function SignupForm() {
  const [formData, setFormData] = useState({
    First_name: "",
    Email: "",
    Password: "",
    Confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !formData.First_name ||
      !formData.Email ||
      !formData.Password ||
      !formData.Confirm_password
    ) {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      setSuccess(false);
      return;
    }

    // Validate password match
    if (formData.Password !== formData.Confirm_password) {
      setMessage("Mật khẩu nhập lại không khớp!");
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch("http://localhost/register.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Gửi dữ liệu dưới dạng JSON
        },
        body: JSON.stringify(formData), // Chuyển đổi formData thành JSON
      });

      const data = await response.json();

      setMessage(data.message);
      setSuccess(data.success);

      if (data.success) {
        setFormData({
          First_name: "",
          Email: "",
          Password: "",
          Confirm_password: "",
        });
        setTimeout(() => {
          navigate("/login"); // Chuyển hướng sau khi đăng ký thành công
        }, 1000);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      setSuccess(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login"); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div style={{ maxWidth: "400px" }}>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          {["First_name", "Email", "Password", "Confirm_password"].map((field, i) => (
            <input
              key={i}
              type={field.includes("password") ? "password" : "text"}
              name={field}
              placeholder={field.replace("_", " ")}
              className="form-control"
              value={formData[field]}
              onChange={handleChange}
              required
            />
          ))}
          <button type="submit" className="btn btn-primary w-100">
            Đăng ký
          </button>
        </form>
        <div className="login-link">
          <Link to="/login" className="link-to-login">
            Already have an account? Login now.
          </Link>
        </div>

        {message && (
          <p className={`text-center mt-3 ${success ? "text-success" : "text-danger"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignupForm;