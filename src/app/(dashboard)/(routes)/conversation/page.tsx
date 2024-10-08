
"use client"
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MessageSquare } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {ChatCompletionRequestMessage}  from "openai";

import {Heading} from "@/components/headings"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import {Loader} from "@/components/loader";
import { cn } from "@/lib/utils";

import {formSchema} from "./constants";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

type ChatCompletionRequestMessage = {
    role: "user" | "assistant";
    content: string;
  };


const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages]= useState<ChatCompletionRequestMessage[]> ([]);

    const form = useForm<z.infer<typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          const userMessage: ChatCompletionRequestMessage = {
            role: "user",
            content: values.prompt,
          };
          const newMessages = [...messages, userMessage];

          console.log("Sending request with messages:", newMessages);
      
          const response = await axios.post("/api/conversation",
            {messages: newMessages},
        );

          console.log("Received response:", response.data);

         if (response.data.content) {
             const assistantMessage: ChatCompletionRequestMessage = {
            role: "assistant",
         content: response.data.content,
      };
      setMessages((current) => [...current, userMessage, assistantMessage]);
    } else {
      console.error("Unexpected response format:", response.data);
    }
    
    form.reset();
      } catch (error: any) {
          console.log("Error in onSubmit:", error);
        } finally {
          router.refresh();
        }
      };

      return (
        <div>
          <Heading
            title="Conversation"
            description="Have a chat with our most advanced conversation model 🐥"
            icon={MessageSquare}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"
          />
          <div className="px-4 lg:px-8">
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="
                  rounded-lg 
                  border 
                  w-full 
                  p-4
                  px-3
                  md:px-6
                  focus-within:shadow-sm
                  grid
                  grid-cols-12
                  gap-2 "
              >
                <FormField
                  name="prompt"
                  render={({field}) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m=0 p-0">
                        <Input 
                          className="border-0 outline-none
                          focus-visible:ring-0
                          focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="How do I calculate the radius of a circle?"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                  Generate
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4 px-4 lg:px-8">
            {isLoading && (
                <div className="p-8 rounded-lg w-full flex items-center
                justify-center bg-muted">
                    <Loader />
                </div>
            )}
            {messages.length === 0 && !isLoading && (
              <div>
                <Empty label="No Conversation Started" />
              </div>
            )}
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message) => (
                <div  
                  key={message.content}
                  className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                    message.role === "user"? "bg-white border border-black/10" : "bg-muted"
                  )}
                >

                  {message.role === "user"? <UserAvatar /> : <BotAvatar/> }
                  <p className="text-sm">
                  {message.content}
                  </p>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

export default ConversationPage;