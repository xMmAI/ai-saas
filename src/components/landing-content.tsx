"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"; // Ensure Card is imported

const Testimonials = [
    {
        name: "Jennifer",
        avatar: "/logo.pgn", 
        title: "Teacher",
        description: "Fun and convenient app to use to explore the latest LLM abilities!",
    },
    {
        name: "Marcus",
        avatar: "A", 
        title: "CEO",
        description: "all in one place to improve my productivity",
    },
    {
        name: "Ira",
        avatar: "A", 
        title: "Student",
        description: "the free tier is enough for any newbie",
    },
    {
        name: "Betty",
        avatar: "A", 
        title: "Mum",
        description: "Nice work Meo!",
    },
];

export const LandingContent = () => {
    return (
        <div className="px-10 py-20">
           <h2 className="text-center text-4xl text-white font-extrabold mb-10">
            Testimonials
           </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className=" pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
