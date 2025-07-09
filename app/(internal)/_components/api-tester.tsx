// Create this file: app/(internal)/_components/api-tester.tsx

'use client';

import { useState } from 'react';
import { Copy, Download, History, Send } from 'lucide-react';

interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: Record<string, string>;
  body?: string;
}

interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: unknown;
  duration: number;
}

const predefinedEndpoints = [
  { name: 'Get Products', method: 'GET' as const, url: '/api/products' },
  { name: 'Create Product', method: 'POST' as const, url: '/api/products' },
  { name: 'Get Analytics', method: 'GET' as const, url: '/api/analytics' },
  { name: 'Health Check', method: 'GET' as const, url: '/api/health' },
];

export function ApiExplorer() {
  const [request, setRequest] = useState<ApiRequest>({
    method: 'GET',
    url: '/api/products',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer admin-token',
    },
  });

  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<
    Array<{ request: ApiRequest; response: ApiResponse; timestamp: Date }>
  >([]);

  const executeRequest = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const fetchOptions: RequestInit = {
        method: request.method,
        headers: request.headers,
      };

      if (request.body && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
        fetchOptions.body = request.body;
      }

      const res = await fetch(request.url, fetchOptions);
      const data = await res.json().catch(() => null);
      const duration = Date.now() - startTime;

      const apiResponse: ApiResponse = {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data,
        duration,
      };

      setResponse(apiResponse);

      // Add to history
      setHistory(prev => [
        {
          request: { ...request },
          response: apiResponse,
          timestamp: new Date(),
        },
        ...prev.slice(0, 9),
      ]); // Keep last 10 requests
    } catch (error) {
      const apiResponse: ApiResponse = {
        status: 0,
        statusText: 'Network Error',
        headers: {},
        data: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        duration: Date.now() - startTime,
      };
      setResponse(apiResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const updateHeader = (key: string, value: string) => {
    setRequest(prev => ({
      ...prev,
      headers: { ...prev.headers, [key]: value },
    }));
  };

  const removeHeader = (key: string) => {
    setRequest(prev => ({
      ...prev,
      headers: Object.fromEntries(
        Object.entries(prev.headers).filter(([k]) => k !== key)
      ),
    }));
  };

  const loadPredefinedEndpoint = (
    endpoint: (typeof predefinedEndpoints)[0]
  ) => {
    setRequest(prev => ({
      ...prev,
      method: endpoint.method,
      url: endpoint.url,
    }));
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
    }
  };

  const exportResponse = () => {
    if (response) {
      const blob = new Blob([JSON.stringify(response, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `api-response-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">API Explorer</h3>
        <div className="flex space-x-2">
          {predefinedEndpoints.map(endpoint => (
            <button
              key={endpoint.name}
              onClick={() => loadPredefinedEndpoint(endpoint)}
              className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
            >
              {endpoint.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Panel */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Request</h4>

          {/* Method and URL */}
          <div className="flex space-x-2">
            <select
              value={request.method}
              onChange={e =>
                setRequest(prev => ({
                  ...prev,
                  method: e.target.value as ApiRequest['method'],
                }))
              }
              className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
            <input
              type="text"
              value={request.url}
              onChange={e =>
                setRequest(prev => ({ ...prev, url: e.target.value }))
              }
              placeholder="/api/endpoint"
              className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
            />
          </div>

          {/* Headers */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Headers
            </label>
            <div className="space-y-2">
              {Object.entries(request.headers).map(([key, value]) => (
                <div key={key} className="flex space-x-2">
                  <input
                    type="text"
                    value={key}
                    onChange={e => {
                      const newKey = e.target.value;
                      removeHeader(key);
                      if (newKey) updateHeader(newKey, value);
                    }}
                    className="w-1/3 px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={e => updateHeader(key, e.target.value)}
                    className="flex-1 px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                  />
                  <button
                    onClick={() => removeHeader(key)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => updateHeader('', '')}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                + Add Header
              </button>
            </div>
          </div>

          {/* Body */}
          {['POST', 'PUT', 'PATCH'].includes(request.method) && (
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Request Body
              </label>
              <textarea
                value={request.body || ''}
                onChange={e =>
                  setRequest(prev => ({ ...prev, body: e.target.value }))
                }
                placeholder='{"key": "value"}'
                rows={6}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 font-mono text-sm"
              />
            </div>
          )}

          <button
            onClick={executeRequest}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? 'Sending...' : 'Send Request'}
          </button>
        </div>

        {/* Response Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium">Response</h4>
            {response && (
              <div className="flex space-x-2">
                <button
                  onClick={copyResponse}
                  className="p-1 text-gray-400 hover:text-gray-300"
                  title="Copy Response"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={exportResponse}
                  className="p-1 text-gray-400 hover:text-gray-300"
                  title="Export Response"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {response ? (
            <div className="space-y-3">
              {/* Status */}
              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 rounded text-sm font-mono ${
                    response.status >= 200 && response.status < 300
                      ? 'bg-green-600 text-white'
                      : response.status >= 400
                        ? 'bg-red-600 text-white'
                        : 'bg-yellow-600 text-white'
                  }`}
                >
                  {response.status} {response.statusText}
                </span>
                <span className="text-gray-400 text-sm">
                  {response.duration}ms
                </span>
              </div>

              {/* Response Data */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Response Body
                </label>
                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-96 text-xs">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>

              {/* Headers */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Response Headers
                </label>
                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 max-h-32 overflow-auto">
                  {Object.entries(response.headers).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-blue-400">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Send className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Send a request to see the response</p>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center mb-3">
            <History className="h-4 w-4 text-gray-400 mr-2" />
            <h4 className="text-white font-medium">Recent Requests</h4>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {history.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setRequest(item.request);
                  setResponse(item.response);
                }}
                className="w-full text-left p-2 bg-gray-700 rounded hover:bg-gray-600 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white">
                    {item.request.method} {item.request.url}
                  </span>
                  <span
                    className={`px-1 rounded text-xs ${
                      item.response.status >= 200 && item.response.status < 300
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {item.response.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Export with the expected name
export { ApiExplorer as ApiTester };
