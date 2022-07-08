import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";

type NavigateToDeckState = {
    subject: string;
};

type DeckBlockProps = {
    title: string;
    setOpen: Function;
};

// Grid element
function DeckBlock({ title, setOpen }: DeckBlockProps) {
    return (
        <div>
            <div
                className="w-100 h-32 md:h-64 rounded-md bg-white shadow-md cursor-pointer hover:shadow-lg transition group"
                onClick={() => setOpen()}
            >
                <div className="h-full w-full flex md:flex-col items-center md:justify-around">
                    <div className="h-20 w-24 md:h-40 md:w-40 relative">
                        <div
                            className={`h-16 w-20 md:h-20 md:w-32 bg-gradient-to-br from-accent-400 to-accent-200 absolute bottom-0 md:bottom-2 left-10 md:left-8`}
                        ></div>
                        <div
                            className={`h-16 w-20 md:h-20 md:w-32 bg-gradient-to-br from-accent-500 to-accent-300 absolute bottom-2 md:bottom-4 left-8 md:left-6 transition-all ease-linear duration-150 group-hover:bottom-3 md:group-hover:bottom-5 group-hover:left-5`}
                        ></div>
                        <div
                            className={`h-16 w-20 md:h-20 md:w-32 bg-gradient-to-br from-accent-600 to-accent-400 absolute bottom-4 md:bottom-6 left-6 md:left-4 transition-all ease-linear duration-150 group-hover:bottom-6 md:group-hover:bottom-8 group-hover:left-2`}
                        >
                            <div className="h-full w-full flex flex-col items-center justify-center">
                                <div className="h-2 w-1/2 bg-white rounded-sm opacity-50"></div>
                                <div className="h-2 w-1/3 bg-white rounded-sm opacity-50 mt-1"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-56 md:w-80 ml-12 text-xl md:text-center text-gray-500 group-hover:text-gray-800 truncate ">
                        {title || "Deck name"}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Page
export default function Deck() {
    const location = useLocation();
    const navigate = useNavigate();
    const subject = (location.state as NavigateToDeckState).subject;

    // Deck modal
    const [openModalIndex, setOpenModalIndex] = useState<number>(-1);

    // new deck modal
    const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);

    // new deck title
    const [newDeckTitle, setNewDeckTitle] = useState<string>("");

    // if no subject is selected, go to subjects page
    useEffect(() => {
        if (location.state === null) {
            navigate("/subjects");
        }
    }, []);

    // temporary data
    const [blocks, setBlocks] = useState<string[]>([
        "Deck 1",
        "Deck 2",
        "Deck 3",
        "Deck 4",
    ]);

    // handle new deck creation
    const handleNewDeckSubmit = () => {
        setBlocks([
            ...blocks,
            newDeckTitle.charAt(0).toUpperCase() + newDeckTitle.slice(1),
        ]);
        setNewDeckTitle("");
        setIsNewModalOpen(false);
    };

    return (
        <div className="h-full w-100 overflow-y-auto">
            {/* Deck modal */}
            <Modal
                isOpen={openModalIndex !== -1}
                close={() => setOpenModalIndex(-1)}
            >
                <div className="h-full w-full flex flex-col justify-center items-center gap-y-2">
                    <div
                        className={`h-24 w-40 mb-10 rounded-md bg-accent-500 shadow-md shadow-accent-400`}
                    >
                        <div className="h-full my-auto flex flex-col justify-center items-center gap-1 animate-pulse">
                            <div className="h-2 w-1/2 bg-white opacity-50 rounded-md"></div>
                            <div className="h-2 w-1/3 bg-white opacity-50 rounded-md"></div>
                        </div>
                    </div>
                    <div className="text-xl mb-2">
                        {openModalIndex !== -1 && blocks[openModalIndex]}
                    </div>
                    <div
                        onClick={() => {
                            navigate("/editDeck", {
                                state: {
                                    title: blocks[openModalIndex],
                                },
                            });
                        }}
                        className="bg-gray-300 text-center p-2 w-2/3 rounded cursor-pointer"
                    >
                        Edit
                    </div>
                    <div
                        className={
                            "bg-accent-400 text-center p-2 w-2/3 rounded cursor-pointer"
                        }
                        onClick={() => navigate("/Cards")}
                    >
                        Start
                    </div>
                </div>
            </Modal>

            {/* New Deck modal */}
            <Modal
                isOpen={isNewModalOpen}
                close={() => setIsNewModalOpen(false)}
            >
                <div className="h-full w-100 flex justify-center items-center">
                    <form className="w-full sm:w-2/3 flex flex-col" action="/">
                        <label className="text-lg">
                            Enter title of the new deck:
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            autoFocus
                            value={newDeckTitle}
                            onChange={(e) => setNewDeckTitle(e.target.value)}
                            className="bg-accent-100 rounded-md p-2 my-4"
                        />
                        <button
                            className="bg-accent-400 p-2 rounded-md text-white"
                            onClick={handleNewDeckSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </Modal>

            <div className="mx-4 md:w-2/3 md:mx-auto">
                <div className="text-4xl font-semibold uppercase py-8 md:py-10">
                    {subject}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
                    {blocks.map((b, i) => (
                        <DeckBlock
                            key={b}
                            title={b}
                            setOpen={() => setOpenModalIndex(i)}
                        />
                    ))}
                    <div
                        onClick={() => setIsNewModalOpen(true)}
                        className="w-100 h-32 md:h-64 rounded-md transition-all border-2 border-dashed border-gray-500 hover:border-black hover:border-solid shadow-md cursor-pointer hover:shadow-lg group flex justify-center items-center select-none"
                    >
                        <div className="text-2xl text-gray-600 group-hover:text-black">
                            Add New Deck
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            let res = confirm(
                                "Are you sure, you want to delete this subject ?"
                            );
                            if (res) {
                                alert("Deleted");
                                navigate(-1);
                            }
                        }}
                        className="w-100 h-32 md:h-64 rounded-md transition-all border-2 border-dashed border-red-500 hover:border-red-600 hover:border-solid shadow-md cursor-pointer hover:shadow-lg group flex justify-center items-center select-none"
                    >
                        <div className="text-2xl text-red-500 group-hover:text-red-600">
                            Delete Subject
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
