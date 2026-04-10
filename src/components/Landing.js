import { Link } from "react-router-dom";
import "./Landing.css";
import img1 from "../assets/todo1.jpg";
import img2 from "../assets/todo2.jpg";
import img3 from "../assets/todo3.jpg";

function Landing() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">TaskNest</div>
        <p className="intro">
          Manage your tasks efficiently, stay organized, and boost your productivity!
        </p>
      </header>

      <div className="image-cards">
        <div className="card">
          <img src={img1} alt="Organize Tasks" />
          <p>Organize your daily tasks</p>
        </div>
        <div className="card">
          <img src={img2} alt="Track Progress" />
          <p>Track your progress easily</p>
        </div>
        <div className="card">
          <img src={img3} alt="Stay Focused" />
          <p>Stay focused and productive</p>
        </div>
      </div>

      <div className="landing-buttons">
        <Link to="/login" className="btn-custom">Login</Link>
        <Link to="/register" className="btn-custom">Register</Link>
      </div>
    </div>
  );
}

export default Landing;