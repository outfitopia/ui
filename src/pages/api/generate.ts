import { Configuration, OpenAIApi } from "openai";
import {NextApiRequest, NextApiResponse} from "next";
import {Message} from "@/typings/Message";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function id(req: NextApiRequest, res: NextApiResponse) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message:
                    "OpenAI API key not configured, please follow instructions in README.md",
            },
        });
        return;
    }

    const chats = req.body.chats || []

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: getMessages(chats),
            temperature: 1,
        });
        console.log(completion.data.usage);
        res.status(200).json({
            result: completion?.data?.choices[0]?.message?.content,
        });
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: "An error occurred during your request.",
                },
            });
        }
    }
}

const getMessages = (chats: Message[]) => {
    const messages = chats.map(m => {
        return {
            role: m.sender === "genie" ? "assistant" : "user",
            content: m.message
        }
    })
    return [
        {
            role: "system",
            content:
                "You are a fashion outfit designer. Your job is to provide details of outfits based on a user's demand and their details and you can also consider recent trends, season and festivals while deciding outfit details. User might ask changes in the outfits suggested by you. In your every response, you must provide the exact details of the outfit, which includes color, size and other important details for each type of cloth and accessory in the outfit, do not use any filler words and do not start describing which season, festival or age group the dress is for, just tell the outfit details and nothing else, preferably in comma seperated manner. Do not provide your responses like you are talking to person and suggesting them something, instead of your response should just tell the outfit details, there should be no conversational words or phrases in any of your responses. Whenever user asks for a modification, give them the comp[lete outfit details again instead of just suggesting the changes asked.",
        },
        { role: "user", content: `Hi fashion ai, some information about me includes... Tell me about the recent fashion trends` },
        {
            role: "assistant",
            content: "Casual chic dominates recent trends. Oversized blazers paired with bike shorts rock street style. Slip dresses bring elegance to casual outings. Athleisure gains ground, joggers and hoodies for everyday comfort. Knitted vests make a cozy comeback. For evenings, satin tops and leather pants exude boldness. Monochrome suits elevate formal gatherings. Sheer fabrics and cutouts showcase daring flair. Loungewear evolves with matching sets. Sustainable fashion surges, recycled materials and earthy tones rule. Overall, a fusion of comfort, sustainability, and flair characterizes contemporary fashion vibes."
        },
        {
            role: "assistant",
            content: `Current date is ${new Date().toDateString()} so I will provide you details of outfits suitable for this time of the year. Dont worry, I won't provide any unnecessary details, I  will provide specifics of the suggested outfit in each of my responses`
        },
        ...messages
    ];
};