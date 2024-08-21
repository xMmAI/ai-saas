import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { OpenAI } from "openai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

// Initialize OpenAI Client with the API Key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const authData = auth();
        const userId = authData?.userId;

        if (!userId) {
            console.error("User ID not found during authentication.");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { messages } = body;

        if (!openai.apiKey) {
            console.error("OpenAI API Key is not configured.");
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!Array.isArray(messages) || messages.length === 0) {
            console.error("Invalid or missing 'messages' in the request body.");
            return new NextResponse("Invalid or missing 'messages'", { status: 400 });
        }

        //const freeTrial = await checkApiLimit();

        //if (!freeTrial) {
        //    console.warn("Free trial has expired for user:", userId);
        //    return new NextResponse("Free trial has expired.", { status: 403 });
        //}

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
        });

        //await increaseApiLimit();

        if (!response.choices || response.choices.length === 0 || !response.choices[0].message) {
            console.error("Invalid response from OpenAI API.");
            return new NextResponse("Invalid response from OpenAI", { status: 500 });
        }

        return NextResponse.json(response.choices[0].message);

    } catch (error: any) {
        console.error("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    };
};
