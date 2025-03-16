import { useState } from "react";
import "../assets/styles/SignupForm.css";

function SignupForm() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/register.php", {
      method: "POST",
      body: new URLSearchParams(formData),
    });
    const data = await response.json();
    setMessage(data.message);
    setSuccess(data.success);
    if (data.success) setFormData({});
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div style={{ maxWidth: "400px" }}>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          {["first_name", "email", "password", "confirm_password"].map((field, i) => (
            <input key={i} type={field.includes("password") ? "password" : "text"} name={field} placeholder={field.replace("_", " ")} className="form-control" onChange={handleChange} required />
          ))}
          <button className="btn btn-primary w-100">Register</button>
        </form>
        {message && <p className={`text-center mt-3 ${success ? "text-success" : "text-danger"}`}>{message}</p>}
      </div>
    </div>
  );
}
export default SignupForm;
