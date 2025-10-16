
import { useEffect } from "react";

const DisableInspect = () => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "F12") e.preventDefault();
            if (e.ctrlKey && e.shiftKey && e.key === "I") e.preventDefault();
            if (e.ctrlKey && e.shiftKey && e.key === "J") e.preventDefault();
            if (e.ctrlKey && e.key === "U") e.preventDefault();
        };

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("contextmenu", handleContextMenu);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return null;
};

export default DisableInspect;
