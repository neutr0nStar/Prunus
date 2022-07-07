import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";

type SubjectBlockProps = {
    title: string;
};

function SubjectBlock({ title }: SubjectBlockProps) {
    const navigate = useNavigate();

    return (
        <div
            className="w-100 h-32 md:h-64 rounded-md bg-white shadow-md cursor-pointer hover:shadow-lg transition group"
            onClick={() => {
                navigate("/deck", {
                    state: {
                        subject: title,
                    },
                });
            }}
        >
            <div className="h-full w-full flex md:flex-col items-center md:justify-around">
                <div className="w-16 h-16 md:w-32 md:h-32 rounded-full mx-4 bg-gradient-to-br from-accent-600 to-accent-300">
                    <div className="h-full w-full flex justify-center items-center text-white text-4xl uppercase monospace">
                        {title[0]}
                    </div>
                </div>
                <div className="w-64 md:w-80 text-xl md:text-center text-gray-500 group-hover:text-gray-800 truncate ">
                    {title}
                </div>
            </div>
        </div>
    );
}

export default function Subjects() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newSubjectTitle, setNewSubjectTitle] = useState<string>("");

    const [blocks, setBlocks] = useState<SubjectBlockProps[]>([
        {
            title: "Machine Learning",
        },
        {
            title: "Operating System",
        },
        {
            title: "Computer Networks",
        },
        {
            title: "Seminar",
        },
        {
            title: "Economics and Bussiness Management",
        },
        {
            title: "Astronomy",
        },
    ]);

    const handleNewSubjectSubmit = () => {
        console.log(newSubjectTitle);
        setBlocks([
            ...blocks,
            {
                title:
                    newSubjectTitle.charAt(0).toUpperCase() +
                    newSubjectTitle.slice(1),
            },
        ]);
        setNewSubjectTitle("");
        return setIsModalOpen(false);
    };

    return (
        <div className="h-full w-100 overflow-y-auto">
            <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
                <div className="h-full w-100 flex justify-center items-center">
                    <form className="w-full sm:w-2/3 flex flex-col">
                        <label className="text-lg">
                            Enter title of the new subject
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            autoFocus
                            value={newSubjectTitle}
                            onChange={(e) => setNewSubjectTitle(e.target.value)}
                            className="bg-accent-100 rounded-md p-2 my-4"
                        />
                        <button
                            type="submit"
                            className="bg-accent-400 p-2 rounded-md text-white"
                            onClick={handleNewSubjectSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </Modal>
            <div className="mx-4 md:w-2/3 md:mx-auto">
                <div className="text-4xl font-semibold uppercase py-8 md:py-10">
                    Subjects
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
                    {blocks.map((b) => (
                        <SubjectBlock key={b.title} title={b.title} />
                    ))}
                    <div
                        className="w-100 h-32 md:h-64 rounded-md transition-all border-2 border-dashed border-gray-500 hover:border-black hover:border-solid shadow-md cursor-pointer hover:shadow-lg group flex justify-center items-center"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <div className="text-2xl text-gray-600 group-hover:text-black">
                            Add New
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
