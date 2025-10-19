import React from "react";

// ModernGridComponent.jsx
// Single-file React component (Tailwind CSS) that implements a modern, responsive, "bento" grid layout
// Copy this file into a React app (Vite / Create React App) with Tailwind configured.

export default function ModernGrid() {
  return (
    <div className="min-h-screen bg-[#F7F6FB] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700">Social Media <span className="text-gray-800">10x</span> Faster with AI</h1>
          <p className="mt-2 text-sm text-gray-600">A modern, pixel-conscious layout built with Tailwind CSS — responsive and easy to customize.</p>
        </header>

        {/* Grid container: use CSS grid with named areas via spans to achieve a bento/puzzle layout */}
        <div className="grid grid-cols-6 gap-5 auto-rows-fr">
          {/* Left tall card */}
          <div className="col-span-2 row-span-2 bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Create and
                <span className="block font-bold text-xl text-gray-900">schedule content quicker.</span>
              </h3>
            </div>
            <button className="mt-4 self-start px-4 py-2 rounded-full bg-yellow-300 text-sm font-semibold">Create Post →</button>
          </div>

          {/* Big central promotional card */}
          <div className="col-span-3 row-span-2 bg-gradient-to-tr from-purple-500 to-indigo-400 rounded-3xl p-6 text-white shadow-md flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-extrabold">Social Media <span className="text-yellow-200">10x</span> Faster with AI</h2>
            <p className="mt-2 text-sm opacity-90">Over 4,000 5-star reviews</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">⭐</div>
              <div className="text-sm">Trusted by creators and teams</div>
            </div>
          </div>

          {/* Right tall card: schedule to social media */}
          <div className="col-span-1 row-span-2 bg-white rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold text-gray-600">Schedule to social media.</h4>
              <p className="mt-2 text-sm font-bold text-gray-800">Best Time to Post</p>
            </div>
            <div className="mt-3 h-20 flex items-end">
              {/* simple bar chart */}
              <div className="w-full flex items-end gap-2">
                <div className="w-3 h-4 rounded-md bg-purple-400"></div>
                <div className="w-3 h-8 rounded-md bg-purple-500"></div>
                <div className="w-3 h-12 rounded-md bg-purple-600"></div>
                <div className="w-3 h-6 rounded-md bg-purple-500"></div>
                <div className="w-3 h-10 rounded-md bg-purple-600"></div>
              </div>
            </div>
          </div>

          {/* Row 3: smaller cards */}
          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm">
            <h5 className="text-xs text-gray-600 font-semibold">Write your content using AI.</h5>
            <p className="mt-2 text-sm text-gray-800">Generate captions, tweets, and post ideas in seconds.</p>
          </div>

          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm flex flex-col">
            <h5 className="text-xs text-gray-600 font-semibold">Manage multiple accounts</h5>
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">@</div>
              <div className="text-sm">Twitter • Instagram • LinkedIn</div>
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h5 className="text-xs text-gray-600 font-semibold">Maintain a consistent posting schedule.</h5>
              <p className="mt-2 text-sm text-gray-800">August 2024 • 3 posts/week</p>
            </div>
            <div className="mt-3 text-xs text-gray-500">Streak: 14 days</div>
          </div>

          {/* Bottom row: stat cards */}
          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm flex flex-col">
            <div className="text-xs text-gray-600 font-semibold">+56% faster audience growth</div>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">😊</div>
              <div className="text-sm font-bold text-gray-800">20,642</div>
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm flex flex-col">
            <div className="text-xs text-gray-600 font-semibold">Total engagements</div>
            <div className="mt-4 text-2xl font-extrabold text-gray-900">88,532</div>
          </div>

          <div className="col-span-2 bg-indigo-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-semibold">Grow followers</div>
              <div className="mt-2 font-bold text-lg">with non-stop content</div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-xs text-gray-500">Built with React + Tailwind — tweak spacing, colors and breakpoints to match exact pixel spec.</footer>
      </div>
    </div>
  );
}
