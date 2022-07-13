import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Subjects from "./Pages/Subjects";
import Deck from "./Pages/Deck";
import Cards from "./Pages/Cards";
import EditDeck from "./Pages/EditDeck";
import Auth from "./Components/Auth";
import Homepage from "./Pages/Homepage";

function App() {
    return (
        <div className="min-h-screen w-full bg-gray-200">
            <BrowserRouter>
                <Auth />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/home" element={<Homepage />} />
                    <Route path="subjects" element={<Subjects />} />
                    <Route path="deck" element={<Deck />} />
                    <Route path="editDeck" element={<EditDeck />} />
                    <Route path="cards" element={<Cards />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
