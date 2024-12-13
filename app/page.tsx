"use client";

import { useChat } from "ai/react";
import { useRef, useEffect, useState } from "react";
import Pinnie from "./components/Pinnie";
import User from "./components/User";
import MarkdownRenderer from "./components/MarkdownRenderer";
import TypingBubble from "./components/TypingBubble";

export default function Page() {
  const [typingBubble, setTypingBubble] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    streamProtocol: "text",
  });

  // Ref to track the last message for auto-scrolling
  const bottomRef: any = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }

    if(messages && messages.length > 0 && messages[messages.length - 1].role === "user") {
      setTypingBubble(true);
    } else {
      setTypingBubble(false);
    }
  }, [messages]);

  // Handle Shift + Enter and dynamic resizing
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event as any);
      const textarea = document.getElementById("query");
      if (textarea) {
        textarea.style.height = "auto";
      }
    }
  };

  const handleInputResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = "auto"; // Reset height
    if (input.length > 0) {
      textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height to fit content
    } else {
      textarea.style.height = "auto";
    }
    handleInputChange(event); // Trigger existing input handler
  };

  return (
    <div className="w-screen min-h-screen bg-bgColor flex flex-col relative">
        <div className="w-screen px-8 py-4 m-auto flex justify-end absolute z-10">
          <a className="bg-green rounded-full pb-2 pt-3 px-6 text-black font-extrabold font-custom uppercase" href="https://pinata.cloud">Pinata</a>
          <a className="bg-purple ml-2 rounded-full pb-2 pt-3 px-6 text-black font-extrabold font-custom uppercase" href="https://docs.pinata.cloud">Docs</a>
        </div>      
      <img
        className="z-0 fixed min-w-screen min-h-screen -top-20 left-0"
        src="/background.png"
        alt="background"
      />
      <div className="absolute w-screen min-h-screen top-0 left-0">
        <div className="w-4/5 max-w-[600px] m-auto mt-[94px] chat-border">
          <h1
            className={`pt-2 font-custom text-center text-dark text-[40px] md:text-[60px]lg:text-[75px] font-extrabold`}
          >
            ASK PINNIE
          </h1>
        </div>

        {/* Scrollable Message Container */}
        <div className="relative mt-[31px] bg-[#EBEEFE] rounded-[60px] w-3/4 min-h-[75vh] max-w-[1200px] m-auto flex-grow overflow-y-auto shadow-lg mb-[94px]">
          <div className="px-4 pt-4 pb-20">
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? (
                  <div className="w-full flex justify-end my-2">
                    <span className="font-bold flex flex-col justify-center w-3/4 bg-purple text-white user-chat px-4 py-2 mr-2">
                      {m.content}
                    </span>
                    <User />
                  </div>
                ) : (
                  <div className="w-full flex justify-start my-2">
                    <Pinnie />
                    <span className="font-bold w-3/4 bg-gray-200 text-black bot-chat flex flex-col justify-center py-6 px-4 ml-2">
                      <MarkdownRenderer markdownContent={m.content} />
                    </span>
                  </div>
                )}
                {
                  typingBubble && 
                  <div className="w-full flex justify-start my-2">
                    <Pinnie />
                    <span className="font-bold bg-gray-200 text-black bot-chat flex flex-col justify-center py-2 px-4 ml-2">
                      <TypingBubble />
                    </span>
                  </div>
                }
              </div>
            ))}

            {/* Dummy element for auto-scroll */}
            <div ref={bottomRef} />
          </div>
          <form
            onSubmit={handleSubmit}
            className="absolute bottom-[10px] w-full px-4"
          >
            <textarea
              id="query"
              autoFocus
              className="font-custom text-extrabold w-full py-4 px-6 rounded-[60px] outline-none shadow-lg m-auto block text-black resize-none"
              value={input}
              placeholder="Ask Pinnie about our developer docs..."
              onChange={handleInputResize}
              onKeyDown={handleKeyDown}
              rows={1}
              style={{ overflow: "hidden" }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
