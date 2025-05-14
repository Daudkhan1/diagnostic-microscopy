import { ChevronRightIcon, DownloadReportIcon } from "../../assets/svg"; // Assuming paths are correct
import PreviewContent from "../previewContent";
import Button from "../common/button";
import "./styles.scss";
import { downLoadImage } from "../../api/api";

const SlidePreview = (props) => {
    const {
        slide,
        currentSlide,
        handleSelectSlide,
        slideData,
    } = props;

    // Function to handle downloading the image as TIFF
    const handleDownload = async () => {
        if (!slideData || !slideData.original || slide === undefined) {
            console.error("Cannot download: Missing slide data, original image reference, or slide identifier.");
            
            return;
        }

        console.log(`Requesting TIFF download for Slide ${slide}...`);

        try {
            // 1. Call the API - Assuming downLoadImage takes an identifier (like the original image data URL)
            // and RETURNS the BASE64 STRING of the TIFF image.
            const tiffBase64Data = await downLoadImage(slideData.original);

            // Basic check if we received valid base64 data
            if (!tiffBase64Data || typeof tiffBase64Data !== 'string') {
                console.error("Failed to receive valid base64 TIFF data from API.");
                return;
            }

            // 2. Decode Base64 to binary string
            const byteCharacters = atob(tiffBase64Data);

            // 3. Convert binary string to byte array
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // 4. Create a Blob with the correct MIME type for TIFF
            const blob = new Blob([byteArray], { type: 'image/tiff' });

            // 5. Create an Object URL for the Blob
            const url = URL.createObjectURL(blob);

            // 6. Simulate link click for download
            const link = document.createElement('a');
            link.href = url;
            link.download = `slide_${slide}.tiff`; // Set the desired filename including the slide number
            document.body.appendChild(link); // Append link to body (needed for Firefox compatibility)
            link.click(); // Programmatically click the link to trigger download

            // 7. Clean up
            document.body.removeChild(link); // Remove the temporary link
            URL.revokeObjectURL(url); // Release the object URL to free up memory

            console.log(`TIFF file download initiated: ${link.download}`);

        } catch (error) {
            console.error("Error during TIFF download process:", error);
            // Optionally: provide user feedback about the error
        }
    };

    const formatDateTime = (isoString) => {
        if (!isoString) return "Invalid date";
        const date = new Date(isoString);
        return date.toLocaleString(); // Consider using a more robust date formatting library if needed
    };

    // Defensive check for slideData
    if (!slideData) {
        console.warn("SlidePreview rendered without slideData for slide:", slide);
        return null; // Or return a placeholder/loading state
    }

    // console.log("Slide data for preview:", slideData.original); // Keep for debugging if needed

    return (
        <section
            className={`slide-preview-container ${currentSlide === slideData.id ? "active" : ""}`}
            onClick={() => handleSelectSlide(slideData.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectSlide(slideData.id); }}
            aria-label={`Slide ${slide} preview`} // Add accessibility label
        >
            <img
                src={slideData.original} // Use the original image Data URL for preview
                alt={`Preview of Slide ${slide}`}
                className="icon" // Ensure CSS for .icon styles the image appropriately
            />

            <div className="slide-preview-content">
                <PreviewContent
                    heading={`Slide ${slide}`}
                    content={formatDateTime(slideData.timestamp)}
                />
            </div>

            <div className="buttons-section">
                {/* Download Button */}
                <Button
                    buttonType="iconOnly"
                    classes="slider-go-to-button download-button" // Added specific class
                    aria-label={`Download TIFF for Slide ${slide}`} // Accessibility
                    icon={<DownloadReportIcon />}
                    // Pass the handleDownload function directly
                    handleClick={(e) => {
                        e.stopPropagation(); // Prevent the section's onClick from firing
                        handleDownload();
                     }}
                />
                {/* Navigate Button */}
                <Button
                    buttonType="iconOnly"
                    classes="slider-go-to-button navigate-button" // Added specific class
                    aria-label={`Go to details for Slide ${slide}`} // Accessibility
                    icon={<ChevronRightIcon />}
                    handleClick={(e) => {
                        e.stopPropagation(); // Prevent the section's onClick from firing
                        handleSelectSlide(slideData.id);
                     }}
                />
            </div>
        </section>
    );
};

export default SlidePreview;