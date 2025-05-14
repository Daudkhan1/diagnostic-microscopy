import { Link } from "react-router-dom";
import "../styles/navbar.scss";
import logo from "../assets/logo.png";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="left">
                <Link to={"/"}>
                <img src={logo} alt="Company Logo" className="logo" />
                </Link>
                <Link to={"/"} className="text">
                Microscope Portal
                </Link>
            </div>
            <div className="right">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/contact">Contact Us</Link>
            </div>
        </nav>
    );
};

export default Navbar;
