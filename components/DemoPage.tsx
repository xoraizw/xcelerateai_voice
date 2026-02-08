"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff, Loader2, Volume2, AlertCircle, User, Bot } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import Vapi from "@vapi-ai/web";

interface Demo {
  id: string;
  name: string;
  prompt: string;
  publicId: string;
}

interface DemoPageProps {
  demo: Demo;
}

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export default function DemoPage({ demo }: DemoPageProps) {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize VAPI
    const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    
    if (!vapiPublicKey) {
      setError("VAPI configuration missing. Please add your VAPI public key.");
      return;
    }

    const vapiInstance = new Vapi(vapiPublicKey);
    setVapi(vapiInstance);

    // Set up event listeners
    vapiInstance.on("call-start", () => {
      setIsCallActive(true);
      setIsConnecting(false);
      toast.success("Call connected!");
    });

    vapiInstance.on("call-end", () => {
      setIsCallActive(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setCallDuration(0);
      toast.success("Call ended");
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    // Listen for transcript updates - group consecutive messages from same speaker
    vapiInstance.on("message", (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const role = message.role === "assistant" ? "assistant" : "user";
        const text = message.transcript;
        
        setTranscript((prev) => {
          // If the last message is from the same speaker, append to it
          if (prev.length > 0 && prev[prev.length - 1].role === role) {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              text: updated[updated.length - 1].text + " " + text,
              timestamp: new Date(), // Update timestamp
            };
            return updated;
          } else {
            // New speaker, create new message
            return [...prev, {
              role,
              text,
              timestamp: new Date(),
            }];
          }
        });
      }
    });

    vapiInstance.on("error", (error) => {
      console.error("VAPI Error:", error);
      setIsConnecting(false);
      setIsCallActive(false);
      toast.error("Call failed. Please try again.");
    });

    return () => {
      if (vapiInstance) {
        vapiInstance.stop();
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallActive]);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const startCall = async () => {
    if (!vapi) {
      toast.error("VAPI not initialized");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      await vapi.start({
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: demo.prompt,
            },
          ],
        },
        voice: {
          provider: "11labs",
          voiceId: "21m00Tcm4TlvDq8ikWAM", // Rachel voice
        },
      });
    } catch (error) {
      console.error("Failed to start call:", error);
      setIsConnecting(false);
      toast.error("Failed to start call");
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
    // Clear transcript when call ends (optional - you can keep it if you want history)
    // setTranscript([]);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="XcelerateAI Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                XcelerateAI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Accelerating Business with AI
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Demo Info & Call Controls */}
            <div>
              {/* Demo Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {demo.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Click the button below to start talking with the AI agent
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Call Controls */}
            <div className="flex flex-col items-center gap-6">{/* Status Display */}
              {isCallActive && (
                <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-900 dark:text-green-100 font-medium">
                        Call Active
                      </span>
                    </div>
                    <span className="text-green-800 dark:text-green-200 font-mono">
                      {formatDuration(callDuration)}
                    </span>
                  </div>
                  {isSpeaking && (
                    <div className="flex items-center gap-2 mt-3">
                      <Volume2 className="w-4 h-4 text-green-600 animate-pulse" />
                      <span className="text-sm text-green-700 dark:text-green-300">
                        AI is speaking...
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Call Button */}
              {!isCallActive ? (
                <button
                  onClick={startCall}
                  disabled={isConnecting || !!error}
                  className="group relative w-40 h-40 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 rounded-full shadow-2xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  {isConnecting ? (
                    <Loader2 className="w-16 h-16 text-white mx-auto animate-spin" />
                  ) : (
                    <Phone className="w-16 h-16 text-white mx-auto" />
                  )}
                  <span className="block text-white font-semibold mt-2">
                    {isConnecting ? "Connecting..." : "Start Call"}
                  </span>
                </button>
              ) : (
                <button
                  onClick={endCall}
                  className="group relative w-40 h-40 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full shadow-2xl transition-all transform hover:scale-105"
                >
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <PhoneOff className="w-16 h-16 text-white mx-auto" />
                  <span className="block text-white font-semibold mt-2">End Call</span>
                </button>
              )}

              {/* Instructions */}
              {!isCallActive && !isConnecting && (
                <div className="text-center text-gray-600 dark:text-gray-400">
                  <p className="text-sm">
                    Allow microphone access when prompted
                  </p>
                  <p className="text-xs mt-1 text-gray-500 dark:text-gray-500">
                    Make sure your microphone is connected and working
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Live Transcript */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sticky top-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              Live Transcript
            </h3>

            {transcript.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-sm">Transcript will appear here during the call</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {transcript.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "assistant"
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.role === "assistant"
                            ? "text-gray-500 dark:text-gray-400"
                            : "text-blue-100"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={transcriptEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
