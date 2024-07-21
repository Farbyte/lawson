"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useTabsStore } from "@/app/_store/tabsStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clipboard, Volume2, VolumeX, Check } from "lucide-react";
import { toast } from "sonner";

interface ChatCompProps {
  isLoading: boolean;
  messages: any[];
  sourcesForMessages: Record<string, any>;
  userProfilePic: string;
  messageListRef: React.RefObject<HTMLDivElement>;
}

export const ChatComp = ({
  isLoading,
  messages,
  sourcesForMessages,
  userProfilePic,
  messageListRef,
}: ChatCompProps) => {
  const { activeTab } = useTabsStore();
  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);

  const handleSpeak = (text: string, index: number) => {
    if (!window.speechSynthesis) {
      return toast.error("Your browser does not support speech synthesis.");
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setSpeakingMessageIndex(null);
    };
    setSpeakingMessageIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeakingMessageIndex(null);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedMessageIndex(index);
        setTimeout(() => setCopiedMessageIndex(null), 2000);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      },
    );
  };

  return (
    activeTab === "chat" && (
      <div className="align-center mx-auto flex h-[70vh] w-[80vw] flex-col justify-between pb-[20rem]">
        <div className={`bg-background flex h-[77vh] w-full items-center justify-center sm:h-[72vh]`}>
          <div ref={messageListRef} className="mt-4 h-full w-full overflow-y-scroll rounded-md scrollbar-hide">
            {messages.length === 0 && (
              <div className="flex h-[70vh] items-center justify-center text-xl">
                Ask your first question below!
              </div>
            )}
            <ScrollArea>
              {messages.map((message, index) => {
                return (
                  <div key={`chatMessage-${index}`}>
                    <div
                      className={`text-foreground animate p-4 ${
                        message.role === "assistant"
                          ? "bg-background/50"
                          : isLoading && index === messages.length - 1
                            ? "bg-background animate-pulse"
                            : "bg-background"
                      }`}
                    >
                      <div className="flex">
                        <img
                          key={index}
                          src={message.role === "assistant" ? "/bot.png" : userProfilePic}
                          alt="profile image"
                          width={message.role === "assistant" ? 33 : 33}
                          height={30}
                          className="mr-4 h-full rounded-full"
                        />
                        <div className="flex flex-col gap-5">
                          {message.role === "assistant" && (
                            <div className="flex items-center justify-end gap-6">
                              {copiedMessageIndex === index ? (
                                <Check className="text-green-500" />
                              ) : (
                                <Clipboard
                                  className="cursor-pointer rounded-md hover:bg-gray-200 hover:text-black"
                                  onClick={() => handleCopy(message.content, index)}
                                />
                              )}
                              {speakingMessageIndex === index ? (
                                <VolumeX
                                  className="cursor-pointer rounded-md hover:bg-gray-200 hover:text-black"
                                  onClick={handleStopSpeaking}
                                />
                              ) : (
                                <Volume2
                                  className="cursor-pointer rounded-md hover:bg-gray-200 hover:text-black"
                                  onClick={() => handleSpeak(message.content, index)}
                                />
                              )}
                            </div>
                          )}
                          <ReactMarkdown className="prose">
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  );
};
