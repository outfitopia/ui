import { GenieMessage } from "@/typings/Message";
import Lottie from "react-lottie-player";
import loading from "../../../public/assets/animations/loading.json";
import { Button } from "@mui/material";
import { db, storage } from "@/serverless/firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { ClosetItem } from "@/typings/ClosetItem";
import { addDoc, collection, doc } from "firebase/firestore";
import { useState } from "react";
import loadingdot from "../../../public/assets/animations/loadingdot.json";
import { AiOutlineReload } from "react-icons/ai";
import { HiOutlineSparkles } from "react-icons/hi";
import TypewriterEffect from "@/components/genie/TypewriterEffect";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {BiShare} from "react-icons/bi";

export const GenieChatMessage = ({ message, regenerateImage }: { message: GenieMessage, regenerateImage: (prompt: string) => void }) => {
    const { data: session } = useSession();
    const [uploading, setUploading] = useState(false); // use this state as loading

    const addToCloset = async () => {
        setUploading(true);
        try {
            const time: number = Date.now();
            const storageRef = ref(storage, `images/${time}.jpg`);
            await uploadBytes(storageRef, message.image!);
            const imageUrl = await getDownloadURL(storageRef);
            const item: ClosetItem = {
                details: message.message,
                imageUrl: imageUrl,
            };

            await addDoc(
                collection(
                    doc(db, "users", (await session)!.user!.email!),
                    "closet"
                ),
                item
            );
            alert("Added to closet");
        } catch (e) {
            alert("Could not add to closet");
        } finally {
            setUploading(false);
        }
    };

    const searchSimilarItems = () => {};

    const reloadImage = () => {
        regenerateImage(message.message)
    };

    const upscaleImage = () => {};

    const shareImage = () => {
        const data = {
            files: [
                new File([message.image!], 'image.jpeg', {
                    type: message.image!.type,
                }),
            ],
            title: 'Image',
            text: 'image',
        };
        navigator.share(data)
    }

    return (
        <div className="flex flex-col rounded-xl rounded-tl-none shadow-lg ml-[10px] transition-[300] bg-cyan-100 max-w-[100%] break-words py-2">
            {!message.loading ? (
                <>
                    <TypewriterEffect text={message.message} />
                    <LazyLoadImage
                        className="p-[10px]"
                        src={message.imageUrl}
                        alt="Failed to load image"
                    />
                    {uploading ? (
                        <Lottie
                            style={{ height: "50px", scale: "200%" }}
                            animationData={loadingdot}
                            play
                            loop
                        />
                    ) : (
                        <div className="flex w-full justify-center space-x-2">
                            <Button
                                variant="outlined"
                                onClick={addToCloset}
                            >
                                Add to closet
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={searchSimilarItems}
                            >
                                Search similar items
                            </Button>
                            <Button
                                variant="outlined"
                                className="text-2xl"
                                onClick={reloadImage}
                            >
                                <AiOutlineReload />
                            </Button>
                            <Button
                                variant="outlined"
                                className="text-2xl"
                                onClick={upscaleImage}
                            >
                                <HiOutlineSparkles />
                            </Button>
                            <Button
                                variant="outlined"
                                className="text-2xl"
                                onClick={shareImage}
                            >
                                <BiShare />
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <Lottie
                    className="h-[150px] w-[150px]"
                    animationData={loading}
                    play
                    loop
                />
            )}
        </div>
    );
};
