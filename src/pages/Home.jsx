import { useNavigate } from "react-router-dom";
import "../styles/Home.scss";
import microscope from "../assets/microscope.png";
import cameraIcon from "../assets/camera.png";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <img src={microscope} alt="Microscope" className="microscope-image" />
            <div className="text-content">
            <h2 className="h2">Microscope AI Analysis</h2>
            <p className="p">Capture microscope images and get AI-powered insights in real time. Our advanced vision model 
                analyzes histopathology slides and assists with annotations for accurate diagnostics.
            </p>
            </div>
           
            <button className="start-btn" onClick={() => navigate("/live")}>
            <img src={cameraIcon} alt="Camera Icon" className="camera-icon" />
            <div className="btn-text">Live Preview</div></button>
        </div>
    );
};

export default Home;
