import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../firebase";

export default function Homepage() {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [reveal, setReveal] = useState<boolean>(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                navigate("/subjects");
            }
        });
        let i = setInterval(() => {
            setReveal(!reveal);
        }, 5000);

        return () => {
            clearInterval(i);
        };
    }, [reveal]);
    return (
        <div className="h-screen w-full py-5 flex flex-col justify-around items-center overflow-hidden">
            <div className="text-5xl font-bold">Prunus</div>
            <div className="w-80 h-60 md:w-[32rem] md:h-80">
                <div
                    className="h-full w-full relative"
                    style={{ perspective: "3000px" }}
                >
                    <div
                        className="w-full h-full absolute top-0 left-0 bg-accent-500 rounded-md transition-all duration-200"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: reveal
                                ? "rotateY(-180deg)"
                                : "rotateY(0deg)",
                        }}
                    >
                        <div className="h-full w-full flex flex-col justify-center items-center gap-y-2 md:gap-y-4">
                            <div className="w-40 h-4 md:w-80 md:h-6 rounded-md bg-white opacity-50"></div>
                            <div className="w-32 h-4 md:w-72 md:h-6 rounded-md bg-white opacity-50"></div>
                        </div>
                    </div>
                    <div
                        className="w-full h-full absolute top-0 left-0 bg-accent-300 rounded-md transition-all duration-200"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: reveal
                                ? "rotateY(0deg)"
                                : "rotateY(180deg)",
                        }}
                    >
                        <div className="h-full w-full flex flex-col justify-center items-center gap-y-2 md:gap-y-4">
                            <div className="w-40 h-4 md:w-80 md:h-6 rounded-md bg-white opacity-75"></div>
                            <div className="w-32 h-4 md:w-72 md:h-6 rounded-md bg-white opacity-75"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-2xl text-center w-4/5">
                Take your learning to the next level using Prunus. <br />
                <b>Sign in to continue.</b>
            </div>
        </div>
    );
}
