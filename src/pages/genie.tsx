import Layout from "@/components/layout/Layout";
import Head from "next/head";
import React, {useEffect, useRef, useState} from "react";
import {IconButton, TextareaAutosize} from "@mui/material";
import {BsSend} from "react-icons/bs";
import {GenieMessage, Message} from "@/typings/Message";
import {ChatMessage} from "@/components/genie/ChatMessage";
import axios from "axios";
import {getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import {storage} from "@/serverless/firebase";
import {upload} from "@google-cloud/storage/build/src/resumable-upload";

export default function Genie() {

    const [message, setMessage] = useState("")
    const messageEndRef = useRef()
    const [chats, setChats] = useState<Message[]>([])

    const [prompt, setPrompt] = useState<string | null>(null)
    const sendMessage = () => {
        if(message === "" || prompt) return;
        const userMessage: Message = {
            message: message,
            time: Date.now(),
            sender: "user"
        }
        setChats([...chats, userMessage])
        setPrompt(message)
        setMessage("")
    }

    const getPrompt = async (chats: Message[]) => {

        let headersList = {
            Accept: "*/*",
            "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
            chats: chats
        });

        let response = await fetch("/api/generate", {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(`Error: ${res.error.message}`);
        }
        return res.result
    }

    const regenerateImage = (prompt: string) => {
        setPrompt(prompt + "     regenerate this")
    }

    /**
     *
     *  System -> how gpt should behave
     *  user -> what kind of fashion influencer are u
     *  assistant ->
     */
    const generateImage = async (genie: GenieMessage, prompt: string) => {

        try {
            const generatedPrompt = await getPrompt(chats.slice(0, -1))
            console.log(generatedPrompt)
            const response = await fetch( `${process.env.NEXT_PUBLIC_HUGGING_URL}`,{
                method: "POST",
                body: JSON.stringify({
                    inputs: generatedPrompt
                }),
                headers: {
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HUGGING_AUTH}`
                }
            })
            const imageBlob = await response.blob()

            const index = chats.indexOf(genie)
            genie.message = generatedPrompt
            chats[index] = {...genie, image: imageBlob, imageUrl: URL.createObjectURL(imageBlob)} as GenieMessage
            setChats(chats)
        } catch (e) {
            alert(`Request failed for message '${prompt}'`)
        } finally {
            setPrompt(null)
        }
    }

    // eslint-disable-next-line
    useEffect(()=>{
        // @ts-ignore
        messageEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        })
    }, [chats])

    useEffect(() => {
        if(!prompt) return;
        setTimeout(() => {
            const genieMessage: GenieMessage = {
                message: prompt,
                time: Date.now(),
                sender: "genie"
            }
            chats.push(genieMessage)
            setChats(chats)
            generateImage(genieMessage, prompt)
        }, 500)

    }, [prompt])


    return (
        <Layout>
            <Head>
                <title>Genie | Outfitopia</title>
            </Head>
            <div className="w-[85%] mx-auto p-10 flex-1 ">
                <h1 className="text-3xl border-b mb-2 pb-1 border-outfitopia-primary mt-[-60px]">
                    Create your own fashion outfits!
                </h1>
                <div className="w-[100%] h-[100%] flex flex-col">
                    <div className="h-[100%] max-h-[64.7vh] flex overflow-y-auto flex-col transition-[200] py-[10px]">
                        {
                            chats.map(m => {
                                return <ChatMessage message={m} key={m.time} regenerateImage={regenerateImage}/>
                            })
                        }
                        { /* @ts-ignore */}
                        <div ref={messageEndRef}></div>
                    </div>
                    <div className="flex flex-row items-center mb-[-30px]">
                        <TextareaAutosize
                            className="shadow-xl bg-blue-50 text-[20px] resize-none flex-1 outline-none rounded-lg px-3 py-2 border-2 border-[#FFFFEF]"
                            value={message}
                            placeholder="What outfit would you like today?"
                            maxRows={6}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if(!e.shiftKey && e.key == "Enter") {
                                    e.preventDefault()
                                    sendMessage()
                                }
                            }}
                        />
                        <IconButton onClick={sendMessage} style={{
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            fontSize: "32px",
                            margin: "0 5px"
                        }}>
                            <BsSend />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Layout>
    )
}