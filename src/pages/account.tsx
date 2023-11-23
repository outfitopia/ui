import {getSession, signOut, useSession} from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, {ChangeEvent, useState} from "react";
import Layout from "../components/layout/Layout";
import {GenieFab} from "@/components/common/GenieFab";
import {Button, TextField} from "@mui/material";
import {User} from "@/typings/User";
import {collection, doc, getDoc, getDocs, orderBy, query, setDoc} from "firebase/firestore";
import {db} from "@/serverless/firebase";
import { useRouter } from 'next/router';

function Account({ user }: {user: User}) {
    const router = useRouter();
    const {data: session} = useSession()
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User>(user);
    const [currentUser, setCurrentUser] = useState(user)

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedUser(currentUser);
    };

    const handleSaveClick = async () => {
        try {
            await setDoc(doc(db, "users", session!.user!.email!), editedUser, {merge: true})
            setCurrentUser(editedUser)
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    const handleSignOut = async () => {
        const serverSession = await getSession();

        if (serverSession){
            await signOut({ redirect: false, callbackUrl: '/' });
            router.push('/');
        }
    };

    return (
        <Layout>
            <Head>
                <title>Outfitopia | Account</title>
            </Head>
            <div className="w-[85%] mx-auto p-10">
                <div>
                    <h1 className="text-3xl border-b mb-2 pb-1 border-outfitopia-primary">
                        About you
                    </h1>
                    <div className="flex flex-row shadow-md p-[10px] items-center">
                        <div className="flex-1">
                            <h1 className="font-bold text-[25px]">Age</h1>
                            <div className="text-sm">This will be used to recommend you outfits accordingly</div>
                        </div>
                        {
                            isEditing ? (
                                <TextField
                                    label="Age"
                                    name="age"
                                    type="number"
                                    value={editedUser.age}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <div className="text-[23px]">{currentUser?.age}</div>
                            )
                        }
                    </div>
                    <div className="flex flex-row shadow-md p-[10px] items-center">
                        <div className="flex-1">
                            <h1 className="font-bold text-[25px]">Gender</h1>
                            <div className="text-sm">Your gender will be considered while generating outfits</div>
                        </div>
                        {
                            isEditing ? (
                                <TextField
                                    label="Gender"
                                    name="gender"
                                    value={editedUser.gender}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <div className="text-[23px]">{currentUser?.gender}</div>
                            )
                        }
                    </div>
                    <div className="flex flex-row shadow-md p-[10px] items-center">
                        <div className="flex-1">
                            <h1 className="font-bold text-[25px]">Body size</h1>
                            <div className="text-sm">This will be used to recommend you properly sized outfits</div>
                        </div>
                        {
                            isEditing ? (
                                <TextField
                                    label="Preferred Outfit Size"
                                    name="outfitSize"
                                    value={editedUser.outfitSize}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <div className="text-[23px]">{currentUser?.outfitSize}</div>
                            )
                        }
                    </div>
                    <div className="flex flex-row shadow-md p-[10px] items-center">
                        <div className="flex-1">
                            <h1 className="font-bold text-[25px]">Location</h1>
                            <div className="text-sm">Your location will be used to give you more personalized results</div>
                        </div>
                        {
                            isEditing ? (
                                <TextField
                                    label="Location"
                                    name="location"
                                    value={editedUser.location}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <div className="text-[23px]">{currentUser?.location}</div>
                            )
                        }
                    </div>

                    <div className="w-[100%] my-[20px] flex flex-row justify-evenly">
                        {isEditing ? (
                            <>
                                <Button variant="outlined" style={{fontSize: "25px"}} onClick={handleSaveClick}>Save</Button>
                                <Button variant="outlined" style={{fontSize: "25px"}} onClick={handleCancelClick}>Cancel</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outlined" style={{fontSize: "25px"}} onClick={handleEditClick}>Edit</Button>
                            </>
                        )}
                    </div>


                </div>
                <div className="w-full flex flex-col items-center">
                    <p>
                        Check the{" "}
                        <Link href={"/orders"}>
                        <span className="text-outfitopia-primary cursor-pointer">
                            Orders
                        </span>
                        </Link>{" "}
                        page.
                    </p>
                    <button className="cursor-pointer" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            </div>
            <GenieFab />
        </Layout>
    );
}

export default Account;

export async function getServerSideProps(context: any) {


    const session = await getSession(context);

    if (!session) {
        return {
            props: {},
        };
    }

    const snapshot = await getDoc(
        doc(db, "users", session!.user!.email!)
    )
    const user: User = {
        name: session!.user!.name,
        image: session!.user!.image
    }

    if(snapshot.get("age")) user.age = snapshot.get("age")
    if(snapshot.get("location")) user.location = snapshot.get("location")
    if(snapshot.get("outfitSize")) user.outfitSize = snapshot.get("outfitSize")
    if(snapshot.get("gender")) user.gender = snapshot.get("gender")

    return {
        props: {
            user
        },
    };
}
