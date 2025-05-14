import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addImage } from "../store/imageSlice";
import { predictImage } from "../api/api";
import "../styles/camera.scss";

const Camera = () => {
    const videoRef = useRef(null);
    const dispatch = useDispatch();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);

    // --- Effect for Camera Setup and Teardown ---
    useEffect(() => {
        let stream = null;
        const videoElement = videoRef.current; 
        setIsCameraReady(false); 

        console.log("Setting up camera...");

        navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 4000 },
                height: { ideal: 3000 },
                frameRate: { ideal: 30 }
            }
        }).then((s) => {
            stream = s;
            if (videoElement) {
                videoElement.srcObject = stream;
                videoElement.onloadedmetadata = () => {
                    if (videoRef.current) { 
                        setIsCameraReady(true);
                        console.log("Camera stream ready.");
                    }
                };
                videoElement.onerror = () => {
                    console.error("Video element error.");
                     if (videoRef.current) setIsCameraReady(false);
                }
            } else {
                 console.log("Video element ref was null during stream setup.");
                 s.getTracks().forEach(track => track.stop()); // Stop the stream if element isn't there
            }
        }).catch(err => {
            console.error("Error accessing camera:", err);
        });

        // Cleanup function
        return () => {
            console.log("Cleaning up camera...");
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (videoElement) {
                videoElement.srcObject = null;
                videoElement.onloadedmetadata = null;
                videoElement.onerror = null;
            }
        };
    }, []); // Empty dependency array: runs only on mount/unmount

    // --- Effect for Keydown Listener ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space" && !isProcessing && isCameraReady) {
                console.log("Space pressed - Capturing image...");
                e.preventDefault();
                captureImage();
            } else if (e.code === "Space") {
                console.log(`Space pressed but blocked: isProcessing=${isProcessing}, isCameraReady=${isCameraReady}`);
                e.preventDefault();
            }
        };

        console.log(`Updating keydown listener. State: isProcessing=${isProcessing}, isCameraReady=${isCameraReady}`);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            console.log("Removing keydown listener.");
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isProcessing, isCameraReady]); // Re-attach listener if these states change


    // --- Image Capture and API Call Function ---
    const captureImage = async () => {
        if (isProcessing || !isCameraReady || !videoRef.current || !videoRef.current.srcObject) {
            console.log("Capture prevented: already processing or camera not ready.");
            return;
        }

        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        if (!videoWidth || !videoHeight) {
            console.error("Video dimensions are not available yet.");
            return;
        }

        setIsProcessing(true);

        try {
            const canvas = document.createElement("canvas");
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            const imageDataUrl = canvas.toDataURL("image/png"); // Or "image/jpeg"
            const base64Image = imageDataUrl.split(",")[1];
            console.log("Payload",base64Image);
            console.log(`Image captured (${videoWidth}x${videoHeight}), sending for prediction...`);

            const data = await predictImage(base64Image);


            console.log("API Response OK:", data);

            const capturedImage = {
                id: Date.now(),
                original: imageDataUrl,
                annotations: data || { mitotic: [], maybe_mitotic: [] }, 
                timestamp: new Date().toISOString(),
                originalWidth: videoWidth,
                originalHeight: videoHeight,
            };
            console.log("Dispatching image:", capturedImage);

            dispatch(addImage(capturedImage));

        } catch (error) {
            console.error("Capture/Processing Error:", error.response?.data || error.message || error);
        } finally {
            setIsProcessing(false);
            console.log("Processing finished.");
        }
    };

    return (
        <div className="camera">
            <div className={`camera-status ${isProcessing ? 'processing' : (isCameraReady ? 'ready' : 'loading')}`}>
                {isProcessing ? 'Processing...' : (isCameraReady ? 'Ready' : 'Loading Camera...')}
            </div>

            <video ref={videoRef} autoPlay playsInline muted />

            <p>Press
                <button
                    onClick={captureImage}
                    className="button"
                    disabled={!isCameraReady || isProcessing}
                >
                    <span className="btn-text">Space bar</span>
                </button> to capture current view
            </p>
        </div>
    );
};

export default Camera;