"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Heart,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: "Beautiful RSVP Pages",
      description: "Create stunning, customizable event pages that match your style",
    },
    {
      icon: Users,
      title: "Guest Management",
      description: "Track responses, plus-ones, and dietary restrictions effortlessly",
    },
    {
      icon: Sparkles,
      title: "Custom Branding",
      description: "Choose colors, upload images, and add custom questions",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor RSVPs and attendance stats as they come in",
    },
  ];

  const steps = [
    { number: "01", title: "Create Event", description: "Set up your event details in minutes" },
    { number: "02", title: "Share Link", description: "Send your custom RSVP link to guests" },
    { number: "03", title: "Track RSVPs", description: "Watch responses roll in real-time" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Heart className="w-4 h-4" />
              The easiest way to manage event RSVPs
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6">
              Event planning,{" "}
              <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                simplified
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create beautiful RSVP pages, track guest responses, and manage your events
              all in one place. No spreadsheets required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard/events">
                <Button
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg gap-2 rounded-xl shadow-lg shadow-slate-900/20"
                >
                  Create Your Event
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-xl border-2"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                  <Calendar className="w-8 h-8 mb-4 text-orange-400" />
                  <p className="text-3xl font-bold">Sarah's Wedding</p>
                  <p className="text-slate-400 mt-2">June 15, 2026</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total RSVPs</p>
                    <p className="text-4xl font-bold text-slate-800">142</p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      118 Yes
                    </span>
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                      24 No
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl p-6 text-white">
                  <CheckCircle className="w-8 h-8 mb-4" />
                  <p className="text-lg font-semibold">83% Response Rate</p>
                  <p className="text-white/80 text-sm mt-2">Above average!</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

console.log("Home page loaded");