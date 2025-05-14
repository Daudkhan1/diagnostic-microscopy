// imageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name: "images",
    initialState: {
        capturedImages: [],
        selectedImage: null,
        viewMode: "camera", // or "preview"
        activeAnnotationId: null,
        isFullscreen: false, // NEW: Fullscreen state
    },
    reducers: {
        // ... (addImage, setSelectedImage, setViewMode, setActiveAnnotation, clearActiveAnnotation)
        addImage: (state, action) => {
             const imagePayload = { // Ensure payload includes original dimensions
                 ...action.payload,
                 originalWidth: action.payload.originalWidth || 0,
                 originalHeight: action.payload.originalHeight || 0,
             };
             state.capturedImages.push(imagePayload);
         },
         setSelectedImage: (state, action) => {
             state.selectedImage = action.payload;
             state.viewMode = "preview";
             state.activeAnnotationId = null;
             // state.isFullscreen = false; // Optional: Exit fullscreen when changing slide? Or keep it persistent? Let's keep it for now.
         },
         setViewMode: (state, action) => {
             state.viewMode = action.payload;
              // Optional: Exit fullscreen when going back to camera?
             // if (action.payload === 'camera') {
             //     state.isFullscreen = false;
             // }
         },
         setActiveAnnotation: (state, action) => {
              if (state.activeAnnotationId === action.payload) {
                  state.activeAnnotationId = null;
              } else {
                  state.activeAnnotationId = action.payload;
              }
          },
          clearActiveAnnotation: (state) => {
             state.activeAnnotationId = null;
          },

        // NEW: Reducer to toggle fullscreen
        toggleFullscreen: (state) => {
            state.isFullscreen = !state.isFullscreen;
        },
    },
});

export const {
    addImage,
    setSelectedImage,
    setViewMode,
    setActiveAnnotation,
    clearActiveAnnotation,
    toggleFullscreen // Export new action
} = imageSlice.actions;

export default imageSlice.reducer;