// Create this file: app/(internal)/_components/component-showcase.tsx

'use client';

import { useState } from 'react';
import { Code, Eye, Layers, Palette } from 'lucide-react';
import { Button } from '@/_shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/_shared/components/ui/card';

interface ComponentExample {
  name: string;
  category: 'ui' | 'layout' | 'forms' | 'data';
  component: React.ReactNode;
  code: string;
  description: string;
}

export function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const components: ComponentExample[] = [
    {
      name: 'Button Variants',
      category: 'ui',
      description: 'Different button styles and states',
      component: (
        <div className="space-x-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      ),
      code: `<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`,
    },
    {
      name: 'Card Component',
      category: 'layout',
      description: 'Basic card with header and content',
      component: (
        <Card className="w-64">
          <CardHeader>
            <h3 className="text-lg font-semibold">Card Title</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This is a sample card component with header and content sections.
            </p>
          </CardContent>
        </Card>
      ),
      code: `<Card>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>`,
    },
    {
      name: 'Input Forms',
      category: 'forms',
      description: 'Form input examples',
      component: (
        <div className="space-y-3 w-64">
          <input
            type="text"
            placeholder="Text input"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email input"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Textarea"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ),
      code: `<input 
  type="text" 
  placeholder="Text input"
  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
/>
<textarea 
  placeholder="Textarea"
  rows={3}
  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
/>`,
    },
    {
      name: 'Status Badges',
      category: 'ui',
      description: 'Status indicators and badges',
      component: (
        <div className="space-x-2">
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Active
          </span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            Pending
          </span>
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            Inactive
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
            Draft
          </span>
        </div>
      ),
      code: `<span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
  Active
</span>
<span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
  Pending
</span>`,
    },
    {
      name: 'Data Table',
      category: 'data',
      description: 'Simple data table layout',
      component: (
        <div className="w-full max-w-md">
          <table className="w-full border border-gray-300 rounded">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 text-sm">John Doe</td>
                <td className="px-4 py-2 text-sm">Active</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 text-sm">Jane Smith</td>
                <td className="px-4 py-2 text-sm">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      code: `<table className="w-full border rounded">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-4 py-2 text-left">Name</th>
      <th className="px-4 py-2 text-left">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-t">
      <td className="px-4 py-2">John Doe</td>
      <td className="px-4 py-2">Active</td>
    </tr>
  </tbody>
</table>`,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Components', icon: Layers },
    { id: 'ui', name: 'UI Elements', icon: Palette },
    { id: 'layout', name: 'Layout', icon: Layers },
    { id: 'forms', name: 'Forms', icon: Code },
    { id: 'data', name: 'Data Display', icon: Eye },
  ];

  const filteredComponents =
    selectedCategory === 'all'
      ? components
      : components.filter(comp => comp.category === selectedCategory);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Component Showcase</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded text-sm ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Eye className="h-4 w-4 inline mr-1" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1 rounded text-sm ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Code className="h-4 w-4 inline mr-1" />
            Code
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-3 py-1 rounded text-sm ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="h-3 w-3 mr-1" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredComponents.map((component, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-white font-medium">{component.name}</h4>
                <p className="text-gray-400 text-sm">{component.description}</p>
              </div>
              <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
                {component.category}
              </span>
            </div>

            {activeTab === 'preview' ? (
              <div className="bg-white p-4 rounded border">
                {component.component}
              </div>
            ) : (
              <div className="bg-gray-900 p-4 rounded">
                <pre className="text-green-400 text-xs overflow-x-auto">
                  <code>{component.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No components found in this category</p>
        </div>
      )}

      {/* Component Usage Stats */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h4 className="text-white font-medium mb-3">Component Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {components.length}
            </div>
            <div className="text-gray-400 text-sm">Total Components</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {components.filter(c => c.category === 'ui').length}
            </div>
            <div className="text-gray-400 text-sm">UI Components</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {components.filter(c => c.category === 'forms').length}
            </div>
            <div className="text-gray-400 text-sm">Form Components</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {components.filter(c => c.category === 'data').length}
            </div>
            <div className="text-gray-400 text-sm">Data Components</div>
          </div>
        </div>
      </div>
    </div>
  );
}
