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
//model call from replicate
        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            { 
                input: {
                    prompt_a: prompt
                }
            }
        );

        return NextResponse.json(response);

    } catch (error: any) {
        console.error("[VIDEO_ERROR]", error);
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            response: error.response ? error.response.data : null,
        });
    
        return new NextResponse("Internal error", { status: 500 });
    }
}
