
"use client"
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { VideoIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {Heading} from "@/components/headings"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import {Loader} from "@/components/loader";

import {formSchema} from "./constants";
import { useRouter } from "next/navigation";


type ChatCompletionRequestMessage = {
    role: "user" | "assistant";
    content: string;
  };


const VideoPage = () => {
    const router = useRouter();
    const [video, setVideo]= useState<string> ("");

    const form = useForm<z.infer<typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo("");

      const response = await axios.post("/api/video", values);
          
      setVideo(response.data[0]);
    
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
          title="Video Generation"
          description="Prompt to generate a video 📽️"
          icon={VideoIcon}
          iconColor="text-orange-700"
          bgColor="bg-orange-700/10"
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
                          placeholder=" Clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                  Create 📽️
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4">
            {isLoading && (
                <div className="p-8 rounded-lg w-full flex items-center
                justify-center bg-muted">
                    <Loader />
                </div>
            )}
            {!video && !isLoading && (
             <div>
             <Empty label="No video generated" />
             </div>
            )}

            {video && (
              <video 
              className="w-full aspect-video mt-8 rounded-lg border bg-black"
              controls>
                <source src={video}/>

              </video>
            )}
          </div>
        </div>
      );
    }

export default VideoPage;