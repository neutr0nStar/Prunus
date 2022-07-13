import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import app from "../firebase";

export default function Homepage() {
    const auth = getAuth(app);
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                navigate("/subjects");
            }
        });
    }, []);
    return (
        <div className="h-screen w-full flex justify-center items-center text-3xl">
            Homepage
        </div>
    );
}
