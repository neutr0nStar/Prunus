
export {}

declare global {
    
    // Allowed colors
    type Color = "red" | "green" | "blue" | "orange" | "purple" | "brown";

    // state from /subjects to /deck
    type NavigateToDeckState = {
        subject: string,
        color: Color
    };

    // Modal props
    type ModalProps = {
        children: JSX.Element,
        isOpen: boolean,
        close: Function
    }
}