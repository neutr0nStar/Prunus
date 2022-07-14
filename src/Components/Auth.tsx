import React, { useEffect, useState } from "react";
import app from "../firebase";
import {
    signInWithPopup,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc,
} from "firebase/firestore";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

type CustomUser = {
    displayName: string;
    photoURL: string;
    email: string;
};

export default function Auth() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser({
                    displayName: user.displayName!,
                    photoURL: user.photoURL!,
                    email: user.email!,
                });
                // Check if doc exists for the user, if not, create
                const docRef = doc(db, "users", user.email!);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() === false) {
                    await setDoc(docRef, {
                        email: user.email,
                    });
                }
            } else {
                setCurrentUser(null);
            }
        });
    }, []);

    const handleAuth = () => {
        if (currentUser === null) {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                    // console.log(credential);
                    // const token = credential.accessToken;
                    // The signed-in user info.
                    // const user = result.user;
                    // ...
                })
                .catch((error) => {
                    console.log(error);
                    if (error === "auth/popup-blocked")
                        alert("Kindly allow popups");
                });
            setIsModalOpen(false);
        } else {
            signOut(auth);
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
                <div className="h-full w-full flex justify-center items-center">
                    <div className="w-3/5 flex flex-col justify-center items-center gap-y-8">
                        <img
                            src={
                                currentUser === null
                                    ? "/images/profile.png"
                                    : currentUser!.photoURL
                            }
                            referrerPolicy="no-referrer"
                            alt="profile"
                            className="h-20 w-20 rounded-full"
                        />
                        <div className="text-2xl">
                            {currentUser && currentUser.displayName}
                        </div>
                        <button
                            className="bg-accent-500 w-full text-white p-2 rounded-md"
                            onClick={handleAuth}
                        >
                            {currentUser === null ? "Sign In" : "Sign Out"}
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="absolute top-0 right-0 m-4">
                <img
                    src={
                        currentUser === null
                            ? "/images/profile.png"
                            : currentUser!.photoURL
                    }
                    alt="profile"
                    className="h-10 cursor-pointer rounded-full"
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                />
            </div>
        </>
    );
}
