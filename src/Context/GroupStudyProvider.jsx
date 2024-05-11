import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase';
import { GithubAuthProvider, GoogleAuthProvider,  } from 'firebase/auth/web-extension';
export const GroupStudyContext = createContext()
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const GroupStudyProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const loginWIthGithub = () =>{
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }
    const updateUserProfile = () => {
        setLoading(true)
        return updateProfile(auth.currentUser)
    }



    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
             setUser(currentUser)
             console.log('user is existing and observing ', currentUser);
             setLoading(false)
         })
         return(()=>{
             unSubscribe()
         })    
     })

    const studyInfo = {
        createUser,
        loginUser,
        loginWithGoogle,
        logOutUser,
        user,
        updateUserProfile,
        loading,
        setLoading,
        loginWIthGithub,
    }

    return (
        <div>
            <GroupStudyContext.Provider value={studyInfo}>
                {children}
            </GroupStudyContext.Provider>
        </div>
    );
};

export default GroupStudyProvider;