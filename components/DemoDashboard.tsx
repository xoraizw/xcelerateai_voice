"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Trash2, ExternalLink, Edit2, Copy, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Demo {
  id: string;
  name: string;
  prompt: string;
  publicId: string;
  createdAt: string;
}

export interface DemoDashboardHandle {
  refresh: () => void;
}

const DemoDashboard = forwardRef<DemoDashboardHandle>((props, ref) => {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrompt, setEditPrompt] = useState("");

  useEffect(() => {
    fetchDemos();
  }, []);

  const fetchDemos = async () => {
    try {
      const response = await fetch("/api/demos");
      const data = await response.json();
      setDemos(data);
    } catch (error) {
      console.error("Failed to fetch demos:", error);
      toast.error("Failed to load demos");
    } finally {
      setLoading(false);
    }
  };

  // Expose refresh function to parent
  useImperativeHandle(ref, () => ({
    refresh: fetchDemos,
  }));

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this demo?")) return;

    try {
      const response = await fetch(`/api/demos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Demo deleted successfully");
      setDemos(demos.filter((demo) => demo.id !== id));
    } catch (error) {
      console.error("Failed to delete demo:", error);
      toast.error("Failed to delete demo");
    }
  };

  const handleEdit = (demo: Demo) => {
    setEditingId(demo.id);
    setEditName(demo.name);
    setEditPrompt(demo.prompt);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const response = await fetch(`/api/demos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editName, prompt: editPrompt }),
      });

      if (!response.ok) throw new Error("Failed to update");

      const updatedDemo = await response.json();
      toast.success("Demo updated successfully");
      setDemos(demos.map((demo) => (demo.id === id ? updatedDemo : demo)));
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update demo:", error);
      toast.error("Failed to update demo");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditPrompt("");
  };

  const copyLink = (publicId: string) => {
    const link = `${window.location.origin}/demo/${publicId}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const openDemo = (publicId: string) => {
    window.open(`/demo/${publicId}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (demos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No demos yet. Create your first one above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Your Demos
      </h3>

      <div className="grid gap-4">
        {demos.map((demo) => (
          <div
            key={demo.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            {editingId === demo.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Demo Name"
                />
                <textarea
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  rows={4}
                  placeholder="Agent Prompt"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(demo.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {demo.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Created: {new Date(demo.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-mono break-all">
                    {window.location.origin}/demo/{demo.publicId}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => openDemo(demo.publicId)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open
                  </button>
                  <button
                    onClick={() => copyLink(demo.publicId)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </button>
                  <button
                    onClick={() => handleEdit(demo)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(demo.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

DemoDashboard.displayName = "DemoDashboard";

export default DemoDashboard;
