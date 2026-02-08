"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Share2, Zap } from "lucide-react";
import { useState, useRef } from "react";
import CreateDemoForm from "@/components/CreateDemoForm";
import DemoDashboard from "@/components/DemoDashboard";

export default function HomePage() {
  const dashboardRef = useRef<{ refresh: () => void }>(null);

  const handleDemoCreated = () => {
    // Trigger dashboard refresh
    if (dashboardRef.current) {
      dashboardRef.current.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
            <nav className="flex gap-4">
              <Link
                href="https://vapi.ai"
                target="_blank"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                About VAPI
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              Voice AI Demos by XcelerateAI
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Share AI Calling Agents
            <br />
            <span className="text-blue-600">With Your Prospects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Create shareable demo links for your VAPI calling agents. Let prospects experience
            the power of AI voice conversations firsthand with XcelerateAI technology.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-base mb-1 text-gray-900 dark:text-white">
                Quick Setup
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Create a demo in seconds with just a name and prompt
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Share2 className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-base mb-1 text-gray-900 dark:text-white">
                Easy Sharing
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get a unique link to share with prospects instantly
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-base mb-1 text-gray-900 dark:text-white">
                Live Calls
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Prospects can talk to your AI agent directly from browser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Create Demo Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create New Demo
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Fill in the details below to generate a shareable demo link
          </p>
          <CreateDemoForm onDemoCreated={handleDemoCreated} />
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <DemoDashboard ref={dashboardRef} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="XcelerateAI Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  XcelerateAI
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Accelerating Business with AI
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with Next.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
