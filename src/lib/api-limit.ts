import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

// Function to increase the API limit count for a user
export const increaseApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        console.error("No userId found in auth.");
        return;
    }

    try {
        const userApiLimit = await prismadb.userApiLimit.findUnique({
            where: { userId }
        });

        if (userApiLimit) {
            await prismadb.userApiLimit.update({
                where: { userId },
                data: { count: userApiLimit.count + 1 },
            });
        } else {
            await prismadb.userApiLimit.create({
                data: { userId, count: 1 }
            });
        }
    } catch (error) {
        console.error("Error in increaseApiLimit:", error);
    }
}; 

// Function to check if the user has exceeded their API limit
export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        console.error("No userId found in auth.");
        return false;
    }

    try {
        const userApiLimit = await prismadb.userApiLimit.findUnique({
            where: { userId }
        });

        console.log("userApiLimit:", userApiLimit);

        if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
            return true;
        } else {
            console.warn("API limit exceeded for user:", userId);
            return false;
        }
    } catch (error) {
        console.error("Error in checkApiLimit:", error);
        return false; // Consider user to have exceeded the limit in case of an error
    }
};
