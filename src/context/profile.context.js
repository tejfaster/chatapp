import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from '../misc/firebase'

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null)
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        let userRef

        const authUnsub = auth.onAuthStateChanged(authobj => {
            if (authobj) {
                
                userRef = database.ref(`/profiles/${authobj.uid}`)
                userRef.on('value', (val) => {
                    const { name, createdAt } = val.val()
                    // console.log(name)
                    // console.log(createdAt)
                    const data = {
                        name,
                        createdAt,
                        uid: authobj.uid,
                        email: authobj.email,
                    }
                    setProfile(data)
                    setisLoading(false)
                })
            } else {

                if(userRef){
                    userRef.off()
                }

                setProfile(null)
                setisLoading(false)
            }
        })
        return () => {
            authUnsub();

            if(userRef){
                userRef.off()
            }
        }
    }, [])


    return (
        <ProfileContext.Provider value={{ isLoading, profile }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)