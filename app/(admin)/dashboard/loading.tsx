// app/(admin)/dashboard/loading.tsx - Enhanced with spinning wheel and progress
'use client';

import { useEffect, useState } from 'react';

export default function DashboardLoading() {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing...');

  // Progressive loading stages
  const stages = [
    { text: 'Initializing dashboard...', duration: 800 },
    { text: 'Loading analytics data...', duration: 600 },
    { text: 'Fetching recent orders...', duration: 500 },
    { text: 'Preparing dashboard...', duration: 400 },
    { text: 'Almost ready...', duration: 300 },
  ];

  useEffect(() => {
    let currentProgress = 0;
    let stageIndex = 0;

    const interval = setInterval(() => {
      // Accelerating progress (starts slow, gets faster)
      const acceleration = Math.pow(currentProgress / 100, 0.7) * 2 + 0.5;
      currentProgress += acceleration;

      // Update stage based on progress
      const progressThreshold = ((stageIndex + 1) / stages.length) * 100;
      if (
        currentProgress >= progressThreshold &&
        stageIndex < stages.length - 1
      ) {
        stageIndex++;
        setLoadingStage(stages[stageIndex].text);
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        setLoadingStage('Complete!');
        clearInterval(interval);
      }

      setProgress(currentProgress);
    }, 50); // Smooth 50ms updates

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-[#131921] mb-2">
            Claudazon
          </div>
          <div className="text-sm bg-[#ff9900] text-black px-3 py-1 rounded inline-block">
            Admin Dashboard
          </div>
        </div>

        {/* Spinning Wheel */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
            {/* Spinning progress ring */}
            <div
              className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-[#ff9900] rounded-full animate-spin"
              style={{
                animationDuration: `${Math.max(0.3, 2 - progress / 50)}s`, // Accelerates as progress increases
              }}
            ></div>
            {/* Inner circle with percentage */}
            <div className="absolute inset-2 bg-gray-50 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-[#131921]">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Loading Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#ff9900] to-[#e88900] h-2 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Loading Stage */}
        <div className="text-center mb-6">
          <div className="text-gray-700 font-medium">{loadingStage}</div>
        </div>

        {/* Progressive Status Boxes */}
        <div className="grid grid-cols-5 gap-2">
          {stages.map((stage, index) => {
            const stageProgress = ((index + 1) / stages.length) * 100;
            const isActive = progress >= stageProgress;
            const isCurrent =
              progress >= (index / stages.length) * 100 &&
              progress < stageProgress;

            return (
              <div
                key={index}
                className={`h-3 rounded transition-all duration-300 ${
                  isActive
                    ? 'bg-green-500'
                    : isCurrent
                      ? 'bg-[#ff9900] animate-pulse'
                      : 'bg-gray-200'
                }`}
                title={stage.text}
              ></div>
            );
          })}
        </div>

        {/* Status Indicators */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${progress > 20 ? 'bg-green-500' : 'bg-gray-300'}`}
            ></div>
            <span
              className={progress > 20 ? 'text-green-600' : 'text-gray-500'}
            >
              Analytics
            </span>
          </div>
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${progress > 40 ? 'bg-green-500' : 'bg-gray-300'}`}
            ></div>
            <span
              className={progress > 40 ? 'text-green-600' : 'text-gray-500'}
            >
              Orders
            </span>
          </div>
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${progress > 60 ? 'bg-green-500' : 'bg-gray-300'}`}
            ></div>
            <span
              className={progress > 60 ? 'text-green-600' : 'text-gray-500'}
            >
              Stats
            </span>
          </div>
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${progress > 80 ? 'bg-green-500' : 'bg-gray-300'}`}
            ></div>
            <span
              className={progress > 80 ? 'text-green-600' : 'text-gray-500'}
            >
              Dashboard
            </span>
          </div>
        </div>

        {/* Loading Animation Dots */}
        <div className="flex justify-center mt-4 space-x-1">
          {[0, 1, 2].map(dot => (
            <div
              key={dot}
              className="w-2 h-2 bg-[#ff9900] rounded-full animate-bounce"
              style={{
                animationDelay: `${dot * 0.2}s`,
                animationDuration: '0.8s',
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
