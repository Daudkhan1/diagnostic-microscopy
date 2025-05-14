// SlideTray.jsx component
import { useSelector, useDispatch } from "react-redux";
import { setSelectedImage } from "../store/imageSlice";
import SlidePreview from "./slidePreview";
import Card from "./common/card";

const SlideTray = () => {
    const images = useSelector((state) => state.images.capturedImages);
    const selectedImageId = useSelector((state) => state.images.selectedImageId);
    const dispatch = useDispatch();

    const handleSelectSlide = (id) => {
        dispatch(setSelectedImage(id)); // this will also switch viewMode to "preview"
    };

    return (
        <section className="slide-details-layout-container">
            <Card heading="Slides" count={`${images.length} ${images.length > 1 ? "Slides" : "Slide"}`}>
                <section className="slides-list-container">
                    {images.length > 0 ? (
                        images.map((img, index) => (
                            <SlidePreview
                                key={img.id}
                                slide={index + 1}
                                content={`Slide ${index + 1}`}
                                status={img.processed ? "Processed" : "Original"}
                                slideData={img}
                                currentSlide={selectedImageId}
                                handleSelectSlide={() => handleSelectSlide(img.id)}
                                handleDeletePatient={() => console.log("Delete clicked", img.id)} // Replace with actual delete logic
                                showDel={true}
                            />
                        ))
                    ) : (
                        <p className="empty-slide-message">No slides available</p>
                    )}
                </section>
            </Card>
        </section>
    );
};

export default SlideTray;
