import { useEffect } from "react";

const ConfirmUnload = () => {
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "Unsaved progress will be lost!";
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);
    return null;
};

export default ConfirmUnload;
