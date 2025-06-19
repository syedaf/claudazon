import { Button } from '@/components/ui/button';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Button Test</h1>

        <div className="space-y-4">
          <Button>Default Button</Button>

          <Button variant="secondary">Secondary Button</Button>

          <Button variant="outline">Outline Button</Button>

          <Button size="sm">Small Button</Button>

          <Button size="lg">Large Button</Button>
        </div>
      </div>
    </div>
  );
}
