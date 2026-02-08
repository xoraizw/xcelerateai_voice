"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Copy, Loader2 } from "lucide-react";

interface CreateDemoFormProps {
  onDemoCreated?: () => void;
}

export default function CreateDemoForm({ onDemoCreated }: CreateDemoFormProps) {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !prompt.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/demos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, prompt, firstMessage: firstMessage.trim() || undefined }),
      });

      if (!response.ok) {
        throw new Error("Failed to create demo");
      }

      const data = await response.json();
      const link = `${window.location.origin}/demo/${data.publicId}`;
      setGeneratedLink(link);
      toast.success("Demo created successfully!");
      
      // Notify parent component to refresh
      if (onDemoCreated) {
        onDemoCreated();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create demo");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copied to clipboard!");
  };

  const resetForm = () => {
    setName("");
    setPrompt("");
    setFirstMessage("");
    setGeneratedLink("");
  };

  if (generatedLink) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
            Demo Created Successfully! 🎉
          </h4>
          <p className="text-sm text-green-800 dark:text-green-200 mb-4">
            Share this link with your prospects:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded-lg text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => window.open(generatedLink, "_blank")}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Test Demo
          </button>
          <button
            onClick={resetForm}
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Demo Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Sales Assistant Demo"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          required
        />
      </div>

      <div>
        <label
          htmlFor="prompt"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Agent Prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter the system prompt for your AI agent. Example: You are a friendly sales assistant helping customers learn about our product..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
          required
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This prompt defines how your AI agent will behave during calls.
        </p>
      </div>

      <div>
        <label
          htmlFor="firstMessage"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          First Message (Optional)
        </label>
        <input
          type="text"
          id="firstMessage"
          value={firstMessage}
          onChange={(e) => setFirstMessage(e.target.value)}
          placeholder="e.g., Hi! I'm your sales assistant. What brings you here today?"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Leave blank for default: "Hello! How can I help you today?"
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating Demo...
          </>
        ) : (
          "Create Demo"
        )}
      </button>
    </form>
  );
}
