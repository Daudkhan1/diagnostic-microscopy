// src/components/AnnotationsPanel.jsx
import { useSelector, useDispatch } from "react-redux";
import Card from "./common/card";
import { setActiveAnnotation, setViewMode } from "../store/imageSlice";
import "../styles/annotationsPanel.scss";

const AnnotationsPanel = () => {
    const dispatch = useDispatch();
    const selectedId = useSelector((state) => state.images.selectedImage);
    const image = useSelector((state) =>
        state.images.capturedImages.find((img) => img.id === selectedId)
    );
    // Get the active annotation ID from state
    const activeAnnotationId = useSelector((state) => state.images.activeAnnotationId);

    // Define the Live Preview Button JSX
    const livePreviewButton = (
        <button
        className="live-preview-button"
        onClick={() => dispatch(setViewMode("camera"))}
        >
            Live Preview
        </button>
    );

    const handleAnnotationClick = (id) => {
        console.log("Annotation clicked, dispatching ID:", id);
        dispatch(setActiveAnnotation(id));
    };

    // Updated function to render clickable thumbnails
    const renderAnnotationThumbnail = (annotation, type, index) => {
        // Generate a unique ID for this annotation
        const annotationId = `${type.toLowerCase()}-${index}`;
        const isActive = activeAnnotationId === annotationId; // Check if this thumbnail is active

        return (
            // Add onClick handler and conditional class for active state
            <div
                className={`annotation-thumbnail ${isActive ? 'active' : ''}`}
                key={annotationId} // Use the generated ID as key
                onClick={() => handleAnnotationClick(annotationId)} // Dispatch action on click
                role="button" // Add role for accessibility
                tabIndex={0} // Make it focusable
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAnnotationClick(annotationId); }} // Keyboard accessibility
            >
                {/* Keep existing content */}
                {/* <h2>Annotation {index + 1}</h2> */}
                <div className="thumbnail-header">
                    <h5>Annotation {index + 1}</h5>
                    <p>Type : <span> {type === 'mitotic' ? 'Mitotic' : 'Maybe Mitotic'}</span></p>
                    {/* <span>{(annotation.confidence * 100).toFixed(1)}%</span> */}
                </div>
            </div>
        );
    };

    // Ensure annotations is always an object, even if image or image.annotations is null/undefined
    const annotations = image?.annotations || { mitotic: [], maybe_mitotic: [] };

    return (
        // Pass the livePreviewButton JSX to the 'header' prop of the Card
        <Card heading="Annotations" header={livePreviewButton}>
            <div className="annotations-panel">
                 {/* Check if arrays exist before mapping */}
                {annotations.mitotic?.map((annotation, index) =>
                    renderAnnotationThumbnail(annotation, "mitotic", index)
                )}
                {annotations.maybe_mitotic?.map((annotation, index) =>
                    renderAnnotationThumbnail(annotation, "maybe_mitotic", index)
                )}

                {/* Handle case where there are no annotations for the selected image */}
                 {(!image || (annotations.mitotic?.length === 0 && annotations.maybe_mitotic?.length === 0)) && (
                     <p className="no-annotations-message">
                        {image ? "No mitotic or maybe-mitotic annotations found for this slide." : "Select an image to view annotations."}
                    </p>
                 )}
            </div>
        </Card>
    );
};

export default AnnotationsPanel;