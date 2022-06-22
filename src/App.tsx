import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Subjects from "./Pages/Subjects";
import Deck from "./Pages/Deck";

function App() {
    return (
        <div className="min-h-screen w-full bg-gray-200">
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={
                            <div className="h-screen w-full flex justify-center items-center text-3xl">
                                Homepage
                            </div>
                        }
                    />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/deck" element={<Deck />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
