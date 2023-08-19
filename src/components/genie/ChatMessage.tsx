import {Message, GenieMessage} from "@/typings/Message";
import {GenieChatMessage} from "@/components/genie/GenieChatMessage";
import {UserChatMessage} from "@/components/genie/UserChatMessage";

type ChatMessageProps = {
    message: Message,
    regenerateImage: (prompt: string) => void,
    upscale: (source: GenieMessage) => Promise<void>
}

export const ChatMessage = ({message, regenerateImage, upscale}: ChatMessageProps) => {
    const genie = message.sender === "genie"
    return (
        <div className={`w-[600px] my-[5px] flex self-${genie ? "start" : "end flex-row-reverse"} `}>
            {
                genie ? (
                    <GenieChatMessage
                        message={message as GenieMessage}
                        regenerateImage={regenerateImage}
                        upscale={upscale}
                    />
                ) : (
                    <UserChatMessage message={message} />
                )
            }
        </div>
    )
}