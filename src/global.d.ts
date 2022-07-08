
export {}

declare global {
    
    /**  Modal props */
    type ModalProps = {
        children: JSX.Element,
        isOpen: boolean,
        close: Function
    }
}