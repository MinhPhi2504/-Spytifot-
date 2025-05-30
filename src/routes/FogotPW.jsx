// ForgotPW.js
import { useState } from "react";
import "../assets/styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

function ForgotPW() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  // Bước 1: Gửi mã xác nhận
  const handleSendCode = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Vui lòng nhập email!");
      return;
    }

    try {
      const res = await fetch("http://localhost/send_reset_code.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}`,
      });
      const data = await res.json();

      if (data.success) {
        setGeneratedCode(data.code || "");
        setMessage("Mã xác nhận đã được gửi. Vui lòng kiểm tra email.");
        setStep(2);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Lỗi kết nối máy chủ.");
    }
  };

  // Bước 2: Xác nhận mã và đổi mật khẩu
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!code || !password || !rePassword) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (password !== rePassword) {
      setMessage("Mật khẩu không khớp!");
      return;
    }

    try {
      const res = await fetch("http://localhost/reset_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}&new_password=${encodeURIComponent(password)}`,
      });
      const data = await res.json();

      if (data.success) {
        setMessage("Đổi mật khẩu thành công!");
        setStep(3); 
      }
 else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Lỗi kết nối máy chủ.");
    }
  };

  return (
    <>
      <div className="background-img1" style={{
        position: 'fixed',
        inset: 0,
        zIndex: -20,
      }}>
        <img
          className="logo1"
          src="../../public/img/violin.png"
          alt="Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.2
          }}
        />
      </div>

      <div className="containerAll d-flex flex-column justify-content-center align-items-center vh-100" style={{zIndex:'22'}}>
        <div>
          <h3 className="Login-title">Forgot your password?</h3>
        </div>
        <div
          className="bg-dark p-4 rounded shadow handle-form-container d-flex flex-column justify-content-center align-items-center"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <form
  onSubmit={step === 1 ? handleSendCode : handleResetPassword}
  className="d-flex flex-column gap-3 w-100"
  style={{ maxWidth: "400px" }}
>
  {step === 1 && (
    <>
      <input
        type="email"
        placeholder="Email"
        className="form-control w-100"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary w-100">
        Send Code
      </button>
    </>
  )}

  {step === 2 && (
    <>
      <input
        type="text"
        placeholder="Confirmation Code"
        className="form-control w-100"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        className="form-control w-100"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Re-enter New Password"
        className="form-control w-100"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-success w-100">
        Confirm
      </button>
    </>
  )}
  {step === 3 && (
  <>
    <button
      className="btn btn-primary w-100"
      onClick={() => navigate("/login")}
      type="button"
    >
      Quay lại Đăng nhập
    </button>
  </>
)}

  {message && <div className="text-white text-center">{message}</div>}
</form>

        </div>
      </div>
    </>
  );
}

export default ForgotPW;
