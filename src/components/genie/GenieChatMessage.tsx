import {GenieMessage} from "@/typings/Message";
import Lottie from "react-lottie-player";
import loading from "../../../public/assets/animations/loading.json"
import Image from "next/image";
import {Button} from "@mui/material";
import {app, db, storage} from "@/serverless/firebase";
import {useSession} from "next-auth/react";
import {getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import {ClosetItem} from "@/typings/ClosetItem";
import {addDoc, collection, doc} from "firebase/firestore";
import {useState} from "react";
import loadingdot from "../../../public/assets/animations/loadingdot.json"

export const GenieChatMessage = ({message}: {message: GenieMessage}) => {

    const {data: session} = useSession()
    const [uploading, setUploading] = useState(false)

    const addToCloset = async () => {
        setUploading(true)
        try {
            const time: number = Date.now()
            const storageRef = ref(storage, `images/${time}.jpg`)
            await uploadBytes(storageRef, message.image!)
            const imageUrl = await getDownloadURL(storageRef)
            const item: ClosetItem = {
                details: message.message,
                imageUrl: imageUrl
            }

            await addDoc(collection(doc(db, "users", (await session)!.user!.email!), "closet"), item)
            alert("Added to closet")
        } catch(e) {
            alert("Could not add to closet")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col rounded-xl rounded-tl-none shadow-lg ml-[10px] transition-[300] bg-cyan-100 max-w-[100%] break-words">
            {
                message.image ? (
                    <>
                        <img className="p-[10px]" src={message.imageUrl} alt="Failed to load image" />
                        {
                            uploading ? (
                                <Lottie
                                    style={{height: "50px", scale: "200%"}}
                                    animationData={loadingdot}
                                    play
                                    loop />
                            ) : (
                                <Button
                                    variant="outlined"
                                    style={{width: "100%", fontSize: "18px"}}
                                    onClick={() => addToCloset()}
                                >
                                    Add to closet
                                </Button>
                            )
                        }
                    </>
                ) : (
                    <Lottie
                        className="h-[150px] w-[150px]"
                        animationData={loading}
                        play
                        loop />
                )
            }
        </div>
    )
}