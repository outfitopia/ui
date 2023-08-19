export interface Message {
    message: string,
    sender: "user" | "genie",
    time: number
}

export interface GenieMessage extends Message {
    image?: Blob,
    imageUrl?: string,
    loading: boolean
}