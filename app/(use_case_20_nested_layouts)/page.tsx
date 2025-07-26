import { LayoutDemoControls } from './_components/layout-demo-controls';

export default function NestedLayoutsPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Nested Layouts Demo
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Explore how multiple layouts compose together to create complex UI
          hierarchies without affecting URL structure. Navigate through
          different levels to see layouts stack and provide contextual
          interfaces.
        </p>
      </div>

      {/* Demo Controls */}
      <LayoutDemoControls />

      {/* Layout Explanation */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Layout Composition
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Level 2: Use Case Root Layout</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>Level 3: Reviews Section Layout</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-600 rounded"></div>
              <span>Level 4: Product Context Layout</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-pink-600 rounded"></div>
              <span>Level 5: Detailed Analysis Layout</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            URL Structure
          </h3>
          <div className="space-y-2 text-sm font-mono">
            <div className="p-2 bg-slate-100 rounded">/reviews</div>
            <div className="p-2 bg-slate-100 rounded">/reviews/product</div>
            <div className="p-2 bg-slate-100 rounded">
              /reviews/product/detailed
            </div>
          </div>
          <p className="text-slate-600 text-sm mt-3">
            Clean URLs with complex layout composition happening behind the
            scenes.
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Explore Nested Layouts
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a
            href="/reviews"
            className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-gray-900">Reviews Section</h4>
            <p className="text-sm text-slate-600 mt-1">
              3-level layout composition
            </p>
          </a>
          <a
            href="/reviews/product"
            className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-gray-900">Product Reviews</h4>
            <p className="text-sm text-slate-600 mt-1">
              4-level layout composition
            </p>
          </a>
          <a
            href="/reviews/product/detailed"
            className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-gray-900">Detailed Analysis</h4>
            <p className="text-sm text-slate-600 mt-1">
              5-level layout composition
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
