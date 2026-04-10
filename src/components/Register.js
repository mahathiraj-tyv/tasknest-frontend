import { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/register", form);
    alert("User registered!");
  };

  return (
    <div className="centered-container">
  <div className="auth-box">
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="btn-custom" type="submit">
        Register
      </button>
    </form>
  </div>
</div>
  );
}
export default Register;