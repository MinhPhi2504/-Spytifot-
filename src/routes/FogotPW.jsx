import { useState } from "react";
import "../assets/styles/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

function ForgotPW () {
    return (<>
            <div className="background-img">
                 <img className="logo" src="../../public/img/violin.png" alt="" />
            </div>
            <div className="containerAll d-flex flex-column justify-content-center align-items-center vh-100">
                <div>
                    <h3 className="Login-title">Forgot your password?</h3>
                </div>
                <div className="bg-dark p-4 rounded shadow handle-form-container d-flex flex-column justify-content-center align-items-center" style={{ maxWidth: "400px", width: "100%" }}>
                    <form className="d-flex flex-column gap-3" >
                        {["Email", "Confirmation Code", "Password", "Re-enter New Password"].map((field, i) => (
                            <input
                                key={i}
                                type={field.toLowerCase().includes("password") ? "password" : "text"}
                                name={field}
                                placeholder={field}
                                className="form-control"
                                required
                             />
                         ))}
                        <button type="submit" className="btn btn-primary w-100">
                            Confirm
                        </button>
                        <div className="confirm-code" style={{color: "white",display: "flex",justifyContent: "center", alignItems: "center"}}>
                            Your confirm code is: 580AH9
                        </div>
                    </form>
                </div>
            </div>
    </>)
}
export default ForgotPW