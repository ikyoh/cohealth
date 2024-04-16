import classNames from "classnames";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

export const useModal = () => {
    const [modal, setModal] = useState({
        title: "",
        show: false,
        content: false,
        size: "medium",
    });

    const handleOpenModal = (props) => {
        setModal({
            ...modal,
            show: true,
            title: props.title,
            content: props.content,
            size: props.size || "medium",
        });
    };

    const handleCloseModal = () => {
        setModal({ ...modal, show: false });
    };

    const modalClassName = classNames({
        "modal !m-0 !p-0": true,
        "modal-open": modal.show,
    });

    const boxClassName = classNames({
        "modal-box rounded-none md:rounded-md p-0": true,
        "max-w-4xl": modal.size === "medium",
        "max-w-screen-2xl h-screen": modal.size === "full",
        "max-w-sm": modal.size === "small",
    });

    const Modal = () => {
        return createPortal(
            <div className={modalClassName}>
                <div className={boxClassName}>
                    <div className="text-primary p-5 md:py-4 md:px-5 text-xl border-b bg-white">
                        {modal.title}
                        <button
                            onClick={handleCloseModal}
                            className="absolute right-3 top-3 md:top-2 text-primary p-2 text-3xl font-thin transition ease-in-out active:scale-[0.9] duration-100"
                        >
                            <MdClose />
                        </button>
                    </div>
                    <div
                        className={`overflow-y-auto max-h-[calc(100vh-73px)] md:max-h-[calc(100vh-160px)] ${
                            modal.size === "full" && "h-full"
                        }`}
                    >
                        {modal.content}
                    </div>
                </div>
            </div>,
            document.body
        );
    };

    return {
        Modal,
        handleOpenModal,
        handleCloseModal,
    };
};
