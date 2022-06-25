import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";

type DeckBlockProps = {
    title: string;
    setIsOpen: Function;
};

function DeckBlock({ title, setIsOpen }: DeckBlockProps) {
    return (
        <div>
            <div
                className="w-100 h-32 md:h-64 rounded-md bg-white shadow-md cursor-pointer hover:shadow-lg transition group"
                onClick={() => setIsOpen(true)}
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

export default function Deck() {
    const location = useLocation();
    const navigate = useNavigate();
    const routeState: NavigateToDeckState =
        location.state as NavigateToDeckState;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (routeState === null) {
            navigate("/subjects");
        }
    }, []);

    const blocks: DeckBlockProps[] = [
        { title: "Deck 1", setIsOpen: (v: boolean) => setIsOpen(v) },
        { title: "Deck 2", setIsOpen: (v: boolean) => setIsOpen(v) },
        { title: "Deck 3", setIsOpen: (v: boolean) => setIsOpen(v) },
        { title: "Deck 4", setIsOpen: (v: boolean) => setIsOpen(v) },
    ];

    return (
        <div className="h-full w-100 overflow-y-auto">
            <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
                <div className="h-full w-full flex flex-col justify-center items-center gap-y-2">
                    <div
                        className={`h-24 w-40 mb-10 rounded-md bg-accent-500 shadow-md shadow-accent-400`}
                    >
                        <div className="h-full my-auto flex flex-col justify-center items-center gap-1 animate-pulse">
                            <div className="h-2 w-1/2 bg-white opacity-50 rounded-md"></div>
                            <div className="h-2 w-1/3 bg-white opacity-50 rounded-md"></div>
                        </div>
                    </div>
                    <div className="bg-gray-300 text-center p-2 w-2/3 rounded cursor-pointer">
                        Edit
                    </div>
                    <div
                        className={`bg-accent-400 text-center p-2 w-2/3 rounded cursor-pointer`}
                        onClick={() => navigate("/Cards")}
                    >
                        Start
                    </div>
                </div>
            </Modal>
            <div className="mx-4 md:w-2/3 md:mx-auto">
                <div className="text-4xl font-semibold uppercase py-8 md:py-10">
                    {routeState.subject}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
                    {blocks.map((b) => (
                        <DeckBlock
                            key={b.title}
                            title={b.title}
                            setIsOpen={b.setIsOpen}
                        />
                    ))}
                    <div className="w-100 h-32 md:h-64 rounded-md transition-all border-2 border-dashed border-gray-500 hover:border-black hover:border-solid shadow-md cursor-pointer hover:shadow-lg group flex justify-center items-center">
                        <div className="text-2xl text-gray-600 group-hover:text-black">
                            Add New
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
