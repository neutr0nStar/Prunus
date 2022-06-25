import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type DeckItem = {
    question: string;
    answer: string;
};

type CardProps = {
    question: string;
    answer: string;
    getNextCard: Function;
};

function Card({ question, answer, getNextCard }: CardProps) {
    const [reveal, setReveal] = React.useState<boolean>(false);
    const backClass: string = reveal
        ? "h-full w-full absolute top-0 left-0 bg-accent-200 rounded-lg flex flex-col items-center transition-all duration-300 ease-out"
        : "h-full w-full absolute top-0 left-0 bg-accent-200 rounded-lg flex flex-col items-center transition-all duration-300 ease-out translate-y-full opacity-0";

    return (
        <div className="relative h-4/5 w-4/5 md:h-3/4 md:w-3/5 rounded-lg shadow-accent-200 shadow-md overflow-hidden">
            <div className="h-full w-full absolute top-0 left-0 bg-accent-500 rounded-lg flex flex-col items-center">
                <div className="flex-1">
                    <div className="w-full h-full px-5 text-center flex justify-center items-center text-accent-200 text-2xl">
                        {question}
                    </div>
                </div>
                <button
                    className="p-2 mb-1 text-xl"
                    onClick={() => setReveal((prev) => !prev)}
                >
                    <div className="text-accent-200 uppercase font-bold">
                        Reveal
                    </div>
                </button>
            </div>
            <div className={backClass}>
                <button
                    className="absolute top-0 right-2 text-3xl"
                    onClick={() => setReveal((prev) => !prev)}
                >
                    &times;
                </button>
                <div className="flex-1">
                    <div className="h-full w-full px-5 text-2xl text-center flex flex-col justify-center items-center">
                        {answer}
                    </div>
                </div>
                <button
                    className="p-2 mb-1 text-xl"
                    onClick={() => {
                        setReveal((prev) => !prev);
                        getNextCard();
                    }}
                >
                    <div className="text-accent-600 uppercase font-bold">
                        Next
                    </div>
                </button>
            </div>
        </div>
    );
}

export default function Cards() {
    const navigate = useNavigate();

    let deck: DeckItem[] = [
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
        {
            question: "Question 4",
            answer: "Answer 4",
        },
    ];

    const [currIdx, setCurrIdx] = useState<number>(0);

    const getNextCard = () => {
        if (currIdx === deck.length - 1) {
            alert("You have completed the deck !");
            navigate(-1);
        } else {
            setCurrIdx((prev) => prev + 1);
        }
    };

    return (
        <div>
            <div className="h-screen w-full relative flex justify-center items-center">
                {/* Card */}
                <Card
                    question={deck[currIdx].question}
                    answer={deck[currIdx].answer}
                    getNextCard={getNextCard}
                />
            </div>
        </div>
    );
}
