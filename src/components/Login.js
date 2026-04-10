import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function Login({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      const access_token = res.data?.access_token;

      localStorage.setItem("token", access_token);
      setToken(access_token); // updates App state
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="centered-container">
  <div className="auth-box">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="btn-custom" type="submit">
        Login
      </button>
    </form>
  </div>
</div>
  );
}

export default Login;