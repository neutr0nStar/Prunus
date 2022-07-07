import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ children, isOpen, close }: ModalProps) {
    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
            }
        };

        document.addEventListener("keydown", keyDownHandler);
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    if (!isOpen) {
        document.body.setAttribute("style", "overflow: auto;");
        return <div></div>;
    } else {
        document.body.setAttribute("style", "overflow: hidden;");
    }

    return ReactDOM.createPortal(
        <div
            className="h-screen w-full absolute left-0 z-10 bg-black/75 backdrop-blur-sm flex justify-center items-center overflow-y-hidden"
            style={{ marginTop: window.scrollY }}
        >
            <div className="h-3/5 w-5/6 md:h-3/5 md:w-2/5 bg-white rounded-lg relative p-4">
                <div className="absolute top-4 right-4 cursor-pointer text-gray-500 flex justify-center items-center rounded-full">
                    <svg
                        onClick={() => close()}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                {children}
            </div>
        </div>,
        document.getElementById("modal")!
    );
}
