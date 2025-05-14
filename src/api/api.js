import API from "./axiosInstance"; 

// Function specifically for the prediction endpoint accepting base64 JSON
export const predictImage = async (base64Image) => {
    const payload = { image: base64Image };
    try {
        // Send POST request to the /predict endpoint
        // Axios automatically stringifies the payload and sets Content-Type to application/json
        const response = await API.post("/predict", payload);
        // Axios automatically parses the JSON response, available in response.data
        return response.data;
    } catch (error) {
        // Log the error or handle it as needed
        console.error("Error calling predict API:", error);
        // Re-throw the error so the calling component can catch it
        throw error;
    }
};

export const downLoadImage = async (imageData) => {
    let base64String = imageData;
    const base64Marker = ';base64,';
    const markerIndex = imageData.indexOf(base64Marker);

    if (markerIndex > -1) {
        console.log("Data URL detected in downLoadImage input. Extracting Base64 part.");
        base64String = imageData.substring(markerIndex + base64Marker.length);
    } else {
        console.log("Assuming input to downLoadImage is already a raw Base64 string.");
    }

    console.log(`Length of base64 string being sent: ${base64String.length}`);
    if (base64String.length % 4 !== 0) {
        console.warn(`Warning: Base64 string length (${base64String.length}) is not a multiple of 4.`);
        console.log(`Last 10 chars: ...${base64String.slice(-10)}`);
    }

    const payload = { image: base64String };

    try {
        console.log("Sending payload to /convert endpoint..."); // Simplified log
        const response = await API.post("/convert", payload);

        // --- MODIFIED SECTION ---
        console.log("Raw response received from /convert:", response.data); // Keep this for debugging

        // Check if response.data is an object and has the 'image' property
        if (response.data && typeof response.data === 'object' ) {
            // && response.data.hasOwnProperty('image')
            // Check if the value associated with 'image' is a string
            if (typeof response.data.image === 'string') {
                console.log("Extracting 'image' property (string) from response data.");
                // *** Return the value of the 'image' key ***
                return response.data.image;
            } else {
                // Handle case where 'image' key exists but value isn't a string (e.g., null)
                console.warn("Response data object has 'image' key, but its value is not a string:", response.data.image);
                return null; // Return null to indicate failure to get the string
            }
        } else {
            // Handle cases where response is not the expected object or lacks the 'image' key
            console.warn("Response data from /convert did not have the expected { image: '...' } structure.");
            // Return the raw data or null/undefined - this will likely still fail the check in handleDownload,
            // but indicates an unexpected server response.
            return response.data; // Or perhaps return null;
        }
        // --- END MODIFIED SECTION ---

    } catch (error) {
        console.error("Error calling the /convert API:", error.response?.status, error.response?.data || error.message || error);
        throw error;
    }
}