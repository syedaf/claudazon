import { ComponentShowcase } from '@/(internal)/_components/components-showcase';
// app/(internal)/dev-tools/page.tsx
// app/(internal)/dev-tools/page.tsx
import { ApiExplorer } from '../_components/api-tester';
import { PerformanceMonitor } from '../_components/performance-monitor';
import { RouteGroupAnalyzer } from '../_components/route-group-analyzer';

export default function DevToolsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Development Dashboard
        </h1>
        <p className="text-gray-300">
          Internal tools for debugging and development
        </p>
      </div>

      {/* Route Group Overview */}
      <section className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Route Groups Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Active Groups
            </h3>
            <div className="text-2xl font-bold text-white">6</div>
            <p className="text-gray-400 text-sm">
              (admin), (auth), (shop), (api), (internal), (public)
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              API Endpoints
            </h3>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-gray-400 text-sm">Organized in (api) group</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">
              Shared Components
            </h3>
            <div className="text-2xl font-bold text-white">45</div>
            <p className="text-gray-400 text-sm">
              Cross-group reusable components
            </p>
          </div>
        </div>
      </section>

      {/* Tool Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">API Explorer</h2>
          <ApiExplorer />
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">
            Performance Monitor
          </h2>
          <PerformanceMonitor />
        </section>
      </div>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">
          Route Group Analyzer
        </h2>
        <RouteGroupAnalyzer />
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Component Library</h2>
        <ComponentShowcase />
      </section>
    </div>
  );
}
