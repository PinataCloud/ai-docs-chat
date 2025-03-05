import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { pinata } from "@/app/pinata";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    console.log("User Input:", messages[messages.length - 1]);

    const text = messages[messages.length - 1].content;

    const data = await pinata.files.queryVectors({
      groupId: "0195676d-d034-7588-a8c4-602b9639837c",
      query: text,
      returnFile: true,
    });

    console.log(data.data)

    const result = streamText({
        model: openai('gpt-4o'),
        system: `${process.env.CUSTOM_PROMPT}. Also, please only use the following to help inform your response and do not make up additional information: ${data.data}`,
        messages,
      });
      return result.toTextStreamResponse({
        headers: {
          'Content-Type': 'text/event-stream',
        },
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}