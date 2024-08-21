import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Replicate from "replicate";

// Initialize Replicate with your API token
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
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
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            { 
                input: {
                    prompt_a: prompt
                }
            }
        );

        return NextResponse.json(response);

    } catch (error: any) {
        console.error("[MUSIC_ERROR]", error);
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            response: error.response ? error.response.data : null,
        });
    
        return new NextResponse("Internal error", { status: 500 });
    }
}
