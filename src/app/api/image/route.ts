import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { OpenAI } from "openai";

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Prompt required", { status: 400 });
        }

        if (!amount) {
            return new NextResponse("Amount required", { status: 400 });
        }

        if (!resolution) {
            return new NextResponse("Resolution required", { status: 400 });
        }

    
        const response = await openai.images.generate({
            model:"dall-e-2",
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
            quality:"standard"
        });
        
        // Log the entire response to inspect what is being returned
        console.log("Full API Response:", response);
        
        if (!response.data || Object.keys(response.data).length === 0) {
            console.error("No data returned from OpenAI API.");
            return new NextResponse("No data returned from OpenAI API", { status: 500 });
        }
        
        // Sanitize and return the response
        const safeData = JSON.parse(JSON.stringify(response.data));
        return NextResponse.json(safeData);

    } catch (error: any) {
        console.error("[IMAGE_ERROR]", error);
        console.error("Error Details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
        });
        return new NextResponse("Internal error", { status: 500 });
    }
  
}
