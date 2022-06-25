import React from "react";
import { useNavigate } from "react-router-dom";

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
    let blocks: SubjectBlockProps[] = [
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
    ];

    return (
        <div className="h-full w-100 overflow-y-auto">
            <div className="mx-4 md:w-2/3 md:mx-auto">
                <div className="text-4xl font-semibold uppercase py-8 md:py-10">
                    Subjects
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
                    {blocks.map((b) => (
                        <SubjectBlock key={b.title} title={b.title} />
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
