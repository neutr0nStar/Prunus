import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../Components/Modal";

type EditDeckRouteState = {
    title: string;
};

type CardProps = {
    question: string;
    answer: string;
};

function EditDeckBlock({ question, answer }: CardProps) {
    return (
        <div className="h-64 md:h-32 w-full cursor-pointer rounded-md shadow-md group hover:shadow-lg transition-all duration-200 overflow-hidden">
            <div className="h-full flex flex-col md:flex-row">
                <div className="flex-1 text-lg p-2 bg-white">{question}</div>
                <div className="flex-1 text-lg p-2 bg-accent-400 transition-all duration-200 group-hover:bg-accent-500 text-white">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default function EditDeck() {
    const location = useLocation();
    const title = (location.state as EditDeckRouteState).title;

    const [cards, setCards] = useState<CardProps[]>([
        {
            question: "Question 1",
            answer: "Answer 1",
        },
        {
            question: "Question 2",
            answer: "Answer 2",
        },
        {
            question: "Question 3",
            answer: "Answer 3",
        },
    ]);

    // Editing
    const [editQuestion, setEditQuestion] = useState<string>("");
    const [editAnswer, setEditAnswer] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [isNew, setIsNew] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <div className="h-full w-100 overflow-y-auto">
            {/* Modal */}
            <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
                <div className="h-full w-full flex flex-col">
                    <div className="flex-1 pt-5">
                        <label>Question: </label>
                        <br />
                        <textarea
                            rows={6}
                            name="ques"
                            id="ques"
                            className="p-1 w-full bg-accent-100"
                            value={editQuestion}
                            onChange={(e) => setEditQuestion(e.target.value)}
                        />
                    </div>
                    <div className="flex-">
                        <label>Answer: </label>
                        <br />
                        <textarea
                            rows={6}
                            name="ques"
                            id="ques"
                            className="p-1 w-full bg-accent-100"
                            value={editAnswer}
                            onChange={(e) => setEditAnswer(e.target.value)}
                        />
                    </div>
                    <button className="flex-1 p-1 bg-accent-500 text-white text-lg my-2 md:mb-4 rounded">
                        Submit
                    </button>
                </div>
            </Modal>
            <div className="mx-4 md:w-2/3 md:mx-auto">
                <div className="text-4xl font-semibold uppercase py-8 md:py-10">
                    {title}
                </div>
                <div className="flex flex-col gap-y-4 my-2">
                    {cards.map((c) => (
                        <EditDeckBlock
                            key={c.question}
                            question={c.question}
                            answer={c.answer}
                        />
                    ))}
                    <div
                        className="w-full md:h-32 h-64 rounded-md transition-all border-2 border-dashed border-gray-500 hover:border-black hover:border-solid shadow-md cursor-pointer hover:shadow-lg group flex justify-center items-center"
                        onClick={() => {
                            setIsNew(true);
                            return setIsModalOpen(true);
                        }}
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
