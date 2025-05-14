import React, { useState } from 'react'; // Import hooks
import { useSelector } from "react-redux";
import Camera from "../components/Camera";
import SlideTray from "../components/SlideTray";
import SelectedSlide from "../components/SelectedSlide";
import AnnotationsPanel from "../components/AnnotationsPanel";
import PasswordPrompt from '../components/PasswordPrompt'; // Import the password prompt component
import "../styles/LivePreview.scss";

const AUTH_SESSION_KEY = 'livePreviewAuthenticated';

const LivePreview = () => {
    const viewMode = useSelector((state) => state.images.viewMode);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    });

    const handleAuthentication = () => {
        // Store the authenticated status in sessionStorage
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
        // Update the component's state to trigger re-render
        setIsAuthenticated(true);
    };

    if (!isAuthenticated) {
        return <PasswordPrompt onAuthenticate={handleAuthentication} />;
    }
    return (
        <div className="live-preview">
            <div className="left-panel">
                {viewMode === "preview" ? <AnnotationsPanel /> : <SlideTray />}
            </div>
            <div className="camera-section">
                {viewMode === "camera" ? <Camera /> : <SelectedSlide />}
            </div>
        </div>
    );
    // --- End Original Page Content ---
};

export default LivePreview;