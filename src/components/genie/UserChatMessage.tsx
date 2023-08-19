import {Message} from "@/typings/Message";

export const UserChatMessage = ({message}: {message: Message}) => {
    return (
        <div className="self-end shadow-lg text-right rounded-xl rounded-tr-none text-[20px] p-[10px] bg-emerald-100 mr-[10px] max-w-[100%] break-words">
            {message.message}
        </div>
    )
}