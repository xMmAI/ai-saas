import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { OpenAI } from "openai";

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//Giving it a system prompt
const instruction = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. You must always porvide explanation using code comments."
};

export async function POST(req: NextRequest) {
    try {
        let userId;
        try {
            const authData = auth();
            userId = authData.userId;
            console.log("User ID:", userId);
        } catch (authError) {
            console.error("[AUTH_ERROR]", authError);
            return new NextResponse("Authentication Failed", { status: 500 });
        }

        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!Array.isArray(messages) || messages.length === 0) {
            return new NextResponse("Invalid or missing 'messages'", { status: 400 });
        }
// parcing instruction to message for output
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instruction, ...messages]
        });

        if (!response.choices || response.choices.length === 0 || !response.choices[0].message) {
            return new NextResponse("Invalid response from OpenAI", { status: 500 });
        }

        return NextResponse.json(response.choices[0].message);

    } catch (error: any) {
        console.error("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}