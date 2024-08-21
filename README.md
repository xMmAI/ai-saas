## Acknowledgements

This application was successfully developed following the course by Antonio: [Code With Antonio](https://www.codewithantonio.com/)

- Course: Build a Saas AI Platform 
- Course Link: (https://www.codewithantonio.com/projects/ai-saas)

Special thanks to Antonio for providing the knowledge and framework that made this AI SaaS application possible.

# MmAI: Your All-in-One AI Creative Suite

MmAI (Me Myself and AI) is an all-in-one AI Saas Platform at your fingertips. This application showcases the power of llms across multiple creative domains, including chat, image generation, code synthesis, video production, and audio creation. This is an application developed in the build with antonio course

## Features

- Conversational AI: Interact with OpenAI 4o-mini chatbot for various tasks and queries.
- Image Generation: Create images based on text descriptions with OpenAI Dalle-2.
- Code Assistance: Generate and manipulate code snippets.
- Video Creation: Produce short video content from text.
- Audio Generation: Create audio content including music and sound using text.

## Key Dependencies

- [Next.js](https://nextjs.org/): The React framework for building the web application, providing server-side rendering and routing.
- [shadcn/ui](https://ui.shadcn.com/): A component library for building the user interface.
- [OpenAI API](https://www.openai.com/): Provides natural language processing capabilities for various features.
- [Clerk](https://clerk.dev/): Handles user authentication and account management.
- [Replicate](https://replicate.com/): Offers AI models for image, audio and video generation tasks. 

You can swap any of the models to the model of your choice.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Installation
#### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/mmai.git
cd mmai
```
#### 2. Install dependencies: 
```npm install
or
yarn install
```

#### 3. Set up environment variables:
Create a .env file in the root directory and add the following variables:
```NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
OPENAI_API_KEY=your_openai_api_key
REPLICATE_API_TOKEN=your_replicate_api_token
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
