// SelectedSlide.jsx component
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setActiveAnnotation, toggleFullscreen } from "../store/imageSlice";
import Card from "./common/card"; // Assuming Card is used if .fullscreen-card logic is relevant elsewhere
import Collapse from "./common/collapse"; // Assuming path is correct
import "../styles/selectedSlide.scss";
import {
    FullScreenIcon,
    ZoomInIcon,
    ZoomOutIcon
} from '../assets/svg'; // Verify path

const ZOOM_STEP = 0.2;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3.0;

const SelectedSlide = () => {
    const dispatch = useDispatch();
    const selectedId = useSelector((state) => state.images.selectedImage);
    const image = useSelector((state) =>
        state.images.capturedImages.find((img) => img.id === selectedId)
    );
    const activeAnnotationId = useSelector((state) => state.images.activeAnnotationId);
    const isFullscreen = useSelector((state) => state.images.isFullscreen);

    // --- State for Zoom & Pan ---
    const [zoomLevel, setZoomLevel] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // --- Refs ---
    const imageContainerRef = useRef(null); // Ref for the panning/zooming inner div
    const viewerContainerRef = useRef(null); // Ref for the clipping outer div

    // --- Fullscreen Body Class Effect ---
    useEffect(() => {
        const fullscreenClassName = 'app-fullscreen'; // Class added to body
        if (isFullscreen) {
            document.body.classList.add(fullscreenClassName);
        } else {
            document.body.classList.remove(fullscreenClassName);
        }
        // Cleanup function to remove class if component unmounts while in fullscreen
        return () => {
            document.body.classList.remove(fullscreenClassName);
        };
    }, [isFullscreen]);

    // --- Reset zoom/pan on image change ---
    useEffect(() => {
        setZoomLevel(1);
        setOffset({ x: 0, y: 0 });
    }, [selectedId]); // Reset only when selectedId changes

    // --- Clamp Offset Logic ---
    const getClampedOffset = useCallback((newOffset, currentZoomLevel) => {
        // Ensure refs and data are available
        if (!viewerContainerRef.current || !image || !image.originalWidth || !image.originalHeight) {
            return newOffset; // Not ready, return proposed offset as is
        }

        const { width: containerWidth, height: containerHeight } = viewerContainerRef.current.getBoundingClientRect();

        // Guard against zero dimensions (can happen during layout shifts)
        if (containerWidth <= 0 || containerHeight <= 0) {
             return { x: 0, y: 0}; // Cannot calculate, reset to center
        }

        // Calculate image's display dimensions within the container at zoom=1 (respecting object-fit: contain)
        const imageRatio = image.originalWidth / image.originalHeight;
        const containerRatio = containerWidth / containerHeight;
        let baseContentWidth, baseContentHeight;

        if (imageRatio > containerRatio) { // Image aspect wider than container aspect
            baseContentWidth = containerWidth;
            baseContentHeight = containerWidth / imageRatio;
        } else { // Image aspect taller or same as container aspect
            baseContentHeight = containerHeight;
            baseContentWidth = containerHeight * imageRatio;
        }

        // Calculate scaled dimensions
        const scaledContentWidth = baseContentWidth * currentZoomLevel;
        const scaledContentHeight = baseContentHeight * currentZoomLevel;

        // Calculate max distance the center can move from original center
        const maxOffsetX = Math.max(0, (scaledContentWidth - containerWidth) / 2);
        const maxOffsetY = Math.max(0, (scaledContentHeight - containerHeight) / 2);

        // Clamp the proposed offset
        const clampedX = Math.max(-maxOffsetX, Math.min(maxOffsetX, newOffset.x));
        const clampedY = Math.max(-maxOffsetY, Math.min(maxOffsetY, newOffset.y));

        // If zoom is effectively 1 (or less), force offset back to 0 (no panning)
        if (currentZoomLevel <= 1.001) { // Use a small tolerance for floating point math
            return { x: 0, y: 0 };
        }

        return { x: clampedX, y: clampedY };

    }, [image]); // Re-calculate if image changes

    // --- Event Handlers ---
    const handleImageClick = (e) => {
        // Prevent deselect if clicking controls or during/just after dragging
        if (e.target.closest('.image-controls') || isDragging) {
             return;
        }
        // If an annotation itself is clicked in future, it should stop propagation
        if (activeAnnotationId) {
            dispatch(setActiveAnnotation(null)); // Deselect annotation
        }
    };

    // Centralized zoom logic
    const handleZoom = (newZoomLevel) => {
        const clampedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoomLevel));
        setZoomLevel(clampedZoom);
        // Adjust offset based on new zoom level *immediately*
        setOffset(prevOffset => getClampedOffset(prevOffset, clampedZoom));
    }

    const handleZoomIn = (e) => {
        e.stopPropagation(); // Prevent image click handler
        handleZoom(zoomLevel + ZOOM_STEP);
    };

    const handleZoomOut = (e) => {
        e.stopPropagation(); // Prevent image click handler
        handleZoom(zoomLevel - ZOOM_STEP);
    };

    const handleResetZoom = (e) => {
        e.stopPropagation(); // Prevent image click handler
        // Reset state directly
        setZoomLevel(1);
        setOffset({ x: 0, y: 0 });
    }

    const handleToggleFullscreen = (e) => {
        e.stopPropagation(); // Prevent image click handler
        dispatch(toggleFullscreen());
    };

    // --- Panning Handlers ---
    const handleMouseDown = (e) => {
        // Allow drag only if zoomed in and not on controls
        if (zoomLevel <= 1 || e.target.closest('.image-controls')) {
            return;
        }
        e.preventDefault(); // Prevent text selection, image ghost drag
        setIsDragging(true);
        // Store starting mouse position relative to current offset
        setDragStart({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return; // Only run if dragging
        e.preventDefault();

        // Calculate proposed offset based on mouse movement since drag start
        const proposedOffset = {
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        };

        // Get clamped offset respecting boundaries
        const clampedOffset = getClampedOffset(proposedOffset, zoomLevel);

        // Update state
        setOffset(clampedOffset);
    };

    const handleMouseUpOrLeave = (e) => {
        if (isDragging) {
            e.preventDefault(); // Prevent potential click event after drag
            setIsDragging(false);
        }
    };

    // --- Annotation Rendering Logic ---
    const getAnnotationRectProps = (coords, color, isActive) => {
        if (!coords || coords.length < 4 || !image?.originalWidth || !image?.originalHeight) {
            // console.warn("getAnnotationRectProps: Invalid data", { coords, image });
            return null;
        }
        try {
            const topLeft = coords[0];
            const topRight = coords[1];
            const bottomLeft = coords[3];

            if (!topLeft || !topRight || !bottomLeft || typeof topLeft.x !== 'number' || typeof topLeft.y !== 'number' || typeof topRight.x !== 'number' || typeof bottomLeft.y !== 'number') return null;

            const x = topLeft.x;
            const y = topLeft.y;
            const width = topRight.x - topLeft.x;
            const height = bottomLeft.y - topLeft.y;

            if (isNaN(x) || isNaN(y) || width <= 0 || height <= 0) {
                // console.warn("getAnnotationRectProps: Invalid calculated dimensions", { x, y, width, height });
                return null;
            }
            return {
                x, y, width, height,
                stroke: color,
                strokeWidth: isActive ? 4 : 2, // Thicker border if active
                fill: "none", // No fill
                className: `annotation-rect ${isActive ? 'active' : ''} ${color === 'red' ? 'mitotic-rect' : 'maybe-mitotic-rect'}`,
                // Add pointerEvents: 'auto' here if rects should be clickable
            };
        } catch (error) {
            console.error("Error calculating annotation rect props:", error);
            return null;
        }
    };

    const allAnnotationRects = [];
    const annotations = image?.annotations || { mitotic: [], maybe_mitotic: [] };

    (annotations.mitotic || []).forEach((annotation, index) => {
        if (annotation?.coordinates) {
            const key = `mitotic-${index}`;
            const isActive = key === activeAnnotationId;
            const props = getAnnotationRectProps(annotation.coordinates, 'red', isActive);
            if (props) allAnnotationRects.push(<rect key={key} {...props} />);
        }
    });

    (annotations.maybe_mitotic || []).forEach((annotation, index) => {
        if (annotation?.coordinates) {
            const key = `maybe_mitotic-${index}`;
            const isActive = key === activeAnnotationId;
            const props = getAnnotationRectProps(annotation.coordinates, 'blue', isActive);
            if (props) allAnnotationRects.push(<rect key={key} {...props} />);
        }
    });

    // --- Component Render ---
    if (!image) {
        // You might want a more styled placeholder
        return <div className="selected-slide-placeholder">No slide selected.</div>;
    }

    // Destructure for SVG viewBox clarity
    const { originalWidth, originalHeight } = image;

    return (
        // Use conditional class for root element if needed for fullscreen layout adjustments
        <div className={`selected-slide ${isFullscreen ? 'selected-slide--fullscreen' : ''}`}>

            {/* Outer container for clipping and mouse listeners */}
            <div
                ref={viewerContainerRef}
                className={`image-viewer-container ${isFullscreen ? 'image-viewer-container--fullscreen' : ''}`}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave} // Important to catch mouse leaving the area
                onClick={handleImageClick} // For deselecting annotations
                role="img" // More appropriate role
                aria-label={`Slide image ${selectedId}`}
                style={{ cursor: isDragging ? 'grabbing' : (zoomLevel > 1 ? 'grab' : 'default') }}
            >
                {/* Inner container applies transform for zoom/pan */}
                <div
                    ref={imageContainerRef}
                    className="image-annotation-container"
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomLevel})`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out', // Faster transition
                    }}
                    onMouseDown={handleMouseDown} // Start drag here
                    onDoubleClick={handleResetZoom} // Reset zoom/pan on double click
                >
                    {/* The actual image */}
                    <img
                        src={image.original}
                        alt={`Slide ${selectedId}`}
                        className="full-width-slide-image"
                        draggable="false" // Prevent native image drag
                        // Ensure image itself doesn't capture pointer events needed by container/SVG
                        style={{ pointerEvents: 'auto' }}
                    />

                    {/* SVG Overlay for Annotations */}
                    {originalWidth && originalHeight && ( // Render only when dimensions are known
                        <svg
                            className="annotation-svg-overlay"
                            viewBox={`0 0 ${originalWidth} ${originalHeight}`} // Sets coordinate system
                            preserveAspectRatio="xMidYMid meet" // Matches object-fit: contain
                            style={{
                                position: 'absolute',
                                top: 0, left: 0,
                                width: '100%', height: '100%',
                                pointerEvents: 'none', // Pass clicks/drags through by default
                            }}
                        >
                            {allAnnotationRects} {/* Render the generated <rect> elements */}
                        </svg>
                    )}

                </div> {/* End image-annotation-container */}

                {/* Absolutely positioned controls relative to image-viewer-container */}
                <div className={`image-controls ${isFullscreen ? 'image-controls--fullscreen' : ''}`}>
                    <button onClick={handleZoomIn} aria-label="Zoom In" title="Zoom In" disabled={zoomLevel >= MAX_ZOOM}>
                        <ZoomInIcon />
                    </button>
                    <button onClick={handleZoomOut} aria-label="Zoom Out" title="Zoom Out" disabled={zoomLevel <= MIN_ZOOM}>
                        <ZoomOutIcon />
                    </button>
                    {/* Show reset only if zoomed or panned */}
                    {(zoomLevel !== 1 || offset.x !== 0 || offset.y !== 0) && (
                        <button onClick={handleResetZoom} aria-label="Reset Zoom & Pan" title="Reset Zoom & Pan (Double-click image)">
                            1x
                        </button>
                    )}
                    <button onClick={handleToggleFullscreen} aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"} title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
                        <FullScreenIcon />
                    </button>
                </div> {/* End image-controls */}

            </div> {/* End image-viewer-container */}

            {/* Conditionally render Annotation Details Collapse outside viewer, only if NOT fullscreen */}
            {/* {!isFullscreen && (
                 <Collapse annotationDetail={JSON.stringify(annotations, null, 2)} />
            )} */}
        </div> // End selected-slide
    );
};

export default SelectedSlide;