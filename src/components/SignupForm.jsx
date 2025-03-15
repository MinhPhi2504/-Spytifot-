import "../assets/styles/SignupForm.css"

function SignupForm ()  {
  return (
    <div className="mx-auto" style={{ maxWidth: "400px" }}>
      <form className="d-flex flex-column gap-4">
        <input type="text" placeholder="First Name" className="form-control input1" />
        <input type="email" placeholder="Email" className="form-control" />
        <input type="password" placeholder="Password" className="form-control" />
        <input type="password" placeholder="Confirm Password" className="form-control" />
        <button className="btn btn-primary w-100">Register</button>
      </form>
      <p className="text-center text-white mt-3 intro">
          Fast Signup With Your Favourite Social Profile
      </p>
    </div>
  );
};

export default SignupForm;
