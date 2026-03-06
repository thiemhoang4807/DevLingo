<!-- 
    Copy and use this code to render layout into body-render
-->

<!-- 
import { createPortal } from "react-dom";
import "./style.css"; // Import file css
import { useState, useEffect } from "react";

export default function Func() {
    const [bodyRender, setBodyRender] = useState<Element | null>(null);

    useEffect(() => {
        // DOM is ready and set bodyRender
        setBodyRender(document.getElementById("body-render"));
    }, []);

    // If we can not get body-render
    // Show empty layout
    if (!bodyRender) return <></>; 

    // Else
    // Render layout
    return createPortal(
        <>
            {/* Render layout in here */}
        </>,
        bodyRender
    );
}
-->